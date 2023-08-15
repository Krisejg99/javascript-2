import Container from 'react-bootstrap/Container'
import './assets/scss/app.scss'
import Navigation from './components/Navigation'

const App = () => {
	return (
		<div id='App'>
			<Navigation />

			<Container className='py-3'>
				<h1>Welcome my friends!</h1>
			</Container>
		</div>
	)
}

export default App
