import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink } from 'react-router-dom'

const Navigation = () => {
	return (
		<Navbar expand="lg" className='w-100' bg="dark" data-bs-theme="dark">
			<Container>
				<Navbar.Brand as={Link} to="/">Home</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/todos">Todos</Nav.Link>
						<Nav.Link as={NavLink} to="/todos/create">Create</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
