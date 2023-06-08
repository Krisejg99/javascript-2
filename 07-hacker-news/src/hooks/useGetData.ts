import axios from 'axios'
import { useEffect, useState } from 'react'

const useGetData = <T>(initialUrl: string | null = null) => {
	const [data, setData] = useState<T | null>(null)
	const [url, setUrl] = useState<string | null>(initialUrl)

	const getData = async (resourceUrl: string) => {
		const res = await axios.get<T>(resourceUrl)

		setData(res.data)
	}

	useEffect(() => {
		if (!url) return

		getData(url)
	}, [url])

	return {
		data,
		setUrl,
	}
}

export default useGetData
