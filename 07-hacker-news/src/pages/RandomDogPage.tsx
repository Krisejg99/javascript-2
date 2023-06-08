import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'
import useGetData from '../hooks/useGetData'
import { DogAPI_RandomImageResponse } from '../types'

const RandomDogPage = () => {
	const { data, url, setUrl, setSameUrl, loading, error } = useGetData<DogAPI_RandomImageResponse>()

	return (
		<>
			<h1>Random Dog Image</h1>

			<div className="d-flex flex-column align-items-center">
				<ButtonGroup className='mb-4'>
					<Button
						variant='primary'
						onClick={() => setUrl('https://dog.ceo/api/breeds/image/random')}
					>
						Dog
					</Button>

					<Button
						variant='success'
						onClick={() => setUrl('https://dog.ceo/api/breed/boxer/images/random')}
					>
						Boxer Dog
					</Button>

					{url && (
						<Button
							variant='warning'
							onClick={() => setSameUrl(url)}
						>
							Refresh
						</Button>
					)}
				</ButtonGroup>

				{data && data.status && (
					<Image
						src={data.message}
						fluid
					/>
				)}

				{loading && <p>Loading...</p>}

				{error && <Alert variant='danger'>{error}</Alert>}
			</div>
		</>
	)
}

export default RandomDogPage
