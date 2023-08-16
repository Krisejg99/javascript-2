import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRandomCatImage } from '../services/TheCatAPI'
import { Image, Button, Alert } from 'react-bootstrap'
import CatSpinner from '../components/CatSpinner'

const RandomCatPage = () => {
	const [breedId, setBreedId] = useState('')
	const { data, isLoading, isError, error, isStale, isFetching, refetch } = useQuery({
		queryKey: !breedId ? ['random-cat'] : ['random-cat', breedId],
		queryFn: () => getRandomCatImage(breedId),
	})

	if (error) {
		return <Alert variant='error'>Something went wrong, refresh the page.</Alert>
	}

	return (
		<>
			<span>isLoading: {isLoading ? 'true' : 'false'}</span><br />
			<span>isFetching: {isFetching ? 'true' : 'false'}</span><br />
			<span>isStale: {isStale ? 'true' : 'false'}</span><br />
			<span>isError: {isError ? 'true' : 'false'}</span><br />
			<span>error: {error ? 'true' : 'false'}</span><br />

			<h1>Find your cat:</h1>

			<Button
				onClick={() => breedId === '' ? refetch() : setBreedId('')}
				disabled={isFetching}
				className='mb-3 me-3'
			>
				{isFetching ? 'Finding...' : 'Random'}
			</Button>
			<Button
				onClick={() => breedId === 'sphy' ? refetch() : setBreedId('sphy')}
				disabled={isFetching}
				className='mb-3 me-3'
			>
				{isFetching ? 'Finding...' : 'Sphynx'}
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
