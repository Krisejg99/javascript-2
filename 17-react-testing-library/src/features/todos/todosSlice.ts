import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dummyTodos } from '../../data/todos'
import { Todo } from '../../types/Todo.types'
import { toast } from 'react-toastify'

const initialState: Todo[] = dummyTodos

const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<Todo>) => {
			state.unshift(action.payload)
		},
		toggle: (state, action: PayloadAction<string>) => {
			const todo = state.find(todo => todo.id === action.payload)

			if (!todo) {
				toast.warning('Could not find todo to toggle')
				return
			}

			todo.completed = !todo.completed
		},
		remove: (state, action: PayloadAction<string>) => {
			// return state.filter(todo => todo.id !== action.payload)

			// or filter like above
			const todoIndex = state.findIndex(todo => todo.id === action.payload)

			if (todoIndex === -1) {
				toast.warning('Could not find todo to remove')
				return
			}

			state.splice(todoIndex, 1)
		},
	}
})

export const { add, toggle, remove } = todosSlice.actions

export default todosSlice.reducer
