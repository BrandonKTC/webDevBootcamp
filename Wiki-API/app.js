const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose.connect(process.env.URI);

const articleSchema = new mongoose.Schema({
	title: String,
	content: String,
});

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", (req, res) => {
	Article.find({}, (err, foundArticles) => {
		if (!err) {
			res.send(foundArticles);
		} else {
			res.send(err);
		}
	});
});

app.listen(process.env.PORT, () => {
	console.log(`Server Listening on : http://localhost:${process.env.PORT}`);
});
