import { useState } from 'react'

const Salary = () => {
	const [salary, setSalary] = useState(10)
	const [showSalary, setShowSalary] = useState(false)

	const handleSalaryFlucuation = (amount: number) => {
		const newSalary = salary + amount
		setSalary(newSalary)
		if (newSalary < 5) setSalary(5)
	}

	return (
		<>
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
		</>
	)
}

export default Salary
