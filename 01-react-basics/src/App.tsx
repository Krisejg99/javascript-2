import { useState } from 'react'
import './App.css'

type Post = {
	id: number
	title: string
	likes: number
}

const App = () => {
	const [msg, setMsg] = useState('Hi mom')
	const [clicks, setClicks] = useState(0)
	const [posts, setPosts] = useState<Post[]>([
		{ id: 1, title: 'React Rocks!', likes: 420 },
		{ id: 2, title: 'TypeScript is lit!', likes: 1337 },
		{ id: 3, title: 'CSS?...', likes: 69 },
	])
	const [salary, setSalary] = useState(10)
	const [showSalary, setShowSalary] = useState(false)

	const handleButtonClick = () => {
		setMsg('Bye mom')
		setClicks(clicks + 1)
		setClicks(prevClicks => prevClicks + 1)

	}

	const handleSalaryFlucuation = (amount: number) => {
		const newSalary = salary + amount
		setSalary(newSalary)
		if (newSalary < 5) setSalary(5)
	}

	return (
		<div className="App">
			<h1>React Basics</h1>
			<h2>{msg}</h2>
			<p>You have clicked the button {clicks} times.</p>
			<button onClick={handleButtonClick} className="btn btn-success btn-lg">Click me!</button>
			<button onClick={() => setMsg('Hi dad!')} className="btn btn-warning btn-lg">Hi dad!</button>

			<hr />

			<button className="btn btn-primary" onClick={() => setShowSalary(!showSalary)}>
				{showSalary ? "Hide salary" : "Show salary"}
			</button>

			{showSalary && (
				<>
					<p>Salary per hour: {salary} &euro;</p>

					{salary < 10 && <div>GET A NEW JOB BRO!</div>}

					<div className="buttons">
						<div className="mb-1">
							<button onClick={() => handleSalaryFlucuation(-1)} className="btn btn-warning btn-lg">Decrease 1 &euro; 😢</button>
							<button onClick={() => handleSalaryFlucuation(1)} className="btn btn-primary btn-lg">Raise 1 &euro; 🤑</button>
						</div>

						<div className="mb-1">
							<button onClick={() => handleSalaryFlucuation(-5)} className="btn btn-danger btn-lg">Decrease 5 &euro; 😢😢😢</button>
							<button onClick={() => handleSalaryFlucuation(5)} className="btn btn-success btn-lg">Raise 5 &euro; 🤑🤑🤑</button>
						</div>
					</div>
				</>
			)}

			<hr />

			<h2>Posts</h2>

			<ul>
				{posts.map((post, index) => (
					<li key={index}>
						{post.title} ({post.likes} likes)
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
