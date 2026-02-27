let gameColours = ["red", "green", "blue", "yellow"];
let gameSequence = [];
let userSequence = [];
let level = 0;
let started = false;
let canClick = false;

$(document).keydown(function() {
    if(!started){
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    if (canClick === true) {
        let userChosenColour = $(this).attr("id");
        userSequence.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userSequence.length - 1);
    } else {
        return;
    }
});

function nextSequence() {
    userSequence = [];
    canClick = false;
    level++;
    $("#level-title").text("Level " + level);
    computerSequence();
}

function computerSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
		let randomColour = gameColours[randomNumber];
		gameSequence.push(randomColour);
        for (let i = 0; i < gameSequence.length; i++) {
            setTimeout(() => {
                $("#" + gameSequence[i]).fadeIn(100).fadeOut(100).fadeIn(100);
		    playSound(gameSequence[i]);
            }, i * 500);
        }
        setTimeout(() => {
            canClick = true;
        }, gameSequence.length * 500);
};

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

function checkAnswer(currentLevel) {
    if (gameSequence[currentLevel] === userSequence[currentLevel]) {
        if (userSequence.length === gameSequence.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
};

function startOver() {
    level = 0;
    gameSequence = [];
    started = false;
    canClick = false;
};