const mongoose = require("mongoose");
const express = require("express");
const ejs = require("ejs");
require("dotenv").config();

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

//////////////////// REQUESTS Targeting A Specific Article ////////////////////

app
	.route("/articles/:articleTitle")
	.get((req, res) => {
		const articleTitle = req.params.articleTitle;
		Article.findOne({ title: articleTitle }, (err, foundArticle) => {
			if (!err) {
				res.send(foundArticle);
			} else {
				res.send(err);
			}
		});
	})
	.put((req, res) => {
		Article.findOneAndReplace(
			{ title: req.params.articleTitle },
			{
				title: req.body.title,
				content: req.body.content,
			},
			{ overwrite: true },
			(err) => {
				if (!err) {
					res.send("Successfully updated article.");
				} else {
					res.send(err);
				}
			}
		);
	})
	.patch((req, res) => {
		Article.findOneAndUpdate(
			{ title: req.params.articleTitle },
			{ $set: req.body },
			(err) => {
				if (!err) {
					res.send("Successfully Updated Article");
				} else {
					res.send(err);
				}
			}
		);
	})
	.delete((req, res) => {
		Article.findOneAndDelete({ title: req.params.articleTitle }, (err) => {
			if (!err) {
				res.send(`Successfully delete ${req.params.articleTitle}`);
			} else {
				res.send(err);
			}
		});
	});

app.listen(process.env.PORT, () => {
	console.log(`Server Listening on : http://localhost:${process.env.PORT}`);
});
