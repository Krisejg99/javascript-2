import { useState } from "react"

const useLocaleStorage = <T>(key: string, defaultValue: T) => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		const value = localStorage.getItem(key)

		return value
			? JSON.parse(value) as T || defaultValue
			: defaultValue
	})

	const setValue = (value: T) => {
		setStoredValue(value)

		localStorage.setItem(key, JSON.stringify(value))
	}

	return [
		storedValue,
		setValue,
	] as const
}

export default useLocaleStorage
