import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Todo } from '../types'
import * as TodosAPI from '../services/TodosAPI'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

const EditTodoPage = () => {
	const [todo, setTodo] = useState<Todo | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<String | null>(null)

	const todoTitleRef = useRef<HTMLInputElement>(null)

	const { id } = useParams()
	const todoId = Number(id)

	const navigate = useNavigate()

	const getTodo = async (id: number) => {
		setError(null)
		setLoading(true)

		try {
			const todo = await TodosAPI.getTodo(id)
			setTodo(todo)
		}
		catch (err: any) {
			setError(err.message)
		}

		setLoading(false)
	}

	const handleSubmitForm = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!todo || !todo.id) return

		try {
			const updatedTodo = await TodosAPI.updateTodo(todo.id, {
				title: todo.title
			})

			setTodo(updatedTodo)

			navigate(`/todos/${todoId}`, {
				replace: true,
				state: {
					message: `Successfully changed to "${todo.title}"`
				},
			})
		}
		catch (err: any) {
			setError(err.message)
		}
	}

	useEffect(() => {
		getTodo(todoId)
	}, [])

	useEffect(() => {
		todoTitleRef.current?.focus()
	}, [todo])

	if (error) {
		return (
			<Alert variant="danger">
				<h1>Something went wrong!</h1>
				<p>{error}</p>

				<Button variant="primary" onClick={() => getTodo(todoId)}>Try again</Button>
			</Alert >
		)
	}

	if (loading || !todo) {
		return (<p>Loading...</p>)
	}

	return (
		<>
			<h1>Edit</h1>
			<form
				className='todo-form'
				onSubmit={handleSubmitForm}
			>
				<input
					className='new-todo-input'
					type="text"
					value={todo.title}
					onChange={e => setTodo({ ...todo, title: e.target.value })}
					ref={todoTitleRef}
				/>

				<button className='create-todo-btn'>Save</button>
			</form>

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
