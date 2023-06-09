import { createContext, useState } from 'react'

type ThemeContextType = {
	isDarkMode: boolean
	toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
	isDarkMode: false,
	toggleTheme: () => {
		throw new Error('Trying to use `toggleTheme` outside of context')
	}
})

interface IProps {
	children: React.ReactNode
}

const ThemeProvider: React.FC<IProps> = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		const hn_darkmode = localStorage.getItem('hn_darkmode' ?? '')

		return hn_darkmode === 'true'
	})

	const toggleTheme = () => {
		localStorage.setItem('hn_darkmode', String(!isDarkMode))
		setIsDarkMode(!isDarkMode)
	}

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
