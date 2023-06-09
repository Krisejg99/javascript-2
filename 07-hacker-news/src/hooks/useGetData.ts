import axios from 'axios'
import { useEffect, useState } from 'react'

const useGetData = <T>(initialUrl: string | null = null) => {
	const [data, setData] = useState<T | null>(null)
	const [url, setUrl] = useState<string | null>(initialUrl)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isError, setIsError] = useState(false)

	const changeUrl = (_url: string) => {
		try {
			const url = new URL(_url)
			setUrl(url.toString())
		}
		catch (err: any) {
			setError("That's not a valid URL")
			setIsError(true)
		}
	}

	const getData = async (resourceUrl: string) => {
		setData(null)
		setError(null)
		setIsError(false)
		setIsLoading(true)

		try {
			const res = await axios.get<T>(resourceUrl)
			setData(res.data)
		}
		catch (err: any) {
			setError(err.message)
			setIsError(true)
		}

		setIsLoading(false)
	}

	const execute = () => {
		if (!url) return

		getData(url)
	}

	useEffect(() => {
		if (!url) return

		getData(url)
	}, [url])

	return {
		data,
		changeUrl,
		execute,
		isLoading,
		error,
		isError,
	}
}

export default useGetData
