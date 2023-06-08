import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'
import useGetData from '../hooks/useGetData'
import { DogAPI_RandomImageResponse } from '../types'

const RandomDogPage = () => {
	const { data, setUrl, loading, error } = useGetData<DogAPI_RandomImageResponse>('https://dog.ceo/api/breeds/image/random')

	return (
		<>
			<h1>Random Dog Image</h1>

			<Button
				variant='primary'
				onClick={() => setUrl('https://dog.ceo/api/breeds/image/random')}
			>Random dog</Button>
			<Button
				variant='primary'
				onClick={() => setUrl('https://dog.ceo/api/breed/boxer/images/random')}
			>Random boxer dog</Button>

			{loading && <p>Loading...</p>}

			{error && <Alert variant='danger'>{error}</Alert>}

			{data && data.status && (
				<Image
					src={data.message}
					fluid
				/>
			)}
		</>
	)
}

export default RandomDogPage
