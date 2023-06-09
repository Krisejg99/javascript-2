import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import useChuckNorrisJoke from '../hooks/useChuckNorrisJoke'

const ChuckNorrisPage = () => {
	const res = useChuckNorrisJoke()

	return (
		<>
			<h1>Chuck Norris fact</h1>

			<div className="d-flex flex-column align-items-center">
				<Button
					variant='warning'
					onClick={res.execute}
				>
					Refresh
				</Button>

				{res.data && (
					<p className="display-1 text-center">{res.data.value}</p>
				)}

				{res.isLoading === true && (
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				)}

				{res.isError === true && <Alert variant='danger'>{res.error}</Alert>}
			</div>
		</>
	)
}

export default ChuckNorrisPage
