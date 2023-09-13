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

const EditTodoPage = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const todoId = id as string

	const { data: todo, loading, error } = useGetTodo(todoId)

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

	return (
		<Container className='py-3 center-y'>
			{loading && <p>Loading...</p>}

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
