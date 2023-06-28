import {
	API_URL_WEATHER,
	API_URL_TRANSLATE_CITY,
	API_URL_REVERSE_GEOCODE,
	API_KEY_WEATHER,
	API_KEY_TRANSLATE_CITY,
	DAYS_WEATHER,
} from './config';
import { getJSON } from './helpers';

export const state = {
	weather: {
		current: {},
		days: [],
	},
	search: {
		query: '',
		cityTranslated: '',
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

export const loadCityName = async function (query) {
	state.search.query = query;

	if (query === 'Warszawa') query = 'warsaw';

	const translateCity = await getJSON(`${API_URL_TRANSLATE_CITY}${query}`, {
		headers: { 'X-Api-Key': API_KEY_TRANSLATE_CITY },
	});

	state.search.cityTranslated = translateCity.at(0).name;
};

export const loadWeather = async function (query, query2) {
	try {
		let data;

		if (query && query2) {
			data = await getJSON(
				`${API_URL_WEATHER}?key=${API_KEY_WEATHER}&q=${state.search.latitude} ${state.search.longitude}&days=${DAYS_WEATHER}
				`
			);
		} else {
			data = await getJSON(
				`${API_URL_WEATHER}?key=${API_KEY_WEATHER}&q=${state.search.cityTranslated}&days=${DAYS_WEATHER}
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

		const geocode = await getJSON(
			`${API_URL_REVERSE_GEOCODE}${state.search.latitude},${state.search.longitude}?geoit=json`
		);

		const { city } = geocode;

		if (city === 'Throttled! See geocode.xyz/pricing')
			state.search.query = 'Pojawił się problem z API, odśwież stronę.';
		else state.search.query = geocode.city;
	} catch (err) {
		throw err;
	}
};
