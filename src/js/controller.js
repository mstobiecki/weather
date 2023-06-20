import * as model from './model.js';
import weatherView from './views/weatherView.js';
import searchView from './views/searchView.js';

const controlWeather = async function () {
	const query = searchView.getQuery();
	await model.loadWeather(query);

	weatherView.render(model.state.weather);
};

const init = function () {
	searchView.addHanlderSearch(controlWeather);
};
init();
