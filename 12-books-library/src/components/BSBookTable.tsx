import React from 'react'
import Table from 'react-bootstrap/Table'
import { Book } from '../types/BooksAPI.types'
import { Link } from 'react-router-dom'

interface IProps {
	books: Book[]
}

const BSBookTable: React.FC<IProps> = ({ books }) => {
	if (!books.length) return <p>No books for you!</p>

	return (
		<Table responsive striped hover>
			<thead>
				<tr>
					<th>Title</th>
					<th>Author</th>
					<th>Author Birthdate</th>
					<th>Pages</th>
					<th>Published</th>
				</tr>
			</thead>

			<tbody>
				{books.map(book => (
					<tr key={book.id}>
						<td>{book.title}</td>
						<td>
							<Link to={'/authors/' + book.author.id}>{book.author.name}</Link>
						</td>
						<td>{book.author.date_of_birth}</td>
						<td className="text-end">{book.pages}</td>
						<td>{book.published}</td>
					</tr>
				))}
			</tbody>
		</Table >
	)
}

export default BSBookTable
