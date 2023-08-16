import { useQuery } from '@tanstack/react-query'
import { getRandomCatImage } from '../services/TheCatAPI'
import { Image, Button, Alert } from 'react-bootstrap'
import CatSpinner from '../components/CatSpinner'

const RandomCatPage = () => {
	const { data, refetch, isLoading, isError, error, isStale, isFetching } = useQuery({
		queryKey: ['random-cat'],
		queryFn: getRandomCatImage
	})

	if (error) {
		return <Alert variant='error'>Something went wrong, refresh the page.</Alert>
	}

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
				className='mb-3'
			>
				{isFetching ? 'Finding new cat...' : 'Refresh cat'}
			</Button>

			{isFetching && <CatSpinner />}

			{data && (
				<Image
					src={data.url}
					className='d-block'
					fluid
				/>
			)}
		</>
	)
}

export default RandomCatPage
