import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navigation from './pages/partials/Navigation'
import EditTodoPage from './pages/EditTodoPage'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import TodoPage from './pages/TodoPage'
import TodosPage from './pages/TodosPage'
import './assets/scss/App.scss'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import LogOutPage from './pages/LogOutPage'

const App = () => {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<HomePage />} />

				<Route path="/todos">
					<Route path="" element={<TodosPage />} />
					<Route path=":id" element={<TodoPage />} />
					<Route path=":id/edit" element={<EditTodoPage />} />
				</Route>

				<Route path="/login" element={<LoginPage />} />
				<Route path="/logout" element={<LogOutPage />} />
				<Route path="/signup" element={<SignUpPage />} />

				<Route path="*" element={<NotFound />} />
			</Routes>

			<ToastContainer
				theme='colored'
			/>
		</div>
	)
}

export default App
