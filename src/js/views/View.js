export default class View {
	parentElement = document.querySelector('.app__container');
	renderSpinner() {
		const html = `
		<div class="app__loading">
			<span class="app__spinner"><i class="fa-solid fa-spinner"></i></span>
		</div>
		`;
		this.parentElement.insertAdjacentHTML('afterbegin', html);
	}
}
