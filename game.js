let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

let title = document.getElementById("level-title");

window.addEventListener("keydown", () => {
    if(!started)
    {
        title.innerText = "Level " + level;
        nextSequence();
        started = true;
    }
})

function nextSequence()
{
    userClickedPattern = [];
    level++;
    title.innerText = "Level " + level;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    let box = document.querySelector(`#${randomChosenColour}`);
    box.style.backgroundColor = 'white';
    box.style.borderColor = 'white';
    setTimeout(() => {
        box.style = '';
    }, 300);
    playSound(randomChosenColour);
}

function animatePress(currentColor)
{
    let box = document.querySelector(`#${currentColor}`);

    box.classList.add("pressed");
    setTimeout(() => {
        box.classList.remove("pressed");
    }, 100);
}

function playSound(name)
{
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

document.querySelectorAll(".btn").forEach((ele) => {
    ele.addEventListener("click", () => {
        let userChosenColour = ele.id;
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);
    })
})

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel])
    {
        if(userClickedPattern.length == gamePattern.length)
        {
            setTimeout(() => {
                nextSequence();
            }, 500);
        }
    } else
    {
        playSound("wrong");
        document.body.classList.add("game-over");
        title.innerHTML = "Game Over, Press Any Key to Restart";

        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 500);

        startOver();
    }
}

function startOver() 
{
    level = 0;
    gamePattern = [];
    started = false;
}
