import React from 'react'
import forecastBanner from '../assets/images/forecast-banner.png'
import dayBanner from '../assets/images/day.svg'
import nightBanner from '../assets/images/night.svg'

import { ICurrentWeather } from '../types'

interface IProps {
	currentWeather: ICurrentWeather
}

const Forecast: React.FC<IProps> = ({ currentWeather }) => {
	const banner = currentWeather.dt > currentWeather.sys.sunrise && currentWeather.dt < currentWeather.sys.sunset
		? dayBanner
		: nightBanner

	return (
		<div id="forecast">
			<div className="card">

				<img src={banner} className="card-img-top" alt="Daytime, nighttime, daytime, nighttime" />

				<div className="card-body">
					<h5 className="card-title" id="location">
						<span id="city">{currentWeather.name}</span>,
						<span id="country">{currentWeather.sys.country}</span>
					</h5>
					<p className="temp">
						<span id="temperature">{currentWeather.main.temp}</span>
						&deg;C
					</p>
					<p className="humidity">
						<span id="humidity">{currentWeather.main.humidity}</span> % humidity
					</p>
					<p className="wind">
						<span id="windspeed">{currentWeather.wind.speed}</span> m/s
					</p>

					<ul className="conditions">
						{currentWeather.weather.map(condition => {
							return (
								<li key={condition.id}>
									<img
										src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`}
										title={condition.main}
										alt={condition.main}
									/>
									{condition.description}
								</li>
							)
						})}
					</ul>

					<p className="text-muted small">
						<span>
							{new Date(currentWeather.dt * 1000).toLocaleString()}
						</span>
					</p>
				</div>

			</div>
		</div>
	)
}

export default Forecast
