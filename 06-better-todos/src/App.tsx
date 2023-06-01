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


const App = () => {
	return (
		<div className="App">
			<Navigation />

			<Container className='py-3'>
				<Routes	>
					<Route path="/" element={<HomePage />} />
					<Route path="/todos" element={<TodosPage />} />
					<Route path="/todos/:id" element={<TodoPage />} />
					<Route path="/todos/:id/edit" element={<EditTodoPage />} />
					<Route path="/todos/create" element={<CreateTodoPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App
