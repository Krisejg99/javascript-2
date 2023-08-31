import { Card } from 'react-bootstrap'
import WarningAlert from '../components/alerts/WarningAlert'
import TanstackSortableTable from '../components/TanstackSortableTable'
import useBooks from '../hooks/useBooks'
import { Book } from '../types/BooksAPI.types'
import { ColumnDef } from '@tanstack/react-table'
import CreateBookForm from '../components/forms/CreateBookForm'

const columns: ColumnDef<Book>[] = [
	{
		accessorKey: 'title',
		header: 'Title',
	},
	{
		accessorKey: 'author.name',
		header: 'Author',
	},
	{
		accessorKey: 'pages',
		header: 'Pages',
	},
	{
		accessorKey: 'published',
		header: 'Published',
	},
]

const BooksPage = () => {
	const { data: books, isError, isLoading } = useBooks()

	return (
		<>
			<h1 className="mb-3">Books</h1>

			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching books. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && (
				<p>Loading books...</p>
			)}

			{books && (
				<TanstackSortableTable
					columns={columns}
					data={books}
				/>
			)}

			<Card>
				<Card.Body>
					<Card.Title>Create Book</Card.Title>

					<CreateBookForm />
				</Card.Body>
			</Card>
		</>
	)
}

export default BooksPage
