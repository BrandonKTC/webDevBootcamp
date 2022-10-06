const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;

app.post("/bmicalculator", (req, res) => {
	let weight = parseFloat(req.body.weight);
	let height = parseFloat(req.body.height);
	let result = weight / ((height * height) / 100);
	res.send(`Your bmi score is ${(result * 100).toFixed(2)}`);
});

app.get("/bmicalculator", (req, res) => {
	res.sendFile(`${__dirname}/bmiCalculator.html`);
});

app.post("/", (req, res) => {
	let num1 = Number(req.body.num1);
	let num2 = Number(req.body.num2);
	let result = num1 + num2;
	res.send(`The result of the calculation is ${result}`);
});

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

app.listen(PORT, () => {
	console.log(`server listening on: http://localhost:${PORT}`);
});
