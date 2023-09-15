import useAuth from "../hooks/useAuth"
import Container from 'react-bootstrap/Container'
import Row from "react-bootstrap/Row"
import UploadMeme from "../components/UploadMeme"
import useMemes from "../hooks/useMemes"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"

const HomePage = () => {
	const { currentUser } = useAuth()
	const { data: memes, loading } = useMemes()

	return (
		<Container className='py-3 center-y'>
			<h1>InstaMemes</h1>

			{currentUser && <UploadMeme />}

			<hr />

			{loading && <p>Loading memes...</p>}

			{!loading && memes && memes.length
				? (
					<Row xs={1} sm={2} md={3} lg={4}>
						{memes.map(meme => (
							<Col key={meme._id} className="d.flex mb-4">
								<Card>
									<Card.Header>{meme.name}</Card.Header>

									<a href={meme.url} target="_blank" rel="noreferrer nofollow">
										<Card.Img src={meme.url} />
									</a>

									<Card.Footer>
										{Math.round(meme.size / 1024)} KB
									</Card.Footer>
								</Card>
							</Col>
						))}
					</Row>
				)
				: null}
		</Container>
	)
}

export default HomePage
