import React from 'react'

interface IProps {
	todoCount: string
}

const TodoCounter: React.FC<IProps> = ({ todoCount }) => {
	return <p>{todoCount}</p>
}

export default TodoCounter
