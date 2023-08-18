import './assets/scss/app.scss'
import Container from 'react-bootstrap/Container'
import Navigation from './components/Navigation'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import RandomCatPage from './pages/RandomCatPage'
import GlobalFetchingSpinner from './components/GlobalFetchingSpinner'
import SearchHNPage from './pages/SearchHNPage'

const App = () => {
	return (
		<div id='App'>
			<Navigation />

			<GlobalFetchingSpinner />

			<Container className='py-3'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/random-cat' element={<RandomCatPage />} />
					<Route path='/search-hn' element={<SearchHNPage />} />

					<Route path='*' element={<NotFound />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App
