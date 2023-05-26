import React from 'react'
import { Todo } from '../types'

interface IProps {
	todo: Todo
	onToggle: (todo: Todo) => void
	onDelete: (clickedTodo: Todo) => void
}

const TodoListItem: React.FC<IProps> = ({ todo, onToggle, onDelete }) => {
	return (
		<li
			className='list-item'
		>
			<span
				className='check-mark'
				onClick={() => onToggle(todo)}
				role='button'
			>
				{todo.completed ? '✅' : '☑'}
			</span>

			<p
				className={todo.completed ? 'todo-title completed' : 'todo-title'}
			>
				{todo.title}
			</p>

			<span
				className='delete-item'
				onClick={() => onDelete(todo)}
				role='button'

			>
				❌
			</span>
		</li>
	)
}

export default TodoListItem
