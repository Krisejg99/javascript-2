import { useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const LogOutPage = () => {
	const navigate = useNavigate()
	const { logOut } = useAuth()

	useEffect(() => {
		(async () => {
			await logOut()
			navigate('/')
		})()
	}, [logOut, navigate])

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title className="mb-3">Login</Card.Title>
							<Card.Text>Please wait while you're being logged out...</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default LogOutPage
