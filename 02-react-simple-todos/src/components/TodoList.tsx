import React from 'react'
import TodoListItem from './TodoListItem'
import { Todo } from '../types'

interface IProps {
	todos: Todo[]
	onToggle: (todo: Todo) => void
	onDelete: (clickedTodo: Todo) => void
}

const TodoList: React.FC<IProps> = ({ todos, onToggle, onDelete }) => {
	return (
		<ul className='list'>
			{todos.map(todo => (
				<TodoListItem
					todo={todo}
					onToggle={onToggle}
					onDelete={onDelete}
					key={todo.id}
				/>
			))}
		</ul>
	)
}

export default TodoList
