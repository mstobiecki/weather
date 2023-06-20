import { API_URL, API_KEY } from './config';
import { getJSON } from './helpers';

export const state = {
	weather: {
		current: {},
		days: [],
	},
	search: {
		query: 'Plock',
	},
};

export const loadWeather = async function (query) {
	try {
		state.search.query = query;
		const data = await getJSON(
			`${API_URL}?key=${API_KEY}&q=${state.search.query}&days=7&aqi=no&alerts=no
        `
		);
		console.log(data);
		if (data?.error?.code === 1006)
			throw new Error('Nie znaleziono podanej miejscowości.');

		let current = data.current;
		let forecastday = data.forecast.forecastday[0];

		state.weather.current = {
			temperature: current.temp_c,
			sunrise: forecastday.astro.sunrise,
			sunset: forecastday.astro.sunset,
			maxTemperature: forecastday.day.maxtemp_c,
			maxTemperature: forecastday.day.maxtemp_c,
			minTemperature: forecastday.day.mintemp_c,
			chanceRain: forecastday.day.daily_chance_of_rain,
		};

		state.weather.days = data.forecast.forecastday.map((day) => {
			return {
				date: day.date,
				sunrise: day.astro.sunrise,
				sunset: day.astro.sunset,
				maxTemperature: day.day.maxtemp_c,
				minTemperature: day.day.mintemp_c,
				chanceRain: day.day.daily_chance_of_rain,
				icon: day.day.condition.icon,
				altText: day.day.condition.text,
			};
		});

		console.log(state);
	} catch (err) {
		throw err;
	}
};
