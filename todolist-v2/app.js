const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
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
const listSchema = new mongoose.Schema({
	name: String,
	items: [itemsSchema],
});
// create the model
const Item = mongoose.model("Item", itemsSchema);
const List = mongoose.model("List", listSchema);

const read = new Item({
	name: "Read Limitless",
});

const be = new Item({
	name: "Becoming Limitless",
});

const defaultItems = [read, be];

app.get("/", function (req, res) {
	const item = Item.find({}, (err, items) => {
		if (items.length === 0) {
			Item.insertMany(defaultItems, (err) => {
				if (err) {
					console.log(err);
				} else {
					console.log("Default Added");
				}
			});
		}
		res.render("list", { listTitle: "Today", newListItems: items });
	});
});

app.post("/", function (req, res) {
	const itemName = req.body.newItem;
	const listName = req.body.list;

	const item = new Item({
		name: itemName,
	});

	if (listName == "Today") {
		item.save();
		res.redirect("/");
	} else {
		List.findOne({ name: listName }, (err, foundlist) => {
			foundlist.items.push(item);
			foundlist.save();
		});
		res.redirect(`/${listName}`);
	}
});

app.post("/delete", (req, res) => {
	const listName = req.body.listName;
	const id = req.body.checkbox;

	if (listName === "Today") {
		Item.findByIdAndRemove(id, (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log("Item Delete");
			}
		});
		res.redirect("/");
	} else {
		List.findOneAndUpdate(
			{ name: listName },
			{ $pull: { items: { _id: id } } },
			(err) => {
				if (!err) {
					res.redirect(`/${listName}`);
				}
			}
		);
	}
});

app.get("/:route", (req, res) => {
	const route = _.capitalize(req.params.route);

	List.findOne({ name: route }, (err, docs) => {
		if (!err) {
			if (!docs) {
				// Create a new List
				const list = new List({
					name: route,
					items: defaultItems,
				});
				list.save();
				res.redirect(`/${route}`);
			} else {
				// render existing list
				res.render("list", { listTitle: docs.name, newListItems: docs.items });
			}
		}
	});
});

app.get("/about", function (req, res) {
	res.render("about");
});

app.listen(process.env.PORT, function () {
	console.log(`app listening on http://localhost:${process.env.PORT}`);
});
