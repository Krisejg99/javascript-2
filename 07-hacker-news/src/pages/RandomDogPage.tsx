import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import useGetRandomDogImage from '../hooks/useGetRandomDogImage'

const RandomDogPage = () => {
	const { data, changeUrl, execute, isLoading, error, isError } = useGetRandomDogImage()

	return (
		<>
			<h1>Random Dog Image</h1>

			<div className="d-flex flex-column align-items-center">
				<ButtonGroup className='mb-4'>
					<Button
						variant='primary'
						onClick={() => changeUrl('https://dog.ceo/api/breeds/image/random')}
					>
						Dog
					</Button>

					<Button
						variant='success'
						onClick={() => changeUrl('https://dog.ceo/api/breed/boxer/images/random')}
					>
						Boxer Dog
					</Button>

					<Button
						variant='warning'
						onClick={execute}
					>
						Refresh
					</Button>
				</ButtonGroup>

				{data && data.status && (
					<Image
						src={data.message}
						fluid
					/>
				)}

				{isLoading === true && (
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				)}

				{isError === true && <Alert variant='danger'>{error}</Alert>}
			</div>
		</>
	)
}

export default RandomDogPage
