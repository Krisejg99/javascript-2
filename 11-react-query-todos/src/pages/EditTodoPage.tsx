import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import useTodo from '../hooks/useTodo'
import useUpdateTodo from '../hooks/useUpdateTodo'

const EditTodoPage = () => {
	const [newTodoTitle, setNewTodoTitle] = useState('')
	const todoTitleRef = useRef<HTMLInputElement>(null)
	const { id } = useParams()
	const todoId = Number(id)
	const navigate = useNavigate()

	const { data: todo, refetch, isError } = useTodo(todoId)
	const updateTodo = useUpdateTodo(todoId)

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

							updateTodo.mutate(
								{ title: newTodoTitle },
								{
									onSuccess: () => {
										setTimeout(() => {
											navigate(`/todos/${todoId}`, {
												state: {
													message: `Successfully changed to "${newTodoTitle}"`
												},
											})
										}, 1500)
									}
								}
							)
						}}
					>
						<input
							className='new-todo-input'
							type="text"
							value={newTodoTitle}
							onChange={e => setNewTodoTitle(e.target.value)}
							ref={todoTitleRef}
						/>

						<button
							className='create-todo-btn'
							disabled={updateTodo.isLoading}
						>Save
						</button>
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
