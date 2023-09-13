import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

type IProps = {
	children: React.ReactNode
}

const RequireAuth: React.FC<IProps> = ({ children }) => {
	const { currentUser } = useAuth()

	return currentUser
		? <>{children}</>
		: <Navigate to='/login' />
}

export default RequireAuth
