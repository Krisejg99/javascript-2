import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navigation from './pages/partials/Navigation'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
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

				{/* Guest routes */}
				<Route path="/login" element={<LogInPage />} />
				<Route path="/logout" element={<LogOutPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />

				<Route path="*" element={<NotFound />} />
			</Routes>

			<ToastContainer
				theme='colored'
				position='bottom-right'
			/>
		</div>
	)
}

export default App
