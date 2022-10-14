const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
// create connection
mongoose.connect("mongodb://localhost:27017/todolistDB");
// define the schema
const itemsSchema = new mongoose.Schema({
	name: String,
});
// create the model
const Item = mongoose.model("Item", itemsSchema);
const Work = mongoose.model("Work", itemsSchema);

const read = new Item({
	name: "Read Limitless",
});

const be = new Item({
	name: "Becoming Limitless",
});

app.get("/", function (req, res) {
	const day = date.getDate();
	const item = Item.find({}, (err, items) => {
		if (items.length === 0) {
			Item.insertMany([read, be], (err) => {
				if (err) {
					console.log(err);
				} else {
					console.log("Default Added");
				}
			});
		}
		res.render("list", { listTitle: day, newListItems: items });
	});
});

app.post("/", function (req, res) {
	const item = new Item({
		name: req.body.newItem,
	});

	item.save();
	res.redirect("/");
});

app.post("/delete", (req, res) => {
	const id = req.body.checkbox;
	Item.findByIdAndRemove(id, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Item Delete");
		}
	});
	res.redirect("/");
});

app.get("/work", function (req, res) {
	Work.find({}, (err, items) => {
		res.render("list", { listTitle: "Work List", newListItems: items });
	});
});

app.get("/about", function (req, res) {
	res.render("about");
});

app.listen(process.env.PORT, function () {
	console.log(`app listening on http://localhost:${process.env.PORT}`);
});
