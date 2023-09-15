import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { NavDropdown } from 'react-bootstrap'

const Navigation = () => {
	const { currentUser, userEmail, userDisplayName, userPhotoURL } = useAuth()

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">🔥 Firebase Todos</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{currentUser
							? <>
								<Nav.Link as={NavLink} end to="/todos">Todos</Nav.Link>

								<NavDropdown title={userPhotoURL
									? <Image
										src={userPhotoURL}
										height={30}
										width={30}
										title={(userDisplayName || userEmail) ?? ''}
										roundedCircle
										className='image-square object-position-top'
									/>

									: userDisplayName || userEmail}
								>

									<NavDropdown.Item as={NavLink} end to="/update-profile">Update Profile</NavDropdown.Item>
									<NavDropdown.Item as={NavLink} end to="/logout">Logout</NavDropdown.Item>
								</NavDropdown>
							</>

							: <>
								<Nav.Link as={NavLink} end to="/login">Login</Nav.Link>
								<Nav.Link as={NavLink} end to="/signup">Sign Up</Nav.Link>
							</>
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
