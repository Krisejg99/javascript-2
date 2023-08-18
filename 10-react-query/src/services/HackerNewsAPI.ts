import axios from 'axios'
import { HN_SearchResponse } from '../types'

const FAKE_DELAY = 1000 * 0

const instance = axios.create({
	baseURL: "https://hn.algolia.com",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json"
	}
})

const get = async <T>(endpoint: string) => {
	const res = await instance.get(endpoint)

	!!FAKE_DELAY && await new Promise((r) => setTimeout(r, FAKE_DELAY))

	return res.data as T
}

export const search = (query: string, page = 0) => {
	return get<HN_SearchResponse>(`/api/v1/search?query=${query}&tags=story&page=${page}`)
}

export const searchByDate = (query: string, page = 0) => {
	return get<HN_SearchResponse>(`/api/v1/search_by_date?query=${query}&tags=story&page=${page}`)
}
