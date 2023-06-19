import * as model from './model.js';
import weatherView from './views/weatherView.js';

const controlWeather = async function () {
	await model.loadWeather();

	weatherView.render(model.state.weather);
};
controlWeather();
