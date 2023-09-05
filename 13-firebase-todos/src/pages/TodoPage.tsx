import { useState } from "react"
import Button from "react-bootstrap/Button"
import { Link, useParams } from "react-router-dom"
import ConfirmationModal from "../components/ConfirmationModal"
import useGetTodo from "../hooks/useGetTodo"
import useEditTodo from "../hooks/useEditTodo"

const TodoPage = () => {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const { id } = useParams()

	const { todo, loading, refetch } = useGetTodo(id ?? '')
	const { editTodo } = useEditTodo(refetch)

	return (
		<>
			{todo && <>
				<div className="d-flex justify-content-between align-items-center">
					<h1 className="mb-3">{todo.title}</h1>

					<Button variant="primary" onClick={() => refetch()}>Refresh</Button>
				</div>

				<p>
					<strong>Status:</strong>{" "}
					{todo.completed ? "Completed" : "Not completed"}
				</p>

				<div className="buttons mb-3">
					<Button
						variant="success"
						onClick={() => editTodo(todo._id, {
							completed: !todo.completed
						})}
					>
						Toggle
					</Button>

					<Link to={`/todos/${id}/edit`}>
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
				onConfirm={() =>
					console.log("Would delete todo with id:", id)
				}
			>
				U SURE BRO?!
			</ConfirmationModal>

			<Link to="/todos">
				<Button variant="secondary">&laquo; All todos</Button>
			</Link>

			{loading && <p>Loading...</p>}
		</>
	)
}

export default TodoPage
