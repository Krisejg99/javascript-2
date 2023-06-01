import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { Todo } from "../types"
import * as TodosAPI from '../services/TodosAPI'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

const TodoPage = () => {
	const [todo, setTodo] = useState<Todo | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<String | null>(null)

	const { id } = useParams()
	const todoId = Number(id)

	const navigate = useNavigate()
	const location = useLocation()

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

	const handleDeleteTodo = async (todo: Todo) => {
		if (!todo.id) return
		TodosAPI.deleteTodo(todo.id)

		navigate('/todos', {
			replace: true,
			state: {
				message: `"${todo.title}" was successfully deleted`
			},
		})
	}

	const handleEditTodo = () => {
		navigate(`${location.pathname}/edit`)
	}

	const handleToggleTodo = async (todo: Todo) => {
		if (!todo.id) return

		const updatedTodo = await TodosAPI.updateTodo(todo.id, {
			completed: !todo.completed
		})

		setTodo(updatedTodo)
	}

	useEffect(() => {
		if (typeof todoId !== "number") {
			return
		}

		getTodo(todoId)
	}, [todoId])

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
			<div>{todo.title}</div>

			<p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Not completed'}</p>

			<div className="buttons mb-3">
				<Button variant="success" onClick={() => handleToggleTodo(todo)}>Toggle</Button>
				<Button variant="warning" onClick={handleEditTodo}>Edit</Button>
				<Button variant="danger" onClick={() => handleDeleteTodo(todo)}>Delete</Button>
			</div>

			<Link to={'/todos'}>
				<Button variant='secondary'>&laquo; All todos</Button>
			</Link >
		</>
	)
}

export default TodoPage
