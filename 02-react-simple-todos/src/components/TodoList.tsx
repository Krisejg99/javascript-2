import React from 'react'
import TodoListItem from './TodoListItem'
import { Todo } from '../types'

interface IProps {
	todos: Todo[]
	handleToggleTodo: (todo: Todo) => void
	handleDeleteTodo: (clickedTodo: Todo) => void
	completed: boolean
}

const TodoList: React.FC<IProps> = ({ todos, handleToggleTodo, handleDeleteTodo, completed }) => {
	return (
		<ul className='list'>
			{todos
				.filter(todo => todo.completed === completed)
				.map(todo => (
					<TodoListItem
						todo={todo}
						handleToggleTodo={handleToggleTodo}
						handleDeleteTodo={handleDeleteTodo}
						key={todo.id}
					/>
				))}
		</ul>
	)
}

export default TodoList
