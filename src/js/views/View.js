export default class View {
	data;

	render(data) {
		if (!data) return this.renderError();

		this.data = data;
		console.log(this.data);

		const markup = this.generateMarkup();

		this.clear();

		this.parentElement.previousElementSibling?.classList.remove('hidden');
		this.parentElement.insertAdjacentHTML('afterbegin', markup);
	}
	renderSpinner() {
		const html = `
		<div class="app__loading">
		<span class="app__spinner"><i class="fa-solid fa-spinner"></i></span>
		</div>
		`;

		this.clear();
		this.parentElement.insertAdjacentHTML('afterbegin', html);
	}
	renderError(message = 'Błąd przetwarzania zapytania.') {
		const html = `
		<div class="app__error">
		<span class="app__message">${message}</span>
		</div>
		`;

		this.clear();
		this.parentElement.insertAdjacentHTML('afterbegin', html);
	}
	clear() {
		this.parentElement.innerHTML = '';
	}
}
