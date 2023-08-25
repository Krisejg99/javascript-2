import { useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import * as TodosAPI from '../services/TodosAPI'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import ConfirmationModal from "../components/ConfirmationModal"
import AutoDismissingAlert from "../components/AutoDismissingAlert"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Todo } from "../types"
import useTodo from "../hooks/useTodo"
import useUpdateTodo from "../hooks/useUpdateTodo"
import useDeleteTodo from "../hooks/useDeleteTodo"

const TodoPage = () => {
	const [queryEnabled, setQueryEnabled] = useState(true)
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)

	const { id } = useParams()
	const todoId = Number(id)

	const location = useLocation()

	const { data: todo, isError, refetch } = useTodo(todoId, queryEnabled)
	const updateTodo = useUpdateTodo(todoId)

	// const deleteTodo = useDeleteTodo(todoId, () => setQueryEnabled(false))

	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const deleteTodo = useMutation({

		mutationFn: TodosAPI.deleteTodo,
		onSuccess: () => {
			setQueryEnabled(false)

			queryClient.removeQueries({ queryKey: ['todo', { id: todoId }] })

			// queryClient.setQueryData<Todo[]>(['todos'], (prevTodos) => {
			// 	return prevTodos?.filter(todo => todo.id !== todoId) ?? []
			// })

			setTimeout(() => {
				navigate('/todos', {
					replace: true,
					state: {
						message: `"${todo?.title}" was successfully deleted`
					},
				})
			}, 1500)

		},
	})

	if (isError) return (
		<Alert variant="danger">
			<h1>Something went wrong!</h1>

			<Button variant="primary" onClick={() => refetch()}>
				Try again
			</Button>
		</Alert >
	)

	return (
		<>
			{location.state?.message && (
				<AutoDismissingAlert
					variant='success'
					hideAfter={3}
				>
					{location.state.message}
				</AutoDismissingAlert>
			)}

			{todo && (
				<>
					<div>{todo.title}</div>

					<p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Not completed'}</p>

					<div className="buttons mb-3">
						<Button
							variant="success"
							onClick={() => updateTodo.mutate({ completed: !todo.completed })}
							disabled={updateTodo.isLoading}
						>Toggle
						</Button>

						<Link to={`/todos/${todoId}/edit`}>
							<Button variant="warning">
								Edit
							</Button>
						</Link>

						<Button variant="danger" onClick={() => setShowConfirmDelete(true)}>
							Delete
						</Button>
					</div>


					<ConfirmationModal
						show={showConfirmDelete}
						onConfirm={() => !deleteTodo.isLoading && deleteTodo.mutate(todoId)}
						onCancel={() => setShowConfirmDelete(false)}
					>
						Delete this todo
					</ConfirmationModal >
				</>
			)}

			<Link to={'/todos'}>
				<Button variant='secondary'>
					&laquo; All todos
				</Button>
			</Link >
		</>
	)
}

export default TodoPage
