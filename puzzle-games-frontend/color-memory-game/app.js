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
  button.classList.add("active");
}

function setInactive(button) {
  button.classList.remove("active");
}

// buttons.forEach((button) => {
//   button.addEventListener("click", function (event) {
//     setActive(button);
//   });
// });

addToPattern();

function flash(index) {
  buttons[index].classList.toggle("active");
  //setInterval(flash(index), 1000);
}

addToPattern();

//let flashIntervalId = setInterval(sequence, 1000);

// function iterateAndClear(array, callback, interval) {
//   let index = 0;
//   const intervalId = setInterval(() => {
//     if (index < array.length) {
//       callback(array[index]);
//       setTimeout(callback(array[index]), 1000);
//       index++;
//     } else {
//       clearInterval(intervalId);
//     }
//   }, interval);
// }

// iterateAndClear(pattern, flash, 1000);

const onClick = function () {
  //console.log(this.id);
  clicks.push(this.id);
  this.classList.toggle("active");
  setTimeout(() => {
    this.classList.toggle("active");
  }, 1000);
  console.log(clicks);
  //setTimeout(setInactive(this), 2000);
  //   startInterval();
  //   //setActive(this);
  //   pauseInterval();
};

buttons.forEach((button) => {
  button.onclick = onClick;
});
