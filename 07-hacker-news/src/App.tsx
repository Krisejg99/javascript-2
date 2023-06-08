import './assets/scss/App.scss'
import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import Navigation from './components/Navigation'
import NotFound from './pages/NotFound'
import { useContext } from 'react'
import { ThemeContext } from './contexts/ThemeContextProvider'

const App = () => {
	const { isDarkMode } = useContext(ThemeContext)

	return (
		<div id="App" className={isDarkMode ? 'bg-dark text-white' : ''}>
			<Navigation />

			<Container className='py-3'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/search' element={<SearchPage />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App
