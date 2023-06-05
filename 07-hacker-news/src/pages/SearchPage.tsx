import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import { searchByDate as HN_SearchByDate } from '../services/HackerNewsAPI'
import { HN_SearchResponse } from '../types'
import Alert from 'react-bootstrap/Alert'
import Pagination from '../components/Pagination'

const SearchPage = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [page, setPage] = useState(0)
	const [searchInput, setSearchInput] = useState('')
	const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(null)
	const queryRef = useRef('')

	const searchHackerNews = async (searchQuery: string, searchPage = 0) => {
		setError(null)
		setSearchResult(null)
		setLoading(true)

		queryRef.current = searchQuery

		try {
			const res = await HN_SearchByDate(searchQuery, searchPage)
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

		setPage(0)
		searchHackerNews(searchInput)
	}

	useEffect(() => {
		if (!queryRef.current) return

		searchHackerNews(queryRef.current, page)
	}, [page])

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

			{error && <Alert variant='warning'>{error}</Alert>}

			{searchResult && (
				<div id="search-result">
					<p>Showing {searchResult.nbHits} search results for '{queryRef.current}'...</p>

					<ListGroup className='mb-3'>
						{searchResult.hits.map(hit => {
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

					<Pagination
						page={page + 1}
						totalPages={searchResult.nbPages}
						hasPreviousPage={page > 0}
						hasNextPage={page + 1 < searchResult.nbPages}
						onPreviousPage={() => setPage(prevPage => prevPage - 1)}
						onNextPage={() => setPage(prevPage => prevPage + 1)}
					/>
				</div>
			)}
		</>
	)
}

export default SearchPage
