import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'
import { todoSchema } from '../schemas/TodoSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewTodo } from '../types/Todo.types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {
	onAddTodo: (todo: NewTodo) => void
}

const AddNewTodoForm: React.FC<IProps> = ({ onAddTodo }) => {
	const { register, handleSubmit, formState: { errors }, setFocus } = useForm<NewTodo>({
		resolver: zodResolver(todoSchema),
		defaultValues: {
			completed: false,
		},
	})

	const submitData = (todo: NewTodo) => {
		onAddTodo(todo)
	}

	useEffect(() => {
		setFocus('title')
	}, [setFocus])

	return (
		<Form onSubmit={handleSubmit(submitData)} className="mb-3">
			<Form.Group className="input-group">
				<Form.Control
					type="text"
					placeholder="Todo title"
					{...register('title')}
				/>

				<Form.Control
					type="hidden"
					{...register('completed')}
				/>

				<Button
					variant='success'
					type="submit"
				>Create
				</Button>
			</Form.Group>

			{errors.title && <span className='text-danger'>{errors.title.message ?? 'Invalid title'}</span>}
		</Form>
	)
}

export default AddNewTodoForm
