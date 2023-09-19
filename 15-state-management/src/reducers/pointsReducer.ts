export enum PointsActionTypes {
	INCREMENT = 'increment',
	DECREMENT = 'decrement',
	RESET = 'reset'
}

export type PointsState = {
	points: number
}

export type PointsAction = {
	type: PointsActionTypes
	payload?: {
		amount?: number
	}
}

export const initialState: PointsState = {
	points: 0
}

export const pointsReducer = (state: PointsState, action: PointsAction) => {
	const amount = (action.payload?.amount ?? 1)

	switch (action.type) {
		case PointsActionTypes.DECREMENT:
			return {
				...state,
				points: state.points - amount
			}

		case PointsActionTypes.INCREMENT:
			return {
				...state,
				points: state.points + amount
			}

		case PointsActionTypes.RESET:
			return {
				...state,
				points: initialState.points
			}

		default:
			return state
	}
}
