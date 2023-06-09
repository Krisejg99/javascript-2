import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import useGetData from '../hooks/useGetData'
import { ChuckNorrisAPI_RandomJokeResponse } from '../types'

const ChuckNorrisPage = () => {
	const { data, execute, isLoading, error, isError } = useGetData<ChuckNorrisAPI_RandomJokeResponse>('https://api.chucknorris.io/jokes/random')

	return (
		<>
			<h1>Chuck Norris fact</h1>

			<div className="d-flex flex-column align-items-center">
				<Button
					variant='warning'
					onClick={execute}
				>
					Refresh
				</Button>

				{data && (
					<p className="display-1 text-center">{data.value}</p>
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

export default ChuckNorrisPage
