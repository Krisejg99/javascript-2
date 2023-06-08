import axios from 'axios'
import { useEffect, useState } from 'react'
import { DogAPI_RandomImageResponse } from '../types'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

const RandomDogPage = () => {
	const [data, setData] = useState<DogAPI_RandomImageResponse | null>(null)
	const [url, setUrl] = useState<string | null>(null)

	const getData = async (resourceUrl: string) => {
		const res = await axios.get<DogAPI_RandomImageResponse>(resourceUrl)

		setData(res.data)
	}

	useEffect(() => {
		if (!url) return

		getData(url)
	}, [url])

	return (
		<>
			<h1>Random Dog Image</h1>

			<Button variant='primary' onClick={() => setUrl('https://dog.ceo/api/breeds/image/random')}>Random dog</Button>
			<Button variant='primary' onClick={() => setUrl('https://dog.ceo/api/breed/boxer/images/random')}>Random boxer dog</Button>


			{!data && url && <p>Loading...</p>}

			{data && data.status && (
				<Image
					src={data.message}
					fluid
				/>
			)}
		</>
	)
}

export default RandomDogPage
