import { useEffect, useState } from 'react'
import Forecast from './components/Forecast'
import SearchCity from './components/SearchCity'
import { getCurrentWeather } from './services/owmapi'
import { ICurrentWeather } from './types'
import Airplane from './assets/images/747.svg'
import './assets/scss/App.scss'

const App = () => {
	const [currentWeather, setCurrentWeather] = useState<ICurrentWeather | null>(null)
	const [loading, setLoading] = useState(false)

	const handleSearch = async (city: string) => {
		setCurrentWeather(null)
		setLoading(true)

		const weather = await getCurrentWeather(city)

		setCurrentWeather(weather)
		setLoading(false)
	}

	return (
		<div id="app" className="container">
			<SearchCity onSearch={handleSearch} />

			{loading && <img src={Airplane} alt="Airplane animation" className='img-fluid py-5 w-100' />}

			{currentWeather &&
				<Forecast currentWeather={currentWeather} />}
		</div>
	)
}

export default App
