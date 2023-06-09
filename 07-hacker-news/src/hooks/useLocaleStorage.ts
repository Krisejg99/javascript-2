import { useEffect, useState } from "react"

const useLocaleStorage = <T>(key: string, defaultValue: T) => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		const value = localStorage.getItem(key)

		return value
			? JSON.parse(value)
			: defaultValue
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(storedValue))
	}, [key, storedValue])

  return [
	storedValue,
	setStoredValue,
  ]
}

export default useLocaleStorage
