import { createContext, useReducer, Reducer } from 'react'
import { PointsAction, PointsState, initialState, pointsReducer } from '../reducers/pointsReducer'

type StoreContextType = {
	state: PointsState
	dispatch: React.Dispatch<PointsAction>
}

export const StoreContext = createContext<StoreContextType | null>(null)

type StoreContextProviderProps = {
	children: React.ReactNode
}

const StoreContextProvider: React.FC<StoreContextProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer<Reducer<PointsState, PointsAction>>(pointsReducer, initialState)

	return (
		<StoreContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</StoreContext.Provider >
	)
}

export default StoreContextProvider
