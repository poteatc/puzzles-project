// app.js
const wordList = ["apple", "grape", "melon", "berry", "peach"];
const targetWord = wordList[Math.floor(Math.random() * wordList.length)];
const maxTries = 5;

let currentRow = 0;

//const filePath = __dirname + "/words.txt";

// fetch(filePath)
//   .then((response) => response.text())
//   .then((data) => {
//     wordList = data.split("\n").map((word) => word.trim());
//     targetWord = wordList[Math.floor(Math.random() * wordList.length)];
//     console.log(targetWord);
//   }); // Example word list

document.getElementById("submit-btn").addEventListener("click", handleGuess);

function handleGuess() {
  const input = document.getElementById("guess-input");
  const guess = input.value.toLowerCase();
  if (guess.length !== 5) {
    displayMessage("Guess must be 5 letters long.");
    return;
  }

  if (currentRow >= maxTries) {
    displayMessage("Game over! The word was " + targetWord);
    return;
  }

  const guessRow = document.getElementsByClassName("guess-row")[currentRow];
  const result = checkGuess(guess);

  for (let i = 0; i < 5; i++) {
    const cell = document.createElement("div");
    cell.textContent = guess[i];
    console.log(`Letter: ${guess[i]}, State: ${result[i]}`); // Debugging output
    cell.className = ""; // Clear existing classes
    if (result[i] === "correct") {
      cell.classList.add("correct");
    } else if (result[i] === "present") {
      cell.classList.add("present");
    } else {
      cell.classList.add("absent");
    }
    guessRow.appendChild(cell);
  }

  currentRow++;

  if (guess === targetWord) {
    displayMessage("You won!");
    return;
  }

  if (currentRow >= maxTries) {
    displayMessage("Game over! The word was " + targetWord);
  }
  input.value = "";
}

function checkGuess(guess) {
  const result = Array(5).fill("absent");
  const targetChars = targetWord.split("");

  // Check for correct positions
  for (let i = 0; i < 5; i++) {
    if (guess[i] === targetChars[i]) {
      result[i] = "correct";
      targetChars[i] = null; // Mark as used
    }
  }

  // Check for present letters
  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue;
    const index = targetChars.indexOf(guess[i]);
    if (index > -1) {
      result[i] = "present";
      targetChars[index] = null; // Mark as used
    }
  }

  return result;
}

function displayMessage(message) {
  const messageBox = document.getElementById("message");
  messageBox.textContent = message;
}
