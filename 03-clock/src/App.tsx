import Clock from './components/Clock'
import './assets/scss/App.scss'
import { useState } from 'react'

const App = () => {
	const [showClock, setShowClock] = useState(false)

	return (
		<div className="container">
			<button
				onClick={() => setShowClock(!showClock)}
				className='btn btn-primary'
			>
				Click
			</button>

			{showClock && <Clock />}
		</div>
	)
}

export default App
