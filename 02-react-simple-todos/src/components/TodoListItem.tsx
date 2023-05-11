import React from 'react'
import { Todo } from '../types'

interface IProps {
	todo: Todo
	handleToggleTodo: (todo: Todo) => void
	handleDeleteTodo: (clickedTodo: Todo) => void
}

const TodoListItem: React.FC<IProps> = ({ todo, handleToggleTodo, handleDeleteTodo }) => {
	return (
		<li
			className='list-item'
		>
			<span
				className='check-mark'
				onClick={() => handleToggleTodo(todo)}
				role='button'
			>
				{todo.completed ? '☑' : '☐'}
			</span>

			<p
				className={todo.completed ? 'todo-title completed' : 'todo-title'}
			>
				{todo.title}
			</p>

			<span
				className='delete-item'
				onClick={() => handleDeleteTodo(todo)}
				role='button'

			>
				❌
			</span>
		</li>
	)
}

export default TodoListItem
