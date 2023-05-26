import { useEffect, useRef, useState } from "react"
import { Todo } from "../types"

interface IProps {
	onAddTodo: (newTodo: Todo) => void
}

const AddTodoForm: React.FC<IProps> = ({ onAddTodo }) => {
	const [newTodoTitle, setNewTodoTitle] = useState('')
	const newTodoTitleRef = useRef<HTMLInputElement>(null)

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault()

		const newTodo: Todo = {
			title: newTodoTitle,
			completed: false,
		}

		onAddTodo(newTodo)
		setNewTodoTitle('')
	}

	useEffect(() => {
		newTodoTitleRef.current?.focus()
	}, [])

	return (
		<form
			className='todo-form'
			onSubmit={handleSubmitForm}
		>
			<input
				type="text"
				className='new-todo-input'
				placeholder='Create a todo...'
				required
				onChange={e => setNewTodoTitle(e.target.value)}
				value={newTodoTitle}
				ref={newTodoTitleRef}
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
