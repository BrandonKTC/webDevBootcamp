import React, { useState } from "react";
import CreateArea from "./components/CreateArea";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Note from "./components/Note";

function App() {
	const [items, setItems] = useState([]);

	function addItem(note) {
		setItems((prev) => {
			return [...prev, note];
		});
	}

	function onDelete(id) {
		setItems((item) => item.filter((last, i) => i !== id));
	}

	return (
		<div>
			<Header />
			<CreateArea addItem={addItem} />
			{items.map((note, i) => (
				<Note
					key={i}
					id={i}
					onDelete={onDelete}
					title={note.title}
					content={note.content}
				/>
			))}
			<Footer />
		</div>
	);
}

export default App;
