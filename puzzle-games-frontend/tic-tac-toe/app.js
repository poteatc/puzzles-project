// Game Variables
const board = ["", "", "", "", "", "", "", "", ""]; // Empty board
let currentPlayer = "X"; // X always starts
let gameActive = true; // Track if the game is ongoing

// DOM Elements
const cells = document.querySelectorAll(".tile");
const resetButton = document.getElementById("reset");

// Handle a cell click
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("id");

  // Check if the cell is already taken or the game is inactive
  if (board[index] !== "" || !gameActive) return;

  // Update the board and UI
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  // Check if the game is won or it's a draw
  if (checkWin()) {
    alert(`${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (board.every((cell) => cell !== "")) {
    alert("It's a draw!");
    gameActive = false;
    return;
  }

  // Switch Player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Check for a winning condition
function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Reset the game
function resetGame() {
  board.fill(""); // Clear the board
  gameActive = true;
  currentPlayer = "X"; // Reset to player X
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

// Attach event listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
