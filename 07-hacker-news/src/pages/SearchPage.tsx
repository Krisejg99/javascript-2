import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'

const SearchPage = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [searchInput, setSearchInput] = useState('')


	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!searchInput.trim().length) return

		setLoading(true)

		try {

		}
		catch (err: any) {
			setError(err.message)
		}

		setLoading(false)
	}

	return (
		<>
			<h1>Search 🔎</h1>

			<Form
				className='mb-3'
				onSubmit={handleSubmit}
			>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Control
						type="text"
						placeholder="Enter your search query"
						required
						value={searchInput}
						onChange={e => setSearchInput(e.target.value)}
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button variant="success" type="submit" disabled={!searchInput.trim().length}>Search</Button>
				</div>
			</Form>

			{false && <p>Loading...</p>}

			{false && <p>Error!</p>}

			{true && (
				<div id="search-result">
					<p>Showing HITS search results for QUERY...</p>

					<ListGroup className='mb-3'>
						{[{}, {}].map((HIT) => {
							return (
								<ListGroup.Item
									action
									href={''}
									key={''}
								>
									<h2 className='h3'>TITLE</h2>
									<p className="text-muted small mb-0">POINTS points by AUTHOR at CREATED_AT</p>
								</ListGroup.Item>
							)
						})}
					</ListGroup>

					<div className="d-flex justify-content-between align-items-center">
						<div className="prev">
							<Button
								variant='primary'
							// onClick={}
							>
								Previous Page
							</Button>
						</div>

						<div className="page">PAGE</div>

						<div className="next">
							<Button
								variant='primary'
							>
								Next Page
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default SearchPage
