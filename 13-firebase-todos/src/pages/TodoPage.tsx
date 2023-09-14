import { useState } from "react"
import Button from "react-bootstrap/Button"
import { Link, useNavigate, useParams } from "react-router-dom"
import ConfirmationModal from "../components/ConfirmationModal"
import useGetTodo from "../hooks/useGetTodo"
import { todosCol } from "../services/firebase"
import { deleteDoc, doc } from "firebase/firestore"
import { toast } from "react-toastify"
import Container from 'react-bootstrap/Container'
import useAuth from "../hooks/useAuth"

const TodoPage = () => {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const { id } = useParams()
	const todoId = id as string

	const { currentUser } = useAuth()

	const navigate = useNavigate()

	const {
		data: todo,
		loading,
		error,
	} = useGetTodo(todoId)

	const deleteTodo = async () => {
		const docRef = doc(todosCol, todoId)

		await deleteDoc(docRef)

		toast.success('Deleted sucessfully')

		navigate('/todos', {
			replace: true,
		})
	}

	if (todo && todo.uid != currentUser?.uid) {
		return (
			<Container>
				<h2>Access Denied</h2>
			</Container>
		)
	}

	if (loading || !todo) return <p>Loading...</p>

	return (
		<Container className='py-3 center-y'>
			{todo && <>
				<h1 className="mb-3">{todo.title}</h1>

				<p>
					<strong>Status:</strong>{" "}
					{todo.completed ? "Completed" : "Not completed"}
				</p>

				<div className="buttons mb-3">
					<Link to={`/todos/${todoId}/edit`}>
						<Button variant="warning">Edit</Button>
					</Link>

					<Button
						variant="danger"
						onClick={() => setShowConfirmDelete(true)}
					>
						Delete
					</Button>
				</div>
			</>}

			<ConfirmationModal
				show={showConfirmDelete}
				onCancel={() => setShowConfirmDelete(false)}
				onConfirm={deleteTodo}
			>
				U SURE BRO?!
			</ConfirmationModal>

			{error && <p>Error: Could not get todo.</p>}

			<Link to="/todos">
				<Button variant="secondary">&laquo; All todos</Button>
			</Link>
		</Container>
	)
}

export default TodoPage
