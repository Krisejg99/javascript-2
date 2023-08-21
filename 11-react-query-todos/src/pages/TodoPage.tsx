import { useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import * as TodosAPI from '../services/TodosAPI'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import ConfirmationModal from "../components/ConfirmationModal"
import AutoDismissingAlert from "../components/AutoDismissingAlert"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const TodoPage = () => {
	const { id } = useParams()
	const todoId = Number(id)
	const todoQueryKey = ['todo', { id: todoId }]

	const navigate = useNavigate()
	const location = useLocation()
	const queryClient = useQueryClient()

	const { data: todo, isError, refetch } = useQuery({
		queryKey: todoQueryKey,
		queryFn: () => TodosAPI.getTodo(todoId),
	})

	const toggleMutation = useMutation({
		mutationKey: todoQueryKey,
		mutationFn: () => TodosAPI.updateTodo(todoId, { completed: !todo?.completed }),
		onSuccess: () => {
			queryClient.refetchQueries(todoQueryKey)
			queryClient.refetchQueries(['todos'])
		},
	})

	const deleteMutation = useMutation({
		mutationKey: todoQueryKey,
		mutationFn: () => TodosAPI.deleteTodo(todoId),
		onSuccess: () => {
			queryClient.removeQueries(todoQueryKey)
			queryClient.refetchQueries(['todos'])

			navigate('/todos', {
				replace: true,
				state: {
					message: `"${todo?.title}" was successfully deleted`
				},
			})
		},
	})

	const [showConfirmDelete, setShowConfirmDelete] = useState(false)

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
						<Button variant="success" onClick={() => toggleMutation.mutate()}>
							Toggle
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
						onConfirm={() => deleteMutation.mutate()}
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
