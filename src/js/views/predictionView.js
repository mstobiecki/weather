import View from './View';
import moment from 'moment';
import 'moment/locale/pl';

class PredictionView extends View {
	parentElement = document.querySelector('.prediction__container');

	generateMarkup() {
		return this.data
			.map((day) => {
				return `
            <div class="prediction__box">
            <p class="prediction__day">${moment(day.date)
							.locale('pl')
							.format('dddd')}</p>
			<div class="prediction__text">
            <span class="prediction__temperature">${day.maxTemperature}°C</span>
            <img class="prediction__icon" src="http:${day.icon}" alt="${
					day.altText
				}">
			</div>
			</div>
            `;
			})
			.join('');
	}
}

export default new PredictionView();
