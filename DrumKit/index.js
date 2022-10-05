let drums = document.querySelectorAll(".drum");

drums.forEach((drum) => {
	drum.addEventListener("click", () => {
		let buttonInnerHtml = drum.innerHTML;
		detectKey(buttonInnerHtml);
		buttonAnimation(buttonInnerHtml);
	});
});

document.addEventListener("keydown", (e) => {
	let keyPressed = e.key;
	detectKey(keyPressed);
	buttonAnimation(keyPressed);
});

function detectKey(letter) {
	switch (letter) {
		case "w":
			var tom = new Audio("sounds/tom-1.mp3");
			tom.play();
			break;
		case "a":
			var tom = new Audio("sounds/tom-2.mp3");
			tom.play();
			break;
		case "s":
			var tom = new Audio("sounds/tom-3.mp3");
			tom.play();
			break;
		case "d":
			var tom = new Audio("sounds/tom-4.mp3");
			tom.play();
			break;
		case "j":
			var snare = new Audio("sounds/snare.mp3");
			snare.play();
			break;
		case "k":
			var crash = new Audio("sounds/crash.mp3");
			crash.play();
			break;
		case "l":
			var kick = new Audio("sounds/kick-bass.mp3");
			kick.play();
			break;
		default:
			break;
	}
}

function buttonAnimation(currentKey) {
	let activeButton = document.querySelector("." + currentKey);
	activeButton.classList.add("pressed");

	setTimeout(() => {
		activeButton.classList.remove("pressed");
	}, 100);
}
