const buttons = document.querySelectorAll("button");

buttons.forEach((button) =>
  console.log("", button.getAttribute("id") + " " + button.className)
);

let pattern = [];

function addToPattern() {
  pattern.push(Math.floor(Math.random() * 4));
  console.log(pattern[pattern.length - 1]);
}

let clicks = [];

function setActive(button) {
  button.classList.toggle("active");
}

buttons.forEach((button) => {
  button.addEventListener("click", function (event) {
    setActive(button);
  });
});

//let intervalId = setInterval(addToPattern, 1000);
