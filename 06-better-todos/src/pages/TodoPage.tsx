import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import { Todo } from "../types"
import * as TodosAPI from '../services/TodosAPI'

const TodoPage = () => {
	const { id } = useParams()
	const todoId = Number(id)
	const [todo, setTodo] = useState<Todo | null>(null)

	const navigate = useNavigate()

	const getTodo = async (id: number) => {
		const todo = await TodosAPI.getTodo(id)
		setTodo(todo)
	}

	const handleDeleteTodo = async (todo: Todo) => {
		if (!todo.id) return
		TodosAPI.deleteTodo(todo.id)

		navigate('/todos', { state: todo })
	}

	const handleToggleTodo = async (todo: Todo) => {
		if (!todo.id) return

		await TodosAPI.updateTodo(todo.id, {
			completed: !todo.completed
		})
		getTodo(todoId)
	}

	useEffect(() => {
		if (typeof todoId !== "number") {
			return
		}

		getTodo(todoId)
	}, [todoId])

	if (!todo) {
		return (<p>Loading...</p>)
	}

	return (
		<>
			<div>{todo.title}</div>

			<p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Not completed'}</p>

			<div>
				<Button onClick={() => handleToggleTodo(todo)}>Toggle status</Button>
				<Button onClick={() => handleDeleteTodo(todo)}>Delete</Button>
			</div>

			<Link to={'/todos'}>
				<Button variant='secondary'>&laquo; All todos</Button>
			</Link >
		</>
	)
}

export default TodoPage
