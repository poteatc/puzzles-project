let screen = document.getElementById("screen");
let buttons = [];
let numMines = 20;
let mines = [];

// Create the grid and buttons
for (let i = 0; i < 10; i++) {
  let row = document.createElement("div");
  row.id = "row" + (i + 1);
  screen.appendChild(row);
  for (let j = 0; j < 10; j++) {
    let button = document.createElement("button");
    button.id = `${j + i * 10}`; // Ensure id is a string
    button.addEventListener("click", function () {
      showTileNumber(button);
      button.disabled = true;
    });
    button.addEventListener("contextmenu", (event) => {
      // Prevent the default context menu from appearing
      event.preventDefault();

      // Your custom right-click logic here
      //console.log('Right click!');
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

function showTileNumber(button) {
  let tileNum = parseInt(button.id);

  // Check if the tile is a mine
  if (mines.includes(tileNum)) {
    button.innerHTML = "x";
    return;
  }

  // Otherwise, calculate and display the number of surrounding mines
  let mineCount = calcNumMinesAround(tileNum);
  //button.innerHTML = mineCount > 0 ? mineCount : "";
  button.innerHTML = mineCount;
}

function calcNumMinesAround(tileNum) {
  let num = 0;

  // Neighbor offsets (relative to the current tile)
  const neighbors = [
    -11,
    -10,
    -9, // Top-left, Top, Top-right
    -1,
    1, // Left, Right
    9,
    10,
    11, // Bottom-left, Bottom, Bottom-right
  ];

  // Check each neighbor
  neighbors.forEach((offset) => {
    let neighbor = tileNum + offset;

    // Check if neighbor is valid and contains a mine
    if (isValidTile(tileNum, neighbor) && mines.includes(neighbor)) {
      num++;
    }
  });

  return num;
}

function isValidTile(tileNum, neighbor) {
  // Prevent wrapping around rows
  if (neighbor < 0 || neighbor >= 100) return false; // Out of bounds
  if (tileNum % 10 === 0 && neighbor % 10 === 9) return false; // Wraps from left to right
  if (tileNum % 10 === 9 && neighbor % 10 === 0) return false; // Wraps from right to left

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

    const formattedTime = `${pad(minutes)}:${pad(seconds)}`;
    document.getElementById("timer").textContent = formattedTime;
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}

function pad(num) {
  return (num < 10 ? "0" : "") + num;
}

startTimer(); // Start the timer immediately
