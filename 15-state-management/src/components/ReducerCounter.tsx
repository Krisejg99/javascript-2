import Button from 'react-bootstrap/Button'
import { Reducer, useReducer } from 'react'

enum PointsActionTypes {
	INCREMENT = "increment",
	DECREMENT = "decrement",
}

type PointsState = {
	points: number
}

type PointsAction = {
	type: PointsActionTypes
}

const initialState: PointsState = {
	points: 0
}

const pointsReducer = (state: PointsState, action: PointsAction) => {
	switch (action.type) {
		case PointsActionTypes.DECREMENT:
			return {
				...state,
				points: state.points - 1
			}

		case PointsActionTypes.INCREMENT:
			return {
				...state,
				points: state.points + 1
			}

		default:
			return state
	}
}

const decreasePoints = () => {
	return { type: PointsActionTypes.DECREMENT }
}

const increasePoints = () => {
	return { type: PointsActionTypes.INCREMENT }
}

const ReducerCounter = () => {
	const [state, dispatch] = useReducer<Reducer<PointsState, PointsAction>>(pointsReducer, initialState)

	return (
		<div className="counter">
			<Button
				variant="warning"
				onClick={() => dispatch(decreasePoints())}
			>-</Button>

			<span className="points">{state.points}</span>

			<Button
				variant="success"
				onClick={() => dispatch(increasePoints())}
			>+</Button>
		</div>
	)
}

export default ReducerCounter
