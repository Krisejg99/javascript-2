import {
	User,
	UserCredential,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'
import { SyncLoader } from 'react-spinners'

type AuthContextType = {
	currentUser: User | null
	userEmail: string | null
	signUp: (email: string, password: string) => Promise<UserCredential>
	logIn: (email: string, password: string) => Promise<UserCredential>
	logOut: () => Promise<void>
	// reloadUser:
	resetPassword: (email: string) => Promise<void>
	// setEmail:
	// setPassword:
	// setDisplayName:
	// setPhotoUrl:
}

export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextProps = {
	children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [userEmail, setUserEmail] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)

	const signUp = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	const logIn = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logOut = () => {
		return signOut(auth)
	}

	// const reloadUser = () => {
	// }

	const resetPassword = (email: string) => {
		return sendPasswordResetEmail(auth, email)
	}

	// const setEmail = (email: string) => {
	// }

	// const setPassword = (password: string) => {
	// }

	// const setDisplayName = (name: string) => {
	// }

	// const setPhotoUrl = (url: string) => {
	// }

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			setUserEmail(user?.email ?? null)

			setLoading(false)
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
			// reloadUser,
			resetPassword,
			// setEmail,
			// setPassword,
			// setDisplayName,
			// setPhotoUrl,
		}}>
			{loading
				? <div id='initial-loader'>
					<SyncLoader color='#888' size={15} speedMultiplier={1.1} />
				</div>

				: <>{children}</>
			}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
