import React from 'react'
import Button from 'react-bootstrap/Button'

interface IProps {
	page: number
	totalPages: number
	hasPreviousPage: boolean
	hasNextPage: boolean
	onPreviousPage: () => void
	onNextPage: () => void
}

const Pagination: React.FC<IProps> = ({ page, totalPages, hasPreviousPage, hasNextPage, onPreviousPage, onNextPage }) => {
	return (
		<div className="d-flex justify-content-between align-items-center">
			<div className="prev">
				<Button
					disabled={!hasPreviousPage}
					variant='primary'
					onClick={onPreviousPage}
				>
					Previous Page
				</Button>
			</div>

			<div className="page">Page {page} / {totalPages}</div>

			<div className="next">
				<Button
					disabled={!hasNextPage}
					variant='primary'
					onClick={onNextPage}
				>
					Next Page
				</Button>
			</div>
		</div>
	)
}

export default Pagination
