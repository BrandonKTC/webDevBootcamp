const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({
	name: String,
	rating: Number,
	review: String,
});
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
	name: "Apple",
	rating: 7,
	review: "Pretty solid as a fruit.",
});

fruit.save();

const personSchema = new mongoose.Schema({
	name: String,
	age: Number,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
	name: "John",
	age: 37,
});

person.save();

const kiwi = new Fruit({
	name: "Kiwi",
	rating: 10,
	review: "The best fruit!",
});

const orange = new Fruit({
	name: "Orange",
	rating: 4,
	review: "Too sour for me",
});

const banana = new Fruit({
	name: "Banana",
	rating: 3,
	review: "Weird texture",
});

Fruit.insertMany([kiwi, orange, banana], (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("Succesfully saved all the fruits to fruitsDB");
	}
});

Fruit.find((err, fruits) => {
	if (err) {
		console.log(err);
	} else {
		console.log(fruits);
	}
});
