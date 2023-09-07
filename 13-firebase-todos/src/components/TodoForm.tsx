import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { TodoSchema, todoSchema } from '../schemas/TodoSchema'
import { zodResolver } from '@hookform/resolvers/zod'

interface IProps {
	onSave: (todo: TodoSchema) => Promise<void>
	initialValues?: TodoSchema
}

const TodoForm: React.FC<IProps> = ({ onSave, initialValues }) => {
	const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, setFocus, reset } = useForm<TodoSchema>({
		resolver: zodResolver(todoSchema),
		defaultValues: {
			...initialValues,
			completed: initialValues?.completed ?? false
		}
	})

	const submitData: SubmitHandler<TodoSchema> = async (data: TodoSchema) => {
		// await för att 'reset' ska vänta på svaret
		await onSave(data)
	}

	useEffect(() => {
		reset()
	}, [isSubmitSuccessful, reset])

	useEffect(() => {
		setFocus('title')
	}, [setFocus])

	return (
		<Form onSubmit={handleSubmit(submitData)} className="mb-3">
			<InputGroup className='mb-2'>
				<Form.Control
					aria-label='The title of the new todo'
					type="text"
					placeholder="Todo title"
					{...register('title')}
				/>

				<Button
					variant='success'
					type="submit"
				>Save
				</Button>
			</InputGroup>

			<InputGroup>
				<Form.Check
					type="checkbox"
					className='me-2'
					{...register('completed')}
				/>

				<Form.Label>Completed</Form.Label>
			</InputGroup>

			{errors.completed && <span className='text-danger'>{errors.completed.message ?? 'Error with completed status'}</span>}

			{errors.title && <span className='text-danger'>{errors.title.message ?? 'Invalid title'}</span>}
		</Form>
	)
}

export default TodoForm
