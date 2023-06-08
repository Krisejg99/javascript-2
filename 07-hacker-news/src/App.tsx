import './assets/scss/App.scss'
import classNames from 'classnames'
import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import Navigation from './components/Navigation'
import NotFound from './pages/NotFound'
import useThemeContext from './hooks/useThemeContext'
import RandomDogPage from './pages/RandomDogPage'

const App = () => {
	const { isDarkMode } = useThemeContext()

	const cssClasses = classNames({
		'bg-dark text-white': isDarkMode
	})

	return (
		<div id="App" className={cssClasses}>
			<Navigation />

			<Container className='py-3'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/search' element={<SearchPage />} />
					<Route path='/random-dog' element={<RandomDogPage />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App
