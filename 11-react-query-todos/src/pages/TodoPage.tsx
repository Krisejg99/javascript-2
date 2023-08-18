import { useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { Todo } from "../types"
import * as TodosAPI from '../services/TodosAPI'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import ConfirmationModal from "../components/ConfirmationModal"
import AutoDismissingAlert from "../components/AutoDismissingAlert"
import { useQuery } from '@tanstack/react-query'

const TodoPage = () => {
	const { id } = useParams()
	const todoId = Number(id)
	const { data: todo, isError, refetch } = useQuery({
		queryKey: ['todo', todoId],
		queryFn: () => TodosAPI.getTodo(todoId),
	})
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)

	const navigate = useNavigate()
	const location = useLocation()

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

	// const handleToggleTodo = async (todo: Todo) => {
	// 	if (!todo.id) return

	// 	const updatedTodo = await TodosAPI.updateTodo(todo.id, {
	// 		completed: !todo.completed
	// 	})

	// 	setTodo(updatedTodo)
	// }

	// useEffect(() => {
	// 	if (location.state?.message) {
	// 		setTimeout(() => {
	// 			navigate(location.pathname, { state: null })
	// 		}, 3000)
	// 	}
	// }, [])

	if (isError) {
		return (
			<Alert variant="danger">
				<h1>Something went wrong!</h1>

				<Button variant="primary" onClick={() => refetch()}>Try again</Button>
			</Alert >
		)
	}

	return (
		<>
			{location.state?.message && (
				<AutoDismissingAlert
					variant='success'
					hideAfter={3}
				>
					{location.state.message}
				</AutoDismissingAlert>
			)}

			{todo && (
				<>
					<div>{todo.title}</div>

					<p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Not completed'}</p>

					<div className="buttons mb-3">
						{/* <Button variant="success" onClick={() => handleToggleTodo(todo)}>Toggle</Button> */}

						<Link to={`/todos/${todoId}/edit`}>
							<Button variant="warning">Edit</Button>
						</Link>

						<Button variant="danger" onClick={() => setShowConfirmDelete(true)}>Delete</Button>
					</div>


					<ConfirmationModal
						show={showConfirmDelete}
						onConfirm={() => handleDeleteTodo(todo)}
						onCancel={() => setShowConfirmDelete(false)}
					>
						Delete this todo
					</ConfirmationModal >
				</>
			)}




			<Link to={'/todos'}>
				<Button variant='secondary'>&laquo; All todos</Button>
			</Link >
		</>
	)
}

export default TodoPage
