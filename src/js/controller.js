import * as model from './model.js';
import View from './views/View.js';
import weatherView from './views/weatherView.js';
import searchView from './views/searchView.js';
import predictionView from './views/predictionView.js';

const controlWeather = async function () {
	try {
		weatherView.renderSpinner();

		const query = searchView.getQuery();
		await model.loadWeather(query);

		weatherView.render(model.state.weather.current);
		predictionView.render(model.state.weather.days);
	} catch (err) {
		weatherView.renderError(err.message);
	}
};

const init = function () {
	searchView.addHanlderSearch(controlWeather);
};
init();
