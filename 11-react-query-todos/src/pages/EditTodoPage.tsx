import { useEffect, useRef, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import * as TodosAPI from '../services/TodosAPI'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { PartialTodo } from '../types'

const EditTodoPage = () => {
	const { id } = useParams()
	const todoId = Number(id)
	const TodoQueryKey = ['todo', { id: todoId }]

	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { data: todo, refetch, isError } = useQuery({
		queryKey: TodoQueryKey,
		queryFn: () => TodosAPI.getTodo(todoId),
	})

	const { mutate } = useMutation({
		mutationFn: (data: PartialTodo) => TodosAPI.updateTodo(todoId, data),
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: TodoQueryKey })
			queryClient.invalidateQueries({ queryKey: ['todos'] })

			navigate(`/todos/${todoId}`, {
				state: {
					message: `Successfully changed to "${newTodoTitle}"`
				},
			})
		},
	})

	const [newTodoTitle, setNewTodoTitle] = useState('')
	const todoTitleRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		todoTitleRef.current?.focus()

		if (todo) setNewTodoTitle(todo.title)
	}, [todo])

	if (isError) return (
		<Alert variant="danger">
			<h1>Error: Something went wrong!</h1>

			<Button variant="primary" onClick={() => refetch()}>Try again</Button>
		</Alert >
	)

	return (
		<>
			{todo && (
				<>
					<h1>Edit '{todo.title}'</h1>

					<form
						className='todo-form'
						onSubmit={(e) => {
							e.preventDefault()

							mutate({ title: newTodoTitle })
						}}
					>
						<input
							className='new-todo-input'
							type="text"
							value={newTodoTitle}
							onChange={e => setNewTodoTitle(e.target.value)}
							ref={todoTitleRef}
						/>

						<button className='create-todo-btn'>Save</button>
					</form>
				</>
			)}

			<Button
				variant='primary'
				className='mt-3'
				onClick={() => navigate(-1)}
			>
				&laquo; Back
			</Button>
		</>
	)
}

export default EditTodoPage
