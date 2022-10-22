import React from "react";

export default function Note({ title, content, id, onDelete }) {
	return (
		<div className="note">
			<h1>{title}</h1>
			<p>{content}</p>
			<button onClick={() => onDelete(id)}>DELETE</button>
		</div>
	);
}
