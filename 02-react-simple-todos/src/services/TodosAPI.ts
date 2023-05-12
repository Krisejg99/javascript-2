/**
 * Service for communicating with the json-server backend
 */
import axios from 'axios'
import { Todo } from '../types'

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

/**
 * Update a todo
 *
 * @param todo_id Todo to update
 * @param data Data to update todo with
 */

/**
 * Delete a todo
 *
 * @param todo_id Todo to delete
 */
