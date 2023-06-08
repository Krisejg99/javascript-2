import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import useGetData from '../hooks/useGetData'
import { DogAPI_RandomImageResponse } from '../types'

const RandomDogPage = () => {
	const { data, setUrl } = useGetData<DogAPI_RandomImageResponse>('https://dog.ceo/api/breeds/image/random')

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


			{!data && <p>Loading...</p>}

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
