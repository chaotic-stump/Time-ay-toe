let title = document.querySelector("#timer-title");
let timer = document.querySelector("#timer");
let seletedStage = document.querySelector("#selected-stage");
let timerOptions = document.querySelector("#timer-options");
let playButton = document.querySelector("#play-pause");
let progressBar = document.querySelector(".bar");

let paused = true;

let remainingMinutes = 0;
let remainingSeconds = 0;

console.log("global paused:", paused);

let durations = {
  pomodoro: 25,
  shortBreak: 1,
  longBreak: 10
};

let countdownInterval;


let updateTimerDisplay = (minutes, seconds) => {
  timer.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  remainingMinutes = minutes;
  remainingSeconds = seconds;
}

let pauseTimer = () => {
  paused = true;
  clearInterval(countdownInterval);
};

let updateTimerFromDropdown = () => {
  if (!paused) {
    playButton.click();
  } 
  progressBar.style.width = `0%`;
  pauseTimer();
  seletedStage.innerText = timerOptions.options[timerOptions.selectedIndex].text;
  let selectedTime = timerOptions.value;
  let minutes = durations[selectedTime];
  let seconds = 0;

  updateTimerDisplay(minutes, seconds);
};

updateTimerFromDropdown();

let togglePlayBtn = (event) => {
  console.log("togglePlayBtn");
  console.log("paused:", paused);
  paused = !paused;
  !paused ? startTimer() : pauseTimer();
}

let startTimer = () => {
  clearInterval(countdownInterval);

  // Use the remaining time if resuming, otherwise initialize from dropdown
  let selectStage = timerOptions.value;
  let minutes = remainingMinutes > 0 || remainingSeconds > 0 ? remainingMinutes : durations[selectStage];
  let seconds = remainingSeconds > 0 ? remainingSeconds : 0;

  let elapsedTime = 0;
  let totalTime = minutes * 60 + seconds;

  if (!paused) {
    countdownInterval = setInterval(() => {
      elapsedTime++;
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

      // Update the remaining time
      remainingMinutes = minutes;
      remainingSeconds = seconds;

      updateTimerDisplay(minutes, seconds);
    }, 1000);
  } else {
    clearInterval(countdownInterval);}
};



playButton.addEventListener("click", togglePlayBtn);
timerOptions.addEventListener("change", updateTimerFromDropdown);