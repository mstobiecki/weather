import * as model from './model.js';
import View from './views/View.js';
import dateView from './views/dateView.js';
import weatherView from './views/weatherView.js';
import searchView from './views/searchView.js';
import predictionView from './views/predictionView.js';
import locationsView from './views/locationsView.js';

const controlDate = function () {
	model.loadDate();
	dateView.render(model.state.date);
};

const controlWeather = async function () {
	try {
		weatherView.renderSpinner();

		const query = searchView.getQuery();
		await model.loadWeather(query);

		weatherView.render(model.state.weather.current);
		predictionView.render(model.state.weather.days);
		predictionView.createHeading();
	} catch (err) {
		weatherView.renderError(err.message);
		predictionView.clear();
	}
};

const controlLocation = async function (query) {
	try {
		await model.loadWeather(query);

		if (!query) throw new Error('Nie znaleziono podanej miejscowości.');

		weatherView.render(model.state.weather.current);
		predictionView.render(model.state.weather.days);
		predictionView.createHeading();
	} catch (err) {
		predictionView.renderError(err.message);
	}
};

const controlPosition = async function () {
	weatherView.renderSpinner();
	await model.loadPosition();

	await model.loadWeather(
		model.state.search.latitude,
		model.state.search.longitude
	);

	weatherView.render(model.state.weather.current);
	predictionView.render(model.state.weather.days);
	predictionView.createHeading();
};

const init = function () {
	controlDate();
	searchView.addHanlderSearch(controlWeather);
	locationsView.addHandlerLocation(controlLocation);
	locationsView.addHandlerPosition(controlPosition);
};
init();
