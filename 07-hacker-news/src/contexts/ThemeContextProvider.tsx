import { createContext, useContext, useState } from 'react'

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
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode)
	}

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
