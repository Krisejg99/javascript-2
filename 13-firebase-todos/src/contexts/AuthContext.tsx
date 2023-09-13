import { UserCredential, createUserWithEmailAndPassword } from 'firebase/auth'
import { createContext, useState } from 'react'
import { auth } from '../services/firebase'

type AuthContextType = {
	signUp: (email: string, password: string) => Promise<UserCredential>
	userEmail: string | null
}

export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextProps = {
	children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
	const [userEmail, setUserEmail] = useState<string | null>(null)

	const signUp = async (email: string, password: string) => {
		return await createUserWithEmailAndPassword(auth, email, password)
	}

	return (
		<AuthContext.Provider value={{
			signUp,
			userEmail,
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
