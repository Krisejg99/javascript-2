import {
	User,
	UserCredential,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updateEmail,
	updatePassword,
	updateProfile
} from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'
import { SyncLoader } from 'react-spinners'

type AuthContextType = {
	currentUser: User | null
	userDisplayName: string | null
	userPhotoURL: string | null
	userEmail: string | null
	signUp: (email: string, password: string) => Promise<UserCredential>
	logIn: (email: string, password: string) => Promise<UserCredential>
	logOut: () => Promise<void>
	reloadUser: () => Promise<void>
	resetPassword: (email: string) => Promise<void>
	setEmail: (email: string) => Promise<void>
	setPassword: (password: string) => Promise<void>
	setDisplayName: (name: string) => Promise<void>
	setPhotoURL: (url: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextProps = {
	children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
	const [loading, setLoading] = useState(true)
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [userEmail, setUserEmail] = useState<string | null>(null)
	const [userDisplayName, setUserDisplayName] = useState<string | null>(null)
	const [userPhotoURL, setUserPhotoURL] = useState<string | null>(null)

	const signUp = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	const logIn = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logOut = () => {
		return signOut(auth)
	}

	const reloadUser = () => {
		if (!currentUser) throw new Error('Uhm... No current user...')
		return currentUser.reload()
	}

	const resetPassword = (email: string) => {
		return sendPasswordResetEmail(auth, email, {
			url: window.location.origin + '/login'
		})
	}

	const setEmail = (email: string) => {
		if (!currentUser) throw new Error('Uhm... No current user...')
		return updateEmail(currentUser, email)
	}

	const setPassword = (password: string) => {
		if (!currentUser) throw new Error('Uhm... No current user...')
		return updatePassword(currentUser, password)
	}

	const setDisplayName = (name: string) => {
		if (!currentUser) throw new Error('Uhm... No current user...')
		return updateProfile(currentUser, { displayName: name })
	}

	const setPhotoURL = (url: string) => {
		if (!currentUser) throw new Error('Uhm... No current user...')
		return updateProfile(currentUser, { photoURL: url })
	}

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
			signUp,
			logIn,
			logOut,
			reloadUser,
			setPassword,
			resetPassword,
			userEmail,
			setEmail,
			userDisplayName,
			setDisplayName,
			userPhotoURL,
			setPhotoURL,
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
