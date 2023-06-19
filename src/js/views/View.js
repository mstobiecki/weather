export default class View {
	data;
	render(data) {
		if (!data || data !== '') {
			this.data = data;
		}
	}
}
