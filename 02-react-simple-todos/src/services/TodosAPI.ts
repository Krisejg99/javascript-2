/**
 * Service for communicating with the json-server backend
 */
import axios from 'axios'
import { PartialTodo, Todo } from '../types'

const BASE_URL = 'http://localhost:3000'

/**
 * Get all todos
 */
export const getTodos = async () => {
	const res = await axios.get(`${BASE_URL}/todos`)
	return res.data as Todo[]
}

/**
 * Create a new todo
 *
 * @param data Object with properties and values for the new todo
 */
export const createTodo = async (todo: Todo) => {
	const res = await axios.post(`${BASE_URL}/todos`, todo)
	return res.data as Todo
}

/**
 * Update a todo
 *
 * @param todo_id Todo to update
 * @param data Data to update todo with
 */
export const updateTodo = async (todoId: number, data: PartialTodo) => {
	const res = await axios.patch(`${BASE_URL}/todos/${todoId}`, data)
	return res.data as Todo
}

/**
 * Delete a todo
 *
 * @param todo_id Todo to delete
 */
export const deleteTodo = async (todoId: number) => {
	const res = await axios.delete(`${BASE_URL}/todos/${todoId}`)
	return res.data
}
