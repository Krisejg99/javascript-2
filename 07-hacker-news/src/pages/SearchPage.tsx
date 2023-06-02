import { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'

const SearchPage = () => {
	return (
		<>
			<h1>Search 🔎</h1>

			<Form className='mb-3'>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Control
						type="text"
						placeholder="Enter your search query"
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button variant="success" type="submit">Search</Button>
				</div>
			</Form>

			{false && <p>Loading...</p>}
		</>
	)
}

export default SearchPage
