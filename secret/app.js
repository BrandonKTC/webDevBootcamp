require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(
	session({
		secret: `${process.env.SECRET}`,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

mongoose.connect(process.env.URI);

const userSchema = new mongoose.Schema({
	email: String,
	password: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "http://localhost:3000/auth/google/secrets",
			userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
		},
		function (accessToken, refreshToken, profile, cb) {
			User.findOrCreate({ googleId: profile.id }, function (err, user) {
				return cb(err, user);
			});
		}
	)
);

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/auth/google", (req, res) => {
	passport.authenticate("google", { scope: ["profile"] });
});

app.get("/secrets", (req, res) => {
	if (req.isAuthenticated()) {
		res.render("secrets");
	} else {
		res.redirect("/login");
	}
});

app.get("/logout", function (req, res) {
	req.logout((err) => {
		if (!err) {
			res.redirect("/");
		}
	});
});

app
	.route("/login")
	.get((req, res) => {
		res.render("login");
	})
	.post((req, res) => {
		const user = new User({
			username: req.body.username,
			password: req.body.password,
		});

		req.login(user, (err) => {
			if (!err) {
				res.redirect("/secrets");
			}
		});
	});

app
	.route("/register")
	.get((req, res) => {
		res.render("register");
	})
	.post((req, res) => {
		User.register(
			{ username: req.body.username },
			req.body.password,
			(err, user) => {
				if (err) {
					console.log(err);
					res.redirect("/register");
				} else {
					passport.authenticate("local")(req, res, () => {
						res.redirect("/secrets");
					});
				}
			}
		);
	});

app.listen(process.env.PORT, () => {
	console.log(`Server listening on : http:localhost:${process.env.PORT}`);
});
