import { useState } from "react"
import { Todo } from "../types"

interface IProps {
	onAddTodo: (newTodo: Todo) => void
}

const AddTodoForm: React.FC<IProps> = ({ onAddTodo }) => {
	const [newTodoTitle, setNewTodoTitle] = useState('')

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault()

		const newTodo: Todo = {
			title: newTodoTitle,
			completed: false,
		}

		onAddTodo(newTodo)
		setNewTodoTitle('')
	}

	return (
		<form
			className='todo-form'
			onSubmit={handleSubmitForm}
		>
			<input
				type="text"
				placeholder='Create a todo...'
				required
				onChange={e => setNewTodoTitle(e.target.value)}
				value={newTodoTitle}
				className='new-todo-input'
			/>

			<button
				className='create-todo-btn'
				type='submit'
				disabled={!newTodoTitle.trim()}
			>
				Create
			</button>
		</form>
	)
}

export default AddTodoForm
