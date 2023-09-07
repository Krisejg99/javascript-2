import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useNavigate, useParams } from 'react-router-dom'
import useGetTodo from '../hooks/useGetTodo'
import { zodResolver } from '@hookform/resolvers/zod'
import { TodoSchema, todoSchema } from '../schemas/TodoSchema'
import { useForm, SubmitHandler } from 'react-hook-form'
import { doc, updateDoc } from 'firebase/firestore'
import { todosCol } from '../services/firebase'
import { toast } from 'react-toastify'

const EditTodoPage = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const todoId = id as string

	const { data: todo, loading, error } = useGetTodo(todoId)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TodoSchema>({
		resolver: zodResolver(todoSchema),
	})

	const submitData: SubmitHandler<TodoSchema> = async (data: TodoSchema) => {
		const docRef = doc(todosCol, todoId)

		toast.promise(updateDoc(docRef, data), {
			pending: 'Saving todod...',
			success: 'Todo was updated successfully',
			error: 'Unable to save todo',
		})
	}

	return (
		<>
			{loading && <p>Loading...</p>}

			{error && <p>Error occured while updating the todo.</p>}

			{todo && <>
				<h1>Edit: {todo.title}</h1>

				<Form onSubmit={handleSubmit(submitData)} className="mb-3">
					<Form.Label>Title:</Form.Label>

					<InputGroup>
						<Form.Control
							aria-label='The new title of the todo'
							type="text"
							defaultValue={todo.title}
							{...register('title')}
						/>

						<Button
							variant='success'
							type="submit"
						>Update
						</Button>
					</InputGroup>

					{errors.title && <span className='text-danger'>{errors.title.message ?? 'Invalid title'}</span>}
				</Form>
			</>}

			<Button variant='secondary' onClick={() => navigate(-1)}>&laquo; Go back</Button>
		</>
	)
}

export default EditTodoPage
