
let screen = document.getElementById("screen");
let buttons = [];
let numMines = 20;
let mines = [];
let revealedTiles = 0;
let totalTiles = 100 - numMines; // Total tiles excluding mines

// Create the grid and buttons
for (let i = 0; i < 10; i++) {
  let row = document.createElement("div");
  row.id = "row" + (i + 1);
  screen.appendChild(row);
  for (let j = 0; j < 10; j++) {
    let button = document.createElement("button");
    button.id = `${j + i * 10}`; // Ensure id is a string
    button.addEventListener("click", function () {
      handleTileClick(button);
    });
    button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      toggleFlag(button);
    });
    buttons.push(button);
    row.appendChild(button);
  }
}

function toggleFlag(b) {
  if (!b.disabled) {
    if (b.innerText == "!") {
      b.innerText = "";
    } else {
      b.innerText = "!";
    }
  }
}

// Place mines randomly
while (mines.length < numMines) {
  let tileNum = Math.floor(Math.random() * 100);
  if (!mines.includes(tileNum)) {
    mines.push(tileNum);
  }
}

function handleTileClick(button) {
  let tileNum = parseInt(button.id);

  // Check if the tile is a mine
  if (mines.includes(tileNum)) {
    button.innerHTML = "x";
    button.disabled = true;
    gameOver(false); // User clicked on a mine
    return;
  }

  // Otherwise, calculate and display the number of surrounding mines
  let mineCount = calcNumMinesAround(tileNum);
  button.innerHTML = mineCount > 0 ? mineCount : "";
  button.disabled = true;
  revealedTiles++;

  // Check for win condition
  if (revealedTiles === totalTiles) {
    gameOver(true); // User revealed all safe tiles
  }
}

function calcNumMinesAround(tileNum) {
  let num = 0;
  const neighbors = [-11, -10, -9, -1, 1, 9, 10, 11];

  neighbors.forEach((offset) => {
    let neighbor = tileNum + offset;
    if (isValidTile(tileNum, neighbor) && mines.includes(neighbor)) {
      num++;
    }
  });

  return num;
}

function isValidTile(tileNum, neighbor) {
  if (neighbor < 0 || neighbor >= 100) return false;
  if (tileNum % 10 === 0 && neighbor % 10 === 9) return false;
  if (tileNum % 10 === 9 && neighbor % 10 === 0) return false;
  return true;
}

// Timer
let seconds = 0;
let minutes = 0;
let intervalId;

function startTimer() {
  intervalId = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    document.getElementById("timer").textContent = `${pad(minutes)}:${pad(
      seconds
    )}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}

function pad(num) {
  return (num < 10 ? "0" : "") + num;
}

startTimer(); // Start the timer immediately

// Endgame Logic
function gameOver(won) {
  stopTimer();

  // Create and display the modal
  const modal = document.createElement("div");
  modal.id = "endgame-modal";
  modal.style.position = "fixed";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.background = "white";
  modal.style.padding = "20px";
  modal.style.border = "1px solid black";
  modal.style.textAlign = "center";
  modal.style.zIndex = "1000";

  const message = document.createElement("p");
  message.textContent = won
    ? "You avoided all mines. Congrats!"
    : "You blew up! Better luck next time.";
  modal.appendChild(message);

  const timeMessage = document.createElement("p");
  timeMessage.textContent = `Time: ${pad(minutes)}:${pad(seconds)}`;
  modal.appendChild(timeMessage);

  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart Game";
  restartButton.addEventListener("click", () => {
    document.body.removeChild(modal);
    resetGame();
  });
  modal.appendChild(restartButton);

  document.body.appendChild(modal);
}

function resetGame() {
  // Reset variables
  mines = [];
  revealedTiles = 0;
  seconds = 0;
  minutes = 0;

  // Clear the grid
  screen.innerHTML = "";
  buttons = [];

  // Reinitialize the game
  for (let i = 0; i < 10; i++) {
    let row = document.createElement("div");
    row.id = "row" + (i + 1);
    screen.appendChild(row);
    for (let j = 0; j < 10; j++) {
      let button = document.createElement("button");
      button.id = `${j + i * 10}`;
      button.addEventListener("click", function () {
        handleTileClick(button);
      });
      button.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        toggleFlag(button);
      });
      buttons.push(button);
      row.appendChild(button);
    }
  }

  // Reinitialize mines
  while (mines.length < numMines) {
    let tileNum = Math.floor(Math.random() * 100);
    if (!mines.includes(tileNum)) {
      mines.push(tileNum);
    }
  }

  // Restart the timer
  startTimer();
}
