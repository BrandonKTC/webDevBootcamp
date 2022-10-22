import React, { useState } from "react";

function CreateArea({ addItem }) {
	const [note, setNote] = useState({
		title: "",
		content: "",
	});

	function handleChange(e) {
		const { value, name } = e.target;

		setNote((note) => {
			return { ...note, [name]: value };
		});
	}

	return (
		<div>
			<form onSubmit={(e) => e.preventDefault()}>
				<input
					onChange={handleChange}
					name="title"
					value={note.title}
					placeholder="title"
				/>
				<textarea
					onChange={handleChange}
					name="content"
					value={note.content}
					placeholder="Take a Note"
					rows="3"
				></textarea>
				<button
					onClick={() => {
						addItem(note);
						setNote({ title: "", content: "" });
					}}
				>
					+
				</button>
			</form>
		</div>
	);
}

export default CreateArea;
