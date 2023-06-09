import useGetData from './useGetData'
import { ChuckNorrisAPI_RandomJokeResponse } from '../types'

const useChuckNorrisJoke = () => {
	return useGetData<ChuckNorrisAPI_RandomJokeResponse>('https://api.chucknorris.io/jokes/random')
}

export default useChuckNorrisJoke
