const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/failure", (req, res) => {
	res.redirect("/");
});

app.post("/", (req, res) => {
	const firstName = req.body.fName;
	const lastName = req.body.lName;
	const email = req.body.email;

	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName,
				},
			},
		],
	};
	const jsonData = JSON.stringify(data);

	const url = `https://us6.api.mailchimp.com/3.0/lists/${process.env.ID}`;

	const options = {
		method: "POST",
		auth: `brandon1:${process.env.API}`,
	};

	const request = https.request(url, options, (response) => {
		if (response.statusCode == 200) {
			res.sendFile(`${__dirname}/success.html`);
		} else {
			res.sendFile(`${__dirname}/failure.html`);
		}
		response.on("data", (data) => {
			console.log(JSON.parse(data));
		});
	});
	request.write(jsonData);
	request.end();
});

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/signup.html`);
});

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
