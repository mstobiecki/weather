export default class View {
	parentElement = document.querySelector('.app__container');
	renderSpinner() {
		this.clear();

		const html = `
		<div class="app__loading">
			<span class="app__spinner"><i class="fa-solid fa-spinner"></i></span>
		</div>
		`;
		this.parentElement.insertAdjacentHTML('afterbegin', html);
	}
	renderError(message = 'Błąd przetwarzania zapytania.') {
		this.clear();

		const html = `
		<div class="app__error">
			<span class="app__message">${message}</span>
		</div>
		`;
		this.parentElement.insertAdjacentHTML('afterbegin', html);
	}
	clear() {
		this.parentElement.innerHTML = '';
	}
}
