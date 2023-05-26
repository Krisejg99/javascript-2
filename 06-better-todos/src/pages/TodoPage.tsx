import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import { Todo } from "../types"
import * as TodosAPI from '../services/TodosAPI'

const TodoPage = () => {
	const { id } = useParams()
	const todoId = Number(id)
	const [todo, setTodo] = useState<Todo | null>(null)

	const getTodo = async (id: number) => {
		const todo = await TodosAPI.getTodo(id)

		setTodo(todo)
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

			<Link to={'/todos'}>
				<Button variant='secondary'>&laquo; All todos</Button>
			</Link >
		</>
	)
}

export default TodoPage
