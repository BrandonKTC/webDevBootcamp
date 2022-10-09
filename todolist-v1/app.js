const express = require("express");
const bodyParser = require("body-parser");
const date = require(`${__dirname}/date.js`);
require("dotenv").config();

const app = express();

const items = ["Read Limitless", "Becoming Limitless"];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/", (req, res) => {
	if (req.body.list === "Work") {
		workItems.push(req.body.newItem);
		res.redirect("/work");
	} else {
		items.push(req.body.newItem);
		res.redirect("/");
	}
});

app.get("/", (req, res) => {
	const day = date.getDay();
	res.render("list", { listTitle: day, items: items });
});

app.get("/work", (req, res) => {
	res.render("list", { listTitle: "Work List", items: workItems });
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.listen(process.env.PORT, () => {
	console.log(`app listening on http://localhost:${process.env.PORT}`);
});
