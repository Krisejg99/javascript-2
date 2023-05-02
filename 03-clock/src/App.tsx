import { useEffect, useState } from 'react'
import './assets/scss/App.scss'

const App = () => {
	const [time, setTime] = useState(() => new Date().toLocaleTimeString())

	useEffect(() => {
		setInterval(() => {
			setTime(new Date().toLocaleTimeString())
			console.log('tick', time)
		}, 1000)
	}, [])

	return (
		<div className="container">
			<div className="display-1 text-center">
				{time}
			</div>
		</div>
	)
}

export default App
