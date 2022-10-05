const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

let gameStart = false;

$(document).keypress(() => {
	if (!gameStart) {
		$("#level-title").text(`Level ${level}`);
		nextSequence();
		gameStart = true;
	}
});

$(".btn").click(function () {
	let userChosenColour = $(this).attr("id");
	animatePress($(this));
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
	userClickedPattern = [];
	level++;

	$("#level-title").text(`Level ${level}`);

	let randomNumber = Math.floor(Math.random() * 4);

	let randomChosenColour = buttonColours[randomNumber];

	gamePattern.push(randomChosenColour);

	$(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);

	playSound(randomChosenColour);
}

function playSound(name) {
	let audio = new Audio(`sounds/${name}.mp3`);
	audio.play();
}

function animatePress(currentColour) {
	$(currentColour).addClass("pressed");

	setTimeout(() => {
		$(currentColour).removeClass("pressed");
	}, 100);
}

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
		console.log("success");
		if (userClickedPattern.length == gamePattern.length) {
			setTimeout(() => {
				nextSequence();
			}, 1000);
		}
	} else {
		console.log("wrong");

		playSound("wrong");

		$("body").addClass("game-over");
		setTimeout(() => {
			$("body").removeClass("game-over");
		}, 200);

		$("#level-title").text("Game Over, Press Any Key to Restart");

		startOver();
	}
}

function startOver() {
	level = 0;
	gamePattern = [];
	gameStart = false;
}
