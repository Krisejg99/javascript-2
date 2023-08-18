/**
 * Service for communicating with the json-server backend
 */
import axios from 'axios'
import { PartialTodo, Todo } from '../types'

const FAKE_DELAY = 1000 * 0

const instance = axios.create({
	baseURL: 'http://localhost:3000',
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json"
	},
})

const get = async <T>(endpoint: string) => {
	const res = await instance.get<T>(endpoint)

	// Fake delay
	!!FAKE_DELAY && await new Promise(r => setTimeout(r, FAKE_DELAY))

	return res.data
}

/**
 * Get all todos
 */
export const getTodos = async () => {
	return await get<Todo[]>('todos')
}

/**
 * Get a single todo
 */
export const getTodo = async (todoId: number) => {
	return await get<Todo>(`/todos/${todoId}`)
}

/**
 * Create a new todo
 *
 * @param data Object with properties and values for the new todo
 */
export const createTodo = async (todo: Todo) => {
	const res = await instance.post(`/todos`, todo)
	return res.data as Todo
}

/**
 * Update a todo
 *
 * @param todo_id Todo to update
 * @param data Data to update todo with
 */
export const updateTodo = async (todoId: number, data: PartialTodo) => {
	const res = await instance.patch(`/todos/${todoId}`, data)
	return res.data as Todo
}

/**
 * Delete a todo
 *
 * @param todo_id Todo to delete
 */
export const deleteTodo = async (todoId: number) => {
	const res = await instance.delete(`/todos/${todoId}`)
	return res.data
}
