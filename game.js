let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
let canClick = false;

$(document).keypress(function () {
	if (!started) {
		nextSequence();
		started = true;
	}
});

$(".btn").click(function () {
	if (canClick === true) {
		let userChosenColour = $(this).attr("id"); // selected the Id cos that's what we need to add actions to it
		userClickedPattern.push(userChosenColour);
		playSound(userChosenColour);
		animatePress(userChosenColour);
		checkAnswer(userClickedPattern.length - 1);
	} else {
		return;
	}
});

function nextSequence() {
	userClickedPattern = []; // reset user pattern because the user starts again from the first color
	level++;
	$("#level-title").text("Level " + level);
	// let randomNumber = Math.floor(Math.random() * 4);
	// let randomChosenColour = buttonColours[randomNumber];
	// gamePattern.push(randomChosenColour);
	// Moved the random number generation and pattern update to the computerTurn function to ensure it happens in sequence with the correct timing.
	computerTurn();
}

function playSound(name) {
	let audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { // to check if the user is correct
		if (userClickedPattern.length === gamePattern.length) { // to check if the user is done
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);
		$("#level-title").text("Game Over, Press Any Key to Restart");
		startOver();
		canClick = false;
	}
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}

function computerTurn() {
	canClick = false;
	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	for (let i = 0; i < gamePattern.length; i++) {
		// Moved the playSound and animation inside the setTimeout to ensure they happen in sequence with the correct timing.
		setTimeout(() => {
			playSound(gamePattern[i]);
			$("#" + gamePattern[i])
				.fadeIn(100)
				.fadeOut(100)
				.fadeIn(100);
		}, i * 500);
		// playSound(gamePattern[i]);
		// $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
	}
	setTimeout(() => {
		canClick = true;
	}, gamePattern.length * 500);
}