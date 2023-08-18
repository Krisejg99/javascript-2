import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import { searchByDate as HN_SearchByDate } from '../services/HackerNewsAPI'
import Alert from 'react-bootstrap/Alert'
import Pagination from '../components/Pagination'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const SearchHNPage = () => {
	const [page, setPage] = useState(0)
	const [searchInput, setSearchInput] = useState('')
	const [searchParams, setSearchParams] = useSearchParams()

	const query = searchParams.get('query') ?? ''

	const { data: searchResult, isError } = useQuery({
		queryKey: ['search-hn', { query, page }],
		queryFn: (() => HN_SearchByDate(query, page)),
		enabled: !!query,
		cacheTime: 1000 * 60,
		keepPreviousData: true,
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!searchInput.trim().length) return

		setPage(0)
		setSearchParams({ query: searchInput, page: '0' })
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

			{isError && <Alert variant='warning'>An error occured... Yikes</Alert>}

			{searchResult && (
				<div id="search-result">
					<p>Showing {new Intl.NumberFormat().format(searchResult.nbHits)} search results for '{query}'...</p>

					<Pagination
						page={searchResult.page + 1}
						totalPages={searchResult.nbPages}
						hasPreviousPage={page > 0}
						hasNextPage={page + 1 < searchResult.nbPages}
						onPreviousPage={() => setPage(prevPage => prevPage - 1)}
						onNextPage={() => setPage(prevPage => prevPage + 1)}
					/>

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
				</div>
			)}
		</>
	)
}

export default SearchHNPage
