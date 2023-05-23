import { useEffect, useState } from 'react'
import Forecast from './components/Forecast'
import SearchCity from './components/SearchCity'
import { getCurrentWeather } from './services/owmapi'
import { ICurrentWeather } from './types'
import Airplane from './assets/images/747.svg'
import './assets/scss/App.scss'

const App = () => {
	const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>()

	const handleCity = async (city: string) => {
		setCurrentWeather(await getCurrentWeather(city))
	}


	return (
		<div id="app" className="container">
			<SearchCity
				onSearch={handleCity}
			/>

			{currentWeather && <Forecast
				currentWeather={currentWeather}
			/>}
		</div>
	)
}

export default App
