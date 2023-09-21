import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Account } from '../../types/Account.types'
import { toast } from 'react-toastify'

const initialState: Account = {
	balance: 42,
}

export const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		deposit: (state, action: PayloadAction<number>) => {
			state.balance += action.payload
		},
		withdraw: (state, action: PayloadAction<number>) => {
			if (state.balance < action.payload) {
				toast.warning("Can't go below 0")
				return
			}

			state.balance -= action.payload
		},
	}
})

export const { deposit, withdraw } = accountSlice.actions

export default accountSlice.reducer
