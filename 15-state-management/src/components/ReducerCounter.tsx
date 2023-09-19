import Button from 'react-bootstrap/Button'
import { Reducer, useReducer } from 'react'
import { ButtonGroup } from 'react-bootstrap'

enum PointsActionTypes {
	INCREMENT = 'increment',
	DECREMENT = 'decrement',
	RESET = 'reset'
}

type PointsState = {
	points: number
}

type PointsAction = {
	type: PointsActionTypes
	payload?: {
		amount?: number
	}
}

const initialState: PointsState = {
	points: 0
}

const pointsReducer = (state: PointsState, action: PointsAction) => {
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

const decreasePoints = (amount?: number) => {
	return {
		type: PointsActionTypes.DECREMENT,
		payload: { amount },
	}
}

const increasePoints = (amount?: number) => {
	return {
		type: PointsActionTypes.INCREMENT,
		payload: { amount },
	}
}

const resetPoints = () => {
	return {
		type: PointsActionTypes.RESET,
	}
}

const ReducerCounter = () => {
	const [state, dispatch] = useReducer<Reducer<PointsState, PointsAction>>(pointsReducer, initialState)

	return (
		<div className="counter">
			{/* Decrease points */}
			<ButtonGroup>
				<Button
					variant="warning"
					onClick={() => dispatch(decreasePoints(10))}
				>-10</Button>
				<Button
					variant="warning"
					onClick={() => dispatch(decreasePoints(5))}
				>-5</Button>
				<Button
					variant="warning"
					onClick={() => dispatch(decreasePoints())}
				>-1</Button>
			</ButtonGroup>

			{/* Current points */}
			<span className="points">{state.points}</span>

			{/* Increase points */}
			<ButtonGroup>
				<Button
					variant="success"
					onClick={() => dispatch(increasePoints())}
				>+1</Button>
				<Button
					variant="success"
					onClick={() => dispatch(increasePoints(5))}
				>+5</Button>
				<Button
					variant="success"
					onClick={() => dispatch(increasePoints(10))}
				>+10</Button>
			</ButtonGroup>

			{/* Reset state */}
			<Button
				className="ms-3"
				variant="danger"
				onClick={() => dispatch(resetPoints())}
			>🧹</Button>
		</div>
	)
}

export default ReducerCounter
