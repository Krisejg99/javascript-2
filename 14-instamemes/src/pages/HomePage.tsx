import useAuth from "../hooks/useAuth"
import Container from 'react-bootstrap/Container'
import UploadMeme from "../components/UploadMeme"

const HomePage = () => {
	const { currentUser } = useAuth()

	return (
		<Container className='py-3 center-y'>
			<h1>InstaMemes</h1>

			{currentUser && <UploadMeme />}
		</Container>
	)
}

export default HomePage
