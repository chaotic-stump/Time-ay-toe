let title = document.queryBySelector("#timer-title");
let timer = document.queryBySelector("#timer");


function buildStartTimer(stage) {
  title.innerText = stage + ":00"
}

// title.innerText = buildStartTimer(shortBreak);

buildStartTimer(shortBreak);
// timer.innerText = "30:00"

let pomoDoro = 25;
let shortBreak = 5;
let longBreak = 10;
