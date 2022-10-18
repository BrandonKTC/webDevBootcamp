const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose.connect(process.env.URI);

const userSchema = new mongoose.Schema({
	email: String,
	password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
	res.render("home");
});

app
	.route("/login")
	.get((req, res) => {
		res.render("login");
	})
	.post((req, res) => {
		const username = req.body.username;
		const password = req.body.password;

		User.findOne({ email: username }, (err, foundUser) => {
			if (!err) {
				if (foundUser) {
					if (foundUser.password == password) {
						res.render("secrets");
					} else {
						console.log("Error");
					}
				} else {
					console.log("Error");
				}
			}
		});
	});

app
	.route("/register")
	.get((req, res) => {
		res.render("register");
	})
	.post((req, res) => {
		const newUser = new User({
			email: req.body.username,
			password: req.body.password,
		});

		newUser.save((err) => {
			if (!err) {
				res.render("secrets");
			} else {
				console.log(err);
			}
		});
	});

app.listen(process.env.PORT, () => {
	console.log(`Server listening on : http:localhost:${process.env.PORT}`);
});
