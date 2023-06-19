import { View } from './View';
class SearchView extends View {
	parentElement = document.querySelector('.header');

	getQuery() {
		const query = this.parentElement.querySelector('.header__input').value;
		return query;
	}
}

export default new SearchView();
