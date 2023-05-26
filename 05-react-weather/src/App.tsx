import { useEffect, useState } from 'react'
import Forecast from './components/Forecast'
import SearchCity from './components/SearchCity'
import { getCurrentWeather } from './services/owmapi'
import { ICurrentWeather } from './types'
import Airplane from './assets/images/747.svg'
import './assets/scss/App.scss'
import Loading from './components/Loading'
import Error from './components/Error'

const App = () => {
	const [currentWeather, setCurrentWeather] = useState<ICurrentWeather | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | false>(false)

	const handleSearch = async (city: string) => {
		setCurrentWeather(null)
		setError(false)
		setLoading(true)

		try {
			const weather = await getCurrentWeather(city)

			setCurrentWeather(weather)
		}
		catch (err: any) {
			setError(err.message)
		}

		setLoading(false)
	}

	return (
		<div id="app" className="container">
			<SearchCity onSearch={handleSearch} />

			{loading && <Loading img={Airplane} />}

			{error && <Error errorMsg={error} />}

			{currentWeather && <Forecast currentWeather={currentWeather} />}
		</div>
	)
}

export default App
