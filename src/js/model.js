import { API_URL, API_KEY } from './config';
import { getJSON } from './helpers';

export const state = {
	weather: {},
	search: {
		query: 'Plock',
	},
};

export const loadWeather = async function (query) {
	state.search.query = query;
	console.log(state);
	const data = await getJSON(
		`${API_URL}?key=${API_KEY}&q=${state.search.query}&days=1&aqi=no&alerts=no
        `
	);
	console.log(data);

	let current = data.current;
	let forecastday = data.forecast.forecastday[0];

	state.weather = {
		temperature: current.temp_c,
		sunrise: forecastday.astro.sunrise,
		sunset: forecastday.astro.sunset,
		maxTemperature: forecastday.day.maxtemp_c,
		maxTemperature: forecastday.day.maxtemp_c,
		minTemperature: forecastday.day.mintemp_c,
		chanceRain: forecastday.day.daily_chance_of_rain,
	};
	console.log(state);
};
