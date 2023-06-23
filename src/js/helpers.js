import { TIMEOUT_SEC } from './config';

const timeout = function (seconds) {
	return new Promise((_, reject) => {
		setTimeout(() => {
			reject(
				new Error(
					'Wystąpił problem z pobraniem danych. Spróbuj odświeżyć ponownie stronę.'
				)
			);
		}, seconds * 1000);
	});
};

export const getJSON = async function (url, headers) {
	try {
		const res = await Promise.race([fetch(url, headers), timeout(TIMEOUT_SEC)]);

		if (!res.ok) throw new Error('Nie znaleziono podanej miejscowości.');

		const data = await res.json();
		return data;
	} catch (err) {
		throw err;
	}
};
