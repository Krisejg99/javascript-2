import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

type IProps = {
	children: React.ReactNode
	redirectTo?: string
}

const RequireAuth: React.FC<IProps> = ({ children, redirectTo = 'login' }) => {
	const { currentUser } = useAuth()

	return currentUser
		? <>{children}</>
		: <Navigate to={redirectTo} />
}

export default RequireAuth
