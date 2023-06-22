import View from './View';

class LocationsView extends View {
	parentElement = document.querySelector('.header__popular');

	addHandlerLocation(handler) {
		this.parentElement.addEventListener('click', function (e) {
			const query = e.target.dataset.name;
			if (!query) return;

			handler(query);
		});
	}
	addHandlerPosition(handler) {
		this.parentElement.nextElementSibling.addEventListener(
			'click',
			function () {
				handler();
			}
		);
	}
}
export default new LocationsView();
