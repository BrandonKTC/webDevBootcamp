const express = require("express");

const app = express();

const PORT = 3000;

app.get("/about", (req, res) => {
	res.send(`<h1>About me Brandon</h1>
              <ul>
                <li>Basketball</li>
                <li>Programmation</li>
                <li>Reading</li>
              </ul>`);
});

app.get("/contact", (req, res) => {
	res.send("Contact me: brandon@gmail.com");
});

app.get("/", (req, res) => {
	res.send("<h1>Hello World</h1>");
});

app.listen(PORT, () => {
	console.log(`server listening on: http://localhost:${PORT}`);
});
