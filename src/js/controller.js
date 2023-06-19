import * as model from './model.js';
import weatherView from './views/weatherView.js';
import searchView from './views/searchView.js';

const controlWeather = async function () {
	const query = searchView.getQuery();
	console.log(query);
	await model.loadWeather(query);

	weatherView.render(model.state.weather);
};
// controlWeather();

const init = function () {
	searchView.addHanlderSearch(controlWeather);
};
init();
