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
import LogInPage from './pages/LogInPage'
import LogOutPage from './pages/LogOutPage'
import RequireAuth from './components/RequireAuth'
import UpdateProfilePage from './pages/UpdateProfilePage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'

const App = () => {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				{/* Protected routes */}
				<Route path="/" element={
					<RequireAuth>
						<HomePage />
					</RequireAuth>
				} />

				<Route path="/update-profile" element={
					<RequireAuth>
						<UpdateProfilePage />
					</RequireAuth>
				} />

				<Route path="/todos">
					<Route path="" element={
						<RequireAuth>
							<TodosPage />
						</RequireAuth>
					} />

					<Route path=":id" element={
						<RequireAuth>
							<TodoPage />
						</RequireAuth>
					} />

					<Route path=":id/edit" element={
						<RequireAuth>
							<EditTodoPage />
						</RequireAuth>
					} />
				</Route>

				{/* Guest routes */}
				<Route path="/login" element={<LogInPage />} />
				<Route path="/logout" element={<LogOutPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />

				<Route path="*" element={<NotFound />} />
			</Routes>

			<ToastContainer
				theme='colored'
			/>
		</div>
	)
}

export default App
