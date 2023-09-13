import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { createContext, useState } from 'react'
import { auth } from '../services/firebase'

type AuthContextType = {
	userEmail: string | null
	signUp: (email: string, password: string) => Promise<UserCredential>
	logIn: (email: string, password: string) => Promise<UserCredential>
	// logOut:
}

export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextProps = {
	children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
	const [userEmail, setUserEmail] = useState<string | null>(null)

	const signUp = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	const logIn = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	// const logOut = (email: string, password: string) => {
	// 	return createUserWithEmailAndPassword(auth, email, password)
	// }

	return (
		<AuthContext.Provider value={{
			userEmail,
			signUp,
			logIn,
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
