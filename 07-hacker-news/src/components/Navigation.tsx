import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { NavLink, Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContextProvider'


const Navigation = () => {
	const { isDarkMode, toggleTheme } = useContext(ThemeContext)

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">🕵🏻‍♂️ Hacker News</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/search">Search</Nav.Link>

						<Button variant='primary' onClick={toggleTheme}>
							{isDarkMode ? '☀️' : '🌙'}
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar >
	)
}

export default Navigation
