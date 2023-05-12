import React from 'react'
import TodoListItem from './TodoListItem'
import { Todo } from '../types'

interface IProps {
	todos: Todo[]
	onToggle: (todo: Todo) => void
	onDelete: (clickedTodo: Todo) => void
	completedStatus: boolean
}

const TodoList: React.FC<IProps> = ({ todos, onToggle, onDelete, completedStatus }) => {
	return (
		<ul className='list'>
			{todos
				.filter(todo => todo.completed === completedStatus)
				.map(todo => (
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
