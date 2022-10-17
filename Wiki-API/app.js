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

//////////////////// REQUESTS Targeting All Articles ////////////////////

app
	.route("/articles")
	.get((req, res) => {
		Article.find({}, (err, foundArticles) => {
			if (!err) {
				res.send(foundArticles);
			} else {
				res.send(err);
			}
		});
	})
	.post((req, res) => {
		const newArticle = new Article({
			title: req.body.title,
			content: req.body.content,
		});

		newArticle.save((err) => {
			if (!err) {
				res.send("Successfully Added a new Article.");
			} else {
				res.send(err);
			}
		});
	})
	.delete((req, res) => {
		Article.deleteMany({}, (err) => {
			if (!err) {
				res.send("Everything has been deleted");
			} else {
				res.send(err);
			}
		});
	});

app.route("/articles/:articleTitle").get((req, res) => {
	const articleTitle = req.params.articleTitle;
	Article.findOne({ title: articleTitle }, (err, foundArticle) => {
		if (!err) {
			res.send(foundArticle);
		} else {
			res.send(err);
		}
	});
});

//////////////////// REQUESTS Targeting A Specific Article ////////////////////

app.listen(process.env.PORT, () => {
	console.log(`Server Listening on : http://localhost:${process.env.PORT}`);
});
