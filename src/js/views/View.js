export default class View {
	data;
	render(data) {
		console.log(data);
		if (!data || data !== '') {
			this.data = data;
		}
	}
}
