import { useState } from 'react'


const ClickCounter = () => {
	const [msg, setMsg] = useState('Hi mom')
	const [clicks, setClicks] = useState(0)

	const handleButtonClick = () => {
		setMsg('Bye mom')
		setClicks(clicks + 1)
		setClicks(prevClicks => prevClicks + 1)
	}

	return (
		<>
			<h2>Click Counter</h2>
			<h3>{msg}</h3>
			<p>You have clicked the button {clicks} times.</p>
			<button onClick={handleButtonClick} className="btn btn-success btn-lg">Click me!</button>
			<button onClick={() => setMsg('Hi dad!')} className="btn btn-warning btn-lg">Hi dad!</button>
		</>
	)
}

export default ClickCounter
