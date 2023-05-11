import { useEffect, useState } from 'react'

const Clock = () => {
	const [time, setTime] = useState(() => new Date().toLocaleTimeString())

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime(new Date().toLocaleTimeString())
			console.log('tick', time)
		}, 1000)

		return () => {
			console.log('STOP!')
			clearInterval(intervalId)
		}

	}, [])

	useEffect(() => { document.title = time }, [time])

	return (
		<div className="display-1 text-center">
			{time}
		</div>
	)
}

export default Clock
