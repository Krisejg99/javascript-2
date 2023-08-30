import { createColumnHelper } from '@tanstack/react-table'
import WarningAlert from '../components/alerts/WarningAlert'
import useAuthors from '../hooks/useAuthors'
import { Author } from '../types/BooksAPI.types'
import TanstackSortableTable from '../components/TanstackSortableTable'
import { Card } from 'react-bootstrap'
import CreateAuthorForm from '../components/forms/CreateAuthorForm'
import { Link } from 'react-router-dom'

// // Another way of making columns
// const columns: ColumnDef<Author>[] = [
// 	{
// 		accessorKey: 'name',
// 		header: 'Name',
// 	},
// 	{
// 		accessorKey: 'date_of_birth',
// 		header: 'Date of birth',
// 	},
// ]

const columnHelper = createColumnHelper<Author>()

const columns = [
	columnHelper.accessor('id', {
		header: 'ID'
	}),
	columnHelper.group({
		header: 'Author Details',
		columns: [
			columnHelper.accessor('name', {
				header: 'Name'
			}),
			columnHelper.accessor('date_of_birth', {
				header: 'Date of birth'
			}),
		]


	}),
	columnHelper.display({
		id: 'actions',
		cell: props => (
			<div className="d-flex justify-content-end">
				<Link className="btn btn-primary btn-sm" to={`/authors/${props.row.original.id}`}>
					View
				</Link>
			</div>
		),
	}),
]

const AuthorsPage = () => {
	const { data: authors, isError, isLoading } = useAuthors()

	return (
		<>
			<h1 className="mb-3">Authors</h1>

			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching authors. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && (
				<p>Loading authors...</p>
			)}

			{authors && (
				<TanstackSortableTable
					columns={columns}
					data={authors}
				/>
			)}

			<Card>
				<Card.Body>
					<Card.Title>Create Author</Card.Title>
					<CreateAuthorForm />
				</Card.Body>
			</Card>
		</>
	)
}

export default AuthorsPage
