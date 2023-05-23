import React, { useState } from 'react'

interface IProps {
	onSearch: (city: string) => void
}

const SearchCity: React.FC<IProps> = ({ onSearch }) => {
	const [inputCity, setInputCity] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		onSearch(inputCity)

		setInputCity('')
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
						onChange={e => setInputCity(e.target.value)}
						value={inputCity}
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
