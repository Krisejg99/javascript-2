import { useQuery } from '@tanstack/react-query'
import { getRandomCat } from '../services/TheCatAPI'
import { Image, Button, Spinner } from 'react-bootstrap'

const RandomCatPage = () => {
	const { data, refetch, isLoading, isError, isStale, isFetching } = useQuery({
		queryKey: ['random-cat'],
		queryFn: getRandomCat
	})

	return (
		<>
			<h1>Random Cat</h1>

			<span>isLoading: {isLoading ? 'true' : 'false'}</span><br />
			<span>isFetching: {isFetching ? 'true' : 'false'}</span><br />
			<span>isStale: {isStale ? 'true' : 'false'}</span><br />
			<span>isError: {isError ? 'true' : 'false'}</span><br /><br />

			<Button
				onClick={() => refetch()}
				disabled={isFetching}
			>
				{isFetching ? 'Refreshing new cat...' : 'Refresh cat'}
			</Button>

			{isFetching && (
				<Spinner animation='border' />
			)}

			{data && (
				data.map(cat => (
					<Image
						key={cat.id}
						src={cat.url}
						className='d-block'
					/>
				))
			)}
		</>
	)
}

export default RandomCatPage
