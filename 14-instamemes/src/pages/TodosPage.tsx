import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"
import useGetTodos from "../hooks/useGetTodos"
import { toast } from "react-toastify"
import { newTodosCol } from "../services/firebase"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { TodoSchema } from "../schemas/TodoSchema"
import TodoForm from "../components/TodoForm"
import { dateToYmdHms, firebaseTimestampToDate } from '../helpers/time'
import Container from 'react-bootstrap/Container'
import useAuth from "../hooks/useAuth"

const TodosPage = () => {
	const { currentUser } = useAuth()
	const { data: todos, loading } = useGetTodos(currentUser?.uid)

	const addTodo = async (data: TodoSchema) => {
		const docRef = doc(newTodosCol)

		await setDoc(docRef, {
			...data,
			uid: currentUser?.uid,
			created_at: serverTimestamp(),
			updated_at: serverTimestamp(),
		})

		toast.success('Success!')
	}

	return (
		<Container className='py-3 center-y'>
			<div className="d-flex justify-content-between align-items-center">
				<h1 className="mb-3">Todos</h1>

				{loading && <p>Loading...</p>}
			</div>

			<TodoForm onSave={addTodo} />

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
							<span>{todo.title}</span>
							{todo.created_at
								? <span className="created">{dateToYmdHms(firebaseTimestampToDate(todo.created_at))}</span>
								: <span className="created">Saving...</span>
							}
						</ListGroup.Item>
					))}
				</ListGroup>
			)}

			{todos && todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}
		</Container>
	)
}

export default TodosPage
