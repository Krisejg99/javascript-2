import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRandomCatImage } from '../services/TheCatAPI'
import { Image, Button, Alert } from 'react-bootstrap'
import { Breed } from '../types/TheCatAPI.types'

const breeds: Breed[] = [
	{ id: '', name: 'Random' },
	{ id: 'sphy', name: 'Sphynx' },
	{ id: 'ragd', name: 'Ragdoll' },
]

const RandomCatPage = () => {
	const [breed, setBreed] = useState('')
	const { data, isLoading, isError, error, isStale, isFetching, refetch } = useQuery({
		queryKey: !breed ? ['random-cat'] : ['random-cat', breed],
		queryFn: () => getRandomCatImage(breed),
		cacheTime: 1000 * 60,
		keepPreviousData: true,
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

			{breeds.map(b => (
				<Button
					key={b.id}
					onClick={() => breed === b.id ? refetch() : setBreed(b.id)}
					disabled={isFetching}
					className='mb-3 me-3'
				>
					{isFetching ? 'Finding...' : b.name}
				</Button>
			))}

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
