import { useState } from "react"
import Button from "react-bootstrap/Button"
import { Link, useNavigate, useParams } from "react-router-dom"
import ConfirmationModal from "../components/ConfirmationModal"
import useGetTodo from "../hooks/useGetTodo"
import { todosCol } from "../services/firebase"
import { deleteDoc, doc } from "firebase/firestore"
import { toast } from "react-toastify"
// import useEditTodo from "../hooks/useEditTodo"

const TodoPage = () => {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const { id } = useParams()
	const todoId = id as string

	const navigate = useNavigate()

	const {
		data: todo,
		loading,
		error,
		getData
	} = useGetTodo(todoId)

	// const { editTodo } = useEditTodo(todoId)

	const deleteTodo = async () => {
		const docRef = doc(todosCol, todoId)

		await deleteDoc(docRef)

		toast.success('Deleted sucessfully')

		navigate('/todos', {
			replace: true,
		})
	}

	return (
		<>
			{todo && <>
				<div className="d-flex justify-content-between align-items-center">
					<h1 className="mb-3">{todo.title}</h1>

					<Button variant="primary" onClick={getData}>Refresh</Button>
				</div>

				<p>
					<strong>Status:</strong>{" "}
					{todo.completed ? "Completed" : "Not completed"}
				</p>

				<div className="buttons mb-3">
					<Button
						variant="success"
					// onClick={() => editTodo({ completed: !todo.completed })}
					>
						Toggle
					</Button>

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

			{loading && <p>Loading...</p>}
		</>
	)
}

export default TodoPage
