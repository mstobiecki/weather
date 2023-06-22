import { API_URL, API_KEY, DAYS } from './config';
import { getJSON } from './helpers';

export const state = {
	weather: {
		current: {},
		days: [],
	},
	search: {
		query: '',
		latitude: {},
		longitude: {},
	},
	date: '',
};

export const loadDate = function () {
	state.date = new Intl.DateTimeFormat(navigator.language, {
		dateStyle: 'full',
	}).format(new Date());
};

export const loadWeather = async function (query, query2) {
	try {
		let data;

		if (query && query2) {
			data = await getJSON(
				`${API_URL}?key=${API_KEY}&q=${state.search.latitude} ${state.search.longitude}&days=${DAYS}
				`
			);
		} else {
			state.search.query = query;
			data = await getJSON(
				`${API_URL}?key=${API_KEY}&q=${state.search.query}&days=${DAYS}
				`
			);
		}

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
				maxTemperature: day.day.maxtemp_c,
				minTemperature: day.day.mintemp_c,
				icon: day.day.condition.icon,
				altText: day.day.condition.text,
			};
		});

		console.log(state);
	} catch (err) {
		throw err;
	}
};

export const loadPosition = async function () {
	try {
		const getLocation = new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});
		const position = await getLocation;

		state.search.latitude = position.coords.latitude;
		state.search.longitude = position.coords.longitude;
	} catch (err) {
		throw err;
	}
};
