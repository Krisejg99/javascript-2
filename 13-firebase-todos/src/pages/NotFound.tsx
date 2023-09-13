import Image from 'react-bootstrap/Image'
import SadKittyCat from '../assets/images/sad-kitten.gif'
import Container from 'react-bootstrap/Container'

const NotFound = () => {
	return (
		<Container className='py-3 center-y'>
			<h1>Sorry, that page could not be found 😔</h1>

			<Image src={SadKittyCat} fluid />
		</Container>
	)
}

export default NotFound
