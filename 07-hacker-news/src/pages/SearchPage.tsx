import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import { searchByDate as HN_SearchByDate } from '../services/HackerNewsAPI'
import { HN_SearchResponse } from '../types'

const SearchPage = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [searchInput, setSearchInput] = useState('')
	const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(null)

	const searchHackerNews = async (searchQuery: string, page = 0) => {
		setError(null)
		setSearchResult(null)
		setLoading(true)

		try {
			const res = await HN_SearchByDate(searchQuery, page)
			setSearchResult(res)
			console.log(res)
		}
		catch (err: any) {
			setError(err.message)
		}

		setLoading(false)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!searchInput.trim().length) return

		searchHackerNews(searchInput)
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

			{loading && <p>Loading...</p>}

			{error && <p>Error!</p>}

			{searchResult && (
				<div id="search-result">
					<p>Showing {searchResult.nbHits} search results for {searchInput}...</p>

					<ListGroup className='mb-3'>
						{searchResult.hits.map(hit => {
							console.log(hit)
							return (
								<ListGroup.Item
									action
									href={hit.url}
									key={hit.objectID}
								>
									<h2 className='h3'>{hit.title}</h2>
									<p className="text-muted small mb-0">{hit.points} points by {hit.author} at {hit.created_at}</p>
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
