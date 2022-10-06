const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;

app.post("/", (req, res) => {
	let result = parseInt(req.body.num1) + parseInt(req.body.num2);
	res.send(`The result of the calculation is ${result}`);
});

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

app.listen(PORT, () => {
	console.log(`server listening on: http://localhost:${PORT}`);
});
