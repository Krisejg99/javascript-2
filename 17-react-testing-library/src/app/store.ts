import { configureStore } from '@reduxjs/toolkit'
import accountReducer from '../features/account/accountSlice'
import todosReducer from '../features/todos/todosSlice'

export const store = configureStore({
	reducer: {
		account: accountReducer,
		todos: todosReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
