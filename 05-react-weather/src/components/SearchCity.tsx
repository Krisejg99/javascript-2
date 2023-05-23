import React, { useState } from 'react'

interface IProps {
	onSearch: (city: string) => void
}

const SearchCity: React.FC<IProps> = ({ onSearch }) => {
	const [city, setCity] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		onSearch(city)

		setCity('')
	}

	return (
		<div id="search-wrapper">
			<form
				id="search-form"
				onSubmit={handleSubmit}
			>
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Enter city to search for" aria-label="City" aria-details="Search for city to show current weather for."
						onChange={e => setCity(e.target.value)}
						value={city}
					/>

					<button
						type="submit"
						className="btn btn-success"
					>🔍</button>
				</div>
			</form>
		</div>
	)
}

export default SearchCity
