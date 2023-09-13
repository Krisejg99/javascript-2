import {
	User,
	UserCredential,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'

type AuthContextType = {
	currentUser: User | null
	userEmail: string | null
	signUp: (email: string, password: string) => Promise<UserCredential>
	logIn: (email: string, password: string) => Promise<UserCredential>
	logOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextProps = {
	children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [userEmail, setUserEmail] = useState<string | null>(null)

	const signUp = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	const logIn = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logOut = () => {
		return signOut(auth)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			console.log('auth state changed: ', user)

			setCurrentUser(user)
			setUserEmail(user?.email ?? null)
		})

		return unsubscribe
	}, [])

	return (
		<AuthContext.Provider value={{
			currentUser,
			userEmail,
			signUp,
			logIn,
			logOut,
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
