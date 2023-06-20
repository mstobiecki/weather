import View from './View';
import moment from 'moment';

class WeatherView extends View {
	parentElement = document.querySelector('.app__container');
	data;

	render(data) {
		this.data = data;

		const markup = this.generateMarkup();
		this.parentElement.innerHTML = '';
		this.parentElement.insertAdjacentHTML('afterbegin', markup);
	}
	generateMarkup() {
		console.log(this.data);
		return `
		<div class="app__box">
		<span class="app__icon"><i class="fa-solid fa-temperature-half"></i></span>
		<div class="app__text">
			<p class="app__temperature">Aktualna temperatura</p>
			<span class="app__temperature-value">${this.data.temperature}°C</span>
		</div>
	</div>
	<div class="app__box">
		<span class="app__icon"><i class="fa-solid fa-umbrella"></i></span>
		<div class="app__text">
			<p class="app__rain">Szansa na opady</p>
			<span class="app__rain--value">${this.data.chanceRain}%</span>
		</div>
	</div>
	<div class="app__box">
		<span class="app__icon"><i class="fa-regular fa-sun"></i></span>
		<div class="app__text">
			<p class="app__sunrise">Wschód słońca</p>
			<span class="app__sunrise--value">${moment(this.data.sunrise, 'hh:mm A').format(
				'HH:mm'
			)}</span>
		</div>
	</div>
	<div class="app__box">
		<span class="app__icon"><i class="fa-regular fa-moon"></i></span>
		<div class="app__text">
			<p class="app__sunset">Zachód słońca</p>
			<span class="app__sunset--value">${moment(this.data.sunset, 'hh:mm A').format(
				'HH:mm'
			)}</span>
		</div>
	</div>
	<div class="app__box">
		<span class="app__icon"><i class="fa-solid fa-temperature-arrow-down"></i></span>
		<div class="app__text">
			<p class="app__min-temperature">Minimalna temperatura</p>
			<span class="app__min-temperature--value">${this.data.minTemperature}°C</span>
		</div>
	</div>
	<div class="app__box">
		<span class="app__icon"><i class="fa-solid fa-temperature-arrow-up"></i></span>
		<div class="app__text">
			<p class="app__max-temperature">Maksymalna temperatura</p>
			<span class="app__max-temperature--value">${this.data.maxTemperature}°C</span>
		</div>
	</div>
		`;
	}
}

export default new WeatherView();
