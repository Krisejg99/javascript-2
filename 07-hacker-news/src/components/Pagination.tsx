import React from 'react'
import Button from 'react-bootstrap/Button'
import { HN_SearchResponse } from '../types'

interface IProps {
	currPage: number
	onPageChange: (page: number) => void
	searchResult: HN_SearchResponse
}

const Pagination: React.FC<IProps> = ({ currPage, onPageChange, searchResult }) => {
	return (
		<div className="d-flex justify-content-between align-items-center">
			<div className="prev">
				<Button
					disabled={currPage <= 0}
					variant='primary'
					onClick={() => onPageChange(currPage - 1)}
				>
					Previous Page
				</Button>
			</div>

			<div className="page">Page {searchResult.page + 1} / {searchResult.nbPages}</div>

			<div className="next">
				<Button
					disabled={currPage + 1 >= searchResult.nbPages}
					variant='primary'
					onClick={() => onPageChange(currPage + 1)}
				>
					Next Page
				</Button>
			</div>
		</div>
	)
}

export default Pagination
