import { render, screen } from '@testing-library/react'
import TodoList from '../TodoList'
import { describe, it, expect } from 'vitest'
import { Todo } from '../../../types/Todo.types'
import { v4 as uuid } from 'uuid'

const fakeFn = async () => {
	return
}
const todoTitle = 'This is my todo title'
const initialTodos: Todo[] = []
const createTodo = (title: string) => {
	return {
		id: uuid(),
		title,
		completed: false,
	}
}

describe('Todo List', () => {
	it('List is initially empty', () => {
		render(<TodoList todos={initialTodos} onDelete={fakeFn} onToggle={fakeFn} />)

		const listItemElements = screen.queryAllByRole('listitem')

		expect(listItemElements).toHaveLength(0)
	})

	it('Displays a todo', () => {
		const todos: Todo[] = []
		todos.push(createTodo(todoTitle))

		render(<TodoList todos={todos} onDelete={fakeFn} onToggle={fakeFn} />)

		const listItemElements = screen.queryAllByRole('listitem')

		expect(listItemElements).toHaveLength(1)
	})
})
