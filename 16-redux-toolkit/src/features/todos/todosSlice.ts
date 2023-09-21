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
			state.push(action.payload)
		},
		toggleTodo: (state, action: PayloadAction<string>) => {
			const todo = state.find(todo => todo.id === action.payload)

			if (!todo) {
				toast.warning('Could not find todo to toggle')
				return
			}

			todo.completed = !todo.completed
		},
	}
})

export const { addTodo, toggleTodo } = todosSlice.actions

export default todosSlice.reducer
