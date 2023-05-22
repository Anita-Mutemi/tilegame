const moves = document.getElementById("moveCounter");
const timeValue = document.getElementById("timeContainer");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const gameContainer = document.querySelector ("gameContainer");
const result = document.getElementByID ("resultParagaph");
const controls = document.querySelector ("controlsContainer");

let cards;
let interval;

let firstCard =false;
let secondCard = false;

//tile images to be used attached here
const tiles = [
    { name: "apples", image: "./apples.jpg" },
    { name: "tangerine", image: "./tangerine.jpg" },
    { name: "orange", image: "./oragnge.jpg" },
    { name: "banana", image: "./banana.jpg" },
    { name: "mixed_fruits", image: "./mixed_fruits.jpg" },
    { name: "pineapple", image: "./pineapple.jpg" },
]

//setting initial time
let seconds = 0,
  minutes = 0;

//setting initial moves
let movesCount = 0,
  winCount = 0;

//for timer for every iteration
const timeGenerator = () => {
    seconds += 1;
    //timer setting. minutes logics.
    if (seconds >= 60) {
        minutes +=1;
        seconds = 0;
    }
    //format th ime before displaying it
    let secondsValue = seconds < 10 ? '0${seconds}' :
    seconds;
    let minutesValue = minutes < 10 ? '0${minutes}' :
    minutes;
    timeValue.innerHTML = '<span>Time:</span>$ {minutesValue}:${secondValue}';
};


