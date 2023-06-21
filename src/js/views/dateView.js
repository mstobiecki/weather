import View from './View';
class DateView extends View {
	parentElement = document.querySelector('.header__paragraph');

	generateMarkup() {
		return `
        <p class="header__paragraph">${this.data}</p>
        `;
	}
}
export default new DateView();
