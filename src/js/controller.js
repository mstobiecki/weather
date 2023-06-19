const api = async function () {
	try {
		const res = await fetch(
			'http://api.weatherapi.com/v1/forecast.json?key= b34451eb067b4688a1e94627231906&q=Plock&days=2&aqi=no&alerts=no'
		);
		const data = await res.json();
		console.log(data);
	} catch {}
};
api();
