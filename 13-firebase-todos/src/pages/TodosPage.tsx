import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"
import AddNewTodoForm from "../components/AddNewTodoForm"
import { NewTodo, Todo, Todos } from "../types/Todo.types"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../services/firebase"
import { useEffect } from "react"
import { useState } from "react"

const TodosPage = () => {
	const [todos, setTodos] = useState<Todos | null>(null)

	const getTodos = async () => {
		const snapshot = await getDocs(collection(db, 'todos'))

		const data: Todos = snapshot.docs.map(doc => {
			return {
				_id: doc.id,
				...doc.data()
			} as Todo
		})

		setTodos(data)

		return data
	}

	useEffect(() => {
		getTodos()
	}, [])

	// Create a new todo in the API
	const addTodo = (todo: NewTodo) => {
		// 👻
		console.log("Would add a new todo:", todo)
	}

	return (
		<>
			<h1 className="mb-3">Todos</h1>

			<AddNewTodoForm onAddTodo={addTodo} />

			{todos && todos.length > 0 && (
				<ListGroup className="todolist">
					{todos.map((todo) => (
						<ListGroup.Item
							action
							as={Link}
							key={todo._id}
							className={todo.completed ? "done" : ""}
							to={`/todos/${todo._id}`}
						>
							{todo.title}
						</ListGroup.Item>
					))}
				</ListGroup>
			)}

			{todos && todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}
		</>
	)
}

export default TodosPage
