import * as model from './model.js';
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
		predictionView.clear();
		weatherView.renderSpinner();

		const query = searchView.getQuery();

		await model.loadCityName(query);
		await model.loadWeather(model.state.search.cityTranslated);

		weatherView.render(model.state);
		predictionView.render(model.state.weather.days);

		predictionView.createHeading();
	} catch (err) {
		predictionView.clear();
		weatherView.renderError(err.message);
	}
};

const controlLocation = async function (query) {
	try {
		predictionView.clear();
		weatherView.renderSpinner();

		await model.loadCityName(query);
		await model.loadWeather(model.state.search.cityTranslated);

		if (!query) throw new Error('Nie znaleziono podanej miejscowości.');

		weatherView.render(model.state);

		predictionView.render(model.state.weather.days);
		predictionView.createHeading();
	} catch (err) {
		weatherView.renderError(err.message);
	}
};

const controlPosition = async function () {
	try {
		predictionView.clear();
		weatherView.renderSpinner();

		await model.loadPosition();

		await model.loadWeather(
			model.state.search.latitude,
			model.state.search.longitude
		);

		weatherView.render(model.state);

		predictionView.render(model.state.weather.days);
		predictionView.createHeading();
	} catch (err) {
		locationsView.renderError(
			'Wystąpił problem z pobraniem danych. Spróbuj ponownie odświeżyć stronę.'
		);
	}
};

const init = function () {
	controlDate();
	searchView.addHanlderSearch(controlWeather);
	locationsView.addHandlerLocation(controlLocation);
	locationsView.addHandlerPosition(controlPosition);
};
init();
