import axios from 'axios'
import { CatImageSearchResponse } from '../types/index.types'

const FAKE_DELAY = 1000 * 0

const instance = axios.create({
	baseURL: 'https://api.thecatapi.com',
	// timeout: 1000 * 10,
})

const get = async <T>(endpoint: string) => {
	const res = await instance.get<T>(endpoint)

	// Fake delay
	!!FAKE_DELAY && await new Promise(r => setTimeout(r, FAKE_DELAY))

	return res.data
}

export const getRandomCatImage = async (breed_id?: string) => {
	const data = await get<CatImageSearchResponse>(`/v1/images/search${breed_id ? `?breed_id=${breed_id}` : ''}`)
	return data[0]
}
