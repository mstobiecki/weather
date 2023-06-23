import View from './View';
class SearchView extends View {
	parentElement = document.querySelector('.header__form');

	getQuery() {
		const query = this.parentElement.querySelector('.header__input').value;
		this.clearInput();

		const firstLetterCapitalized =
			query.split('').at(0).toUpperCase() + query.slice(1);

		return firstLetterCapitalized;
	}
	clearInput() {
		return (this.parentElement.querySelector('.header__input').value = '');
	}
	addHanlderSearch(handler) {
		this.parentElement.addEventListener('submit', function (e) {
			e.preventDefault();
			handler();
		});
	}
}

export default new SearchView();
