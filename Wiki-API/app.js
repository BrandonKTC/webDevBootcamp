const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const express = require("express");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

mongoose.connect(process.env.URI);

const articleSchema = new mongoose.Schema({
	title: String,
	content: String,
});

const Article = mongoose.model("articles", articleSchema);

app.get("/", (req, res) => {
	res.send("<h1>Hello World</h1>");
});

app.listen(process.env.PORT, () => {
	console.log(`Server Listening on : http://localhost:${process.env.PORT}`);
});
