const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

let items = ["Read Limitless", "Becoming Limitless"];
let workItems = [];

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
	let option = {
		weekday: "long",
		day: "numeric",
		month: "long",
	};
	let today = new Date();
	let day = today.toLocaleString("fr-FR", option);

	res.render("list", { listTitle: day, items: items });
});

app.get("/work", (req, res) => {
	res.render("list", { listTitle: "Work List", items: workItems });
});

app.get("/about", (req, res) => {
	res.render("about")
})

app.listen(process.env.PORT, () => {
	console.log(`app listening on http://localhost:${process.env.PORT}`);
});
