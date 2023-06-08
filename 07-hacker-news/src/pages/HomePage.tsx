import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContextProvider'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const HomePage = () => {
	const { isDarkMode } = useContext(ThemeContext)

	return (
		<div>
			<h1>Welcome</h1>

			<p>Your theme is: {isDarkMode ? 'dark' : 'light'}</p>

			<Link to='/search'>
				<Button>Search</Button>
			</Link>
		</div>
	)
}

export default HomePage
