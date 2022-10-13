const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const dbName = "myproject";

const client = new MongoClient(url);

async function run() {
	try {
		const database = client.db("fruits_shop");
		const fruits = database.collection("fruits");

		await client.connect();
		// Establish and verify connection
		await client.db(dbName);
		console.log("Connected successfully to server");
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
run().catch(console.dir);

const collection = db.collection("fruits");

const doc = { name: "Neapolitan pizza", shape: "round" };
const result = await collection.insertOne(doc);
console.log(`A document was inserted with the _id: ${result.insertedId}`);
