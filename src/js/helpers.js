export const getJSON = async function (url) {
	try {
		const res = await fetch(url);

		if (!res.ok) throw new Error('Nie znaleziono podanej miejscowości.');

		const data = await res.json();
		return data;
	} catch (err) {
		throw err;
	}
};
