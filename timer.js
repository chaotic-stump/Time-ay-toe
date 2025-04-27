let title = document.querySelector("#timer-title");
let timer = document.querySelector("#timer");
let seletedStage = document.querySelector("#selected-stage");
let timerOptions = document.querySelector("#timer-options");
let startButton = document.querySelector("#start-button");
let progressBar = document.querySelector(".bar");

let paused = true;

let durations = {
  pomodoro: 25,
  shortBreak: 1,
  longBreak: 10
};

let countdownInterval;


let updateTimerDisplay = (minutes, seconds) => {
  timer.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

let updateTimerFromDropdown = () => {
  seletedStage.innerText = timerOptions.options[timerOptions.selectedIndex].text;
  let selectedTime = timerOptions.value;
  let minutes = durations[selectedTime];
  let seconds = 0;

  updateTimerDisplay(minutes, seconds);
};

updateTimerFromDropdown();

let togglePlayBtn = () => {
  console.log("togglePlayBtn");
  console.log("paused:", paused);
  paused ? startTimer() : pauseTimer();
  paused = !paused;
}

let startTimer = () => {
  clearInterval(countdownInterval);

  let selectStage = timerOptions.value;
  let minutes = durations[selectStage];
  let seconds = 0;
  let elapsedTime = 0;
  let totalTime = minutes * 60 + seconds;

  updateTimerDisplay(minutes, seconds);

  countdownInterval = setInterval(() => {
    elapsedTime++;
    console.log(elapsedTime);
    let progress = (elapsedTime / totalTime) * 100;
    progressBar.style.width = `${progress}%`;

    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(countdownInterval);
        progressBar.style.width = `100%`;
        progressBar.style.borderRadius = `3px`;
        alert("Time's up!");
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }

    updateTimerDisplay(minutes, seconds);
  }, 1000);
};

let pauseTimer = () => {
  clearInterval(countdownInterval);
};

let resetTimer = () => {
  clearInterval(countdownInterval);
  timer.innerText = "00:00";
};


startButton.addEventListener("click", togglePlayBtn);
timerOptions.addEventListener("change", updateTimerFromDropdown);