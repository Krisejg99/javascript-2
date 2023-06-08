
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const HomePage = () => {

	return (
		<div>
			<h1>Welcome</h1>

			<Link to='/search'>
				<Button>Search</Button>
			</Link>
		</div>
	)
}

export default HomePage
