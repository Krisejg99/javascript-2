import Container from 'react-bootstrap/Container'
import { Route, Routes } from 'react-router-dom'
import './assets/scss/App.scss'
import HomePage from './pages/HomePage'
import TodosPage from './pages/TodosPage'
import TodoPage from './pages/TodoPage'
import Navigation from './components/Navigation'
import NotFound from './pages/NotFound'
import CreateTodoPage from './pages/CreateTodoPage'
import EditTodoPage from './pages/EditTodoPage'
import GlobalFetchingSpinner from './components/GlobalFetchingSpinner'
import { ToastContainer } from 'react-toastify'


const App = () => {
	return (
		<div className="App">
			<Navigation />

			<GlobalFetchingSpinner />

			<Container className='py-3'>
				<Routes	>
					<Route path="/" element={<HomePage />} />

					<Route path='/todos'>
						<Route path="" element={<TodosPage />} />
						<Route path=":id" element={<TodoPage />} />
						<Route path=":id/edit" element={<EditTodoPage />} />
						<Route path="create" element={<CreateTodoPage />} />
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>

			<ToastContainer />
		</div>
	)
}

export default App
