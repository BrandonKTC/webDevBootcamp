import React from "react";
import Footer from "./components/Footer";
import Note from "./components/Note";
import notes from "./notes.js";
import Header from "./components/Header";

export default function App() {
	return (
		<div>
			<Header />
			{notes.map((note) => (
				<Note key={note.key} title={note.title} content={note.content} />
			))}
			<Footer />
		</div>
	);
}
