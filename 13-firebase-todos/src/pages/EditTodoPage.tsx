import Button from 'react-bootstrap/Button'
import { useNavigate, useParams } from 'react-router-dom'
import useGetTodo from '../hooks/useGetTodo'
import { } from '@hookform/resolvers/zod'
import { TodoSchema } from '../schemas/TodoSchema'
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { todosCol } from '../services/firebase'
import { toast } from 'react-toastify'
import TodoForm from '../components/TodoForm'
import Container from 'react-bootstrap/Container'
import useAuth from '../hooks/useAuth'

const EditTodoPage = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const todoId = id as string

	const { data: todo, loading, error } = useGetTodo(todoId)
	const { currentUser } = useAuth()

	const submitData = async (data: TodoSchema) => {
		const docRef = doc(todosCol, todoId)

		toast.promise(updateDoc(docRef, {
			...data,
			updated_at: serverTimestamp(),
		}), {
			pending: 'Saving todo...',
			success: 'Successfully updated todo',
			error: 'Unable to save todo',
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
			{error && <p>Error occured while updating the todo.</p>}

			{todo && <>
				<h1>Edit: {todo.title}</h1>

				<TodoForm onSave={submitData} initialValues={todo} />
			</>}

			<Button variant='secondary' onClick={() => navigate(-1)}>&laquo; Go back</Button>
		</Container>
	)
}

export default EditTodoPage
