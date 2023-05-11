import React from 'react'

interface IProps {
	todos: number
	completeTodos: number
}

const TodoCounter: React.FC<IProps> = ({ todos, completeTodos }) => {
	return <p>{`${completeTodos} / ${todos} COMPLETED`}</p>
}

export default TodoCounter
