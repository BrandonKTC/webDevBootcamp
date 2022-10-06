const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

const PORT = 3000;

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
	const query = req.body.cityName;
	const appId = "cacdd43ad779e6bd48011907a8c327fd";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appId}&units=metric`;

	https.get(url, (response) => {
		response.on("data", (data) => {
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const description = weatherData["weather"][0]["description"];
			const icon = weatherData["weather"][0]["icon"];
			const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

			res.write(
				`<h1>The Temperature in ${query} is ${temp} degrees Celsius</h1>`
			);
			res.write(`<p>The weather is currently ${description}</p>`);
			res.write(`<img src="${imageUrl}" alt="icon weather image"/>`);
			res.send();
		});
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
