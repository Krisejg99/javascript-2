import axios from 'axios'
import { useEffect, useState } from 'react'

const useGetData = <T>(initialUrl: string | null = null) => {
	const [data, setData] = useState<T | null>(null)
	const [url, setUrl] = useState<string | null>(initialUrl)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const setSameUrl = (resourceUrl: string) => getData(resourceUrl)

	const getData = async (resourceUrl: string) => {
		setData(null)
		setError(null)
		setLoading(true)

		try {
			const res = await axios.get<T>(resourceUrl)
			setData(res.data)
		}
		catch (err: any) {
			setError(err.message)
		}

		setLoading(false)
	}

	useEffect(() => {
		if (!url) return

		getData(url)
	}, [url])

	return {
		data,
		url,
		setUrl,
		setSameUrl,
		loading,
		error,
	}
}

export default useGetData
