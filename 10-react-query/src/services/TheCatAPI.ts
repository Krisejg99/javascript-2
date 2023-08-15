import axios from 'axios'
import { RandomCatRes } from '../types'

const instance = axios.create({
	baseURL: 'https://api.thecatapi.com',
	timeout: 1000 * 10,
})

export const getRandomCat = async () => {
	const res = await instance.get('/v1/images/search')
	await new Promise(resolve => setTimeout(resolve, 1000 * 2))
	return res.data as RandomCatRes[]
}
