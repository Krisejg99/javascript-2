import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dummyTodos } from '../../data/todos'
import { Todo } from '../../types/Todo.types'

const initialState = dummyTodos

const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<Todo>) => {
			state.push(action.payload)
		},
	}
})

export const { addTodo } = todosSlice.actions

export default todosSlice.reducer
