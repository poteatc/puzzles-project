const buttons = document.querySelectorAll(".game-button"); // Ensure only game buttons are selected
let pattern = []; // Stores the sequence of highlighted buttons
let clicks = []; // Stores the user clicks
let consecutivePresses = 0; // Counter for consecutive correct presses

// Function to update the consecutive presses display
function updateConsecutivePresses() {
  const consecutivePressesDisplay = document.getElementById(
    "consecutive-presses"
  );
  consecutivePressesDisplay.textContent = `Score: ${consecutivePresses}`;
}

// Function to add a new random number to the pattern
function addToPattern() {
  pattern.push(Math.floor(Math.random() * 4));
}

// Function to flash a button (highlight it briefly)
function flash(button) {
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 500);
}

// Function to disable all buttons
function disableButtons() {
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

// Function to enable all buttons
function enableButtons() {
  buttons.forEach((button) => {
    button.disabled = false;
  });
}

// Function to display the current pattern to the user
function showPattern() {
  disableButtons(); // Disable buttons during pattern display
  let delay = 0;
  pattern.forEach((index) => {
    setTimeout(() => flash(buttons[index]), delay);
    delay += 1000; // Adjust delay between flashes
  });
  // Enable buttons after the entire pattern is shown
  setTimeout(enableButtons, delay);
}

// Start button element
const startButton = document.getElementById("start-button");

// Function to hide the start button
function hideStartButton() {
  startButton.style.display = "none";
}

// Function to show the start button
function showStartButton() {
  startButton.style.display = "block";
}

// Function to reset the game if the user makes a mistake
function resetGame() {
  pattern = [];
  clicks = [];
  alert(
    "Wrong sequence! Starting over.\n" +
      "Your streak that time was " +
      consecutivePresses
  );
  consecutivePresses = 0; // Reset the consecutive presses count
  updateConsecutivePresses(); // Update the display

  showStartButton(); // Redisplay the start button
}

// Function to validate the user's input
function validateClick(buttonIndex) {
  clicks.push(buttonIndex);

  // Check if the user's input matches the current sequence
  if (clicks[clicks.length - 1] !== pattern[clicks.length - 1]) {
    resetGame();
    return;
  }

  // If the user completes the sequence correctly
  if (clicks.length === pattern.length) {
    consecutivePresses++; // Increase the counter for consecutive correct presses
    updateConsecutivePresses(); // Update the display
    clicks = [];
    addToPattern();
    setTimeout(showPattern, 1000);
  }
}

// Attach event listeners to the buttons
buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    flash(button);
    validateClick(index);
  });
});

// Start button click handler
startButton.addEventListener("click", () => {
  hideStartButton(); // Hide the start button
  pattern = []; // Ensure pattern starts clean
  clicks = []; // Reset user clicks
  consecutivePresses = 0; // Reset consecutive presses count
  updateConsecutivePresses(); // Update the display
  addToPattern(); // Start with the first pattern
  showPattern(); // Display the pattern to the user
});
