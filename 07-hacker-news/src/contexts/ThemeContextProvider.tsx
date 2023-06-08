import { createContext, useState } from 'react'

type ThemeContextType = {
	isDarkMode: boolean
}

export const ThemeContext = createContext<ThemeContextType>({ isDarkMode: false })

interface IProps {
	children: React.ReactNode
}

const ThemeProvider: React.FC<IProps> = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode)
	}

	return (
		<ThemeContext.Provider value={{ isDarkMode }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
