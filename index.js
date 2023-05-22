const moves = document.getElementById("movesCounter");
const timeValue = document.getElementById("timeContainer");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const gameContainer = document.querySelector(".gameContainer");
const result = document.getElementById("resultParagaph");
const controls = document.querySelector(".controlsContainer");

let cards;
let interval;

let activeTile = false;
let secondTile = false;

const tiles = [
  { name: "apples", image: "./apples.jpg" },
  { name: "tangerine", image: "./tangerine.jpg" },
  { name: "orange", image: "./oragnge.jpg" },
  { name: "banana", image: "./banana.jpg" },
  { name: "mixed_fruits", image: "./mixed_fruits.jpg" },
  { name: "pineapple", image: "./pineapple.jpg" },
];

let seconds = 0,
  minutes = 0;

let movesCount = 0,
  winCount = 0;

const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

const moveCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

const generateRandom = (size = 4) => {
  let tempArray = [...tiles];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `<div class="card-container" data-card-value="${cardValues[i].name}">
            <div class="card-before"></div>
            <img src="download.jpeg">
            </div>
            <div class="card-after">
            <img src="${cardValues[i].image}" class="image"/>
            </div>`;
  }
};

const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};

const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

gameContainer.style.gridTemplateColumns = `repeat(${4},auto)`;

tiles = document.querySelectorAll(".card-container");
tiles.forEach((card) => {
  card.addEventListener("click", () => {
    if (!card.classList.contains("matched")) {
      card.classList.add("flipped");
      if (!activeTile) {
        activeTile = card;
        activeTileValue = card.getAttribute("data-card-value");
      } else {
        movesCounter();
        secondTile = card;
        let secondTileValue = card.getAttribute("data-card-value");
        if (activeTileValue == secondTileValue) {
          activeTile.classList.add("matched");
          secondTile.classList.add("matched");
          activeTile = false;
          winCount += 1;
          if (winCount == Math.floor(cardValues.length / 2)) {
            result.innerHTML = `<h2>You Won</h2>
              <h4>Moves: ${movesCount}</h4>`;
            stopGame();
          }
        } else {
          let [tempFirst, tempSecond] = [activeTile, secondTile];
          activeTile = false;
          secondTile = false;
          let delay = setTimeout(() => {
            tempFirst.classList.remove("flipped");
            tempSecond.classList.remove("flipped");
          }, 900);
        }
      }
    }
  });
});

startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;

  controls.classList.add("finish");
  stopButton.classList.remove("finish");
  startButton.classList.add("finish");

  interval = setInterval(timeGenerator, 1000);

  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

stopButton.addEventListener("click", () => {
  controls.classList.remove("finish");
  stopButton.classList.add("finish");
  startButton.classList.remove("finish");
  clearInterval(interval);
});