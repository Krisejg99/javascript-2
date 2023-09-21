import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dummyTodos } from '../../data/todos'
import { Todo } from '../../types/Todo.types'
import { toast } from 'react-toastify'

const initialState = dummyTodos

const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<Todo>) => {
			state.unshift(action.payload)
		},
		toggleTodo: (state, action: PayloadAction<string>) => {
			const todo = state.find(todo => todo.id === action.payload)

			if (!todo) {
				toast.warning('Could not find todo to toggle')
				return
			}

			console.log(todo)

			todo.completed = !todo.completed
		},
		deleteTodo: (state, action: PayloadAction<string>) => {
			const todoIndex = state.findIndex(todo => todo.id === action.payload)

			if (todoIndex === -1) {
				toast.warning('Could not find todo to delete')
				return
			}

			state.splice(todoIndex, 1)
		},
	}
})

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions

export default todosSlice.reducer
