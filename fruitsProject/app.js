const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		min: 1,
		max: 10,
	},
	review: String,
});
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
	// name: "Peaches",
	rating: 10,
	review: "Peaches are so yummy.",
});

// fruit.save();

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

Person.deleteMany({ name: "John" }, (err) => {
	if (err) {
		console.log(err);
	} else {
		mongoose.connection.close();
		console.log("Delete complete");
	}
});

Fruit.updateOne(
	{ review: "Peaches are so yummy." },
	{ name: "Peach" },
	(err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Succesfully Update Doc.");
			mongoose.connection.close();
		}
	}
);

Fruit.deleteOne({ _id: "63492225c01df9b364b3e334" }, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("Succesfully Delete item");
		mongoose.connection.close();
	}
});
