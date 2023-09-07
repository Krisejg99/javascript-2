import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { TodoSchema, todoSchema } from '../schemas/TodoSchema'
import { zodResolver } from '@hookform/resolvers/zod'

interface IProps {
	onAddTodo: (todo: TodoSchema) => Promise<void>
}

const AddNewTodoForm: React.FC<IProps> = ({ onAddTodo }) => {
	const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, setFocus, reset } = useForm<TodoSchema>({
		resolver: zodResolver(todoSchema),
	})

	const submitData: SubmitHandler<TodoSchema> = async (todo: TodoSchema) => {
		// await för att 'reset' ska vänta på svaret
		await onAddTodo(todo)
	}

	useEffect(() => {
		reset()
	}, [isSubmitSuccessful, reset])

	useEffect(() => {
		setFocus('title')
	}, [setFocus])

	return (
		<Form onSubmit={handleSubmit(submitData)} className="mb-3">
			<InputGroup>
				<Form.Control
					aria-label='The title of the new todo'
					type="text"
					placeholder="Todo title"
					{...register('title')}
				/>

				<Button
					variant='success'
					type="submit"
				>Create
				</Button>
			</InputGroup>

			{errors.title && <span className='text-danger'>{errors.title.message ?? 'Invalid title'}</span>}
		</Form>
	)
}

export default AddNewTodoForm
