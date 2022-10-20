import React from "react";

const today = new Date();
const year = today.getFullYear();

export default function Footer() {
	return (
		<footer>
			<p> Copyright © {year} </p>
		</footer>
	);
}
