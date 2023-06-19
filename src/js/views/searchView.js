import View from './View';
class SearchView extends View {
	parentElement = document.querySelector('.header__form');

	getQuery() {
		const query = this.parentElement.querySelector('.header__input').value;
		console.log(query);
		return query;
	}
	addHanlderSearch(handler) {
		this.parentElement.addEventListener('submit', function (e) {
			e.preventDefault();
			handler();
		});
	}
}

export default new SearchView();
