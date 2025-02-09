const startSection = document.getElementById('startSection');
const timerSection = document.getElementById('timerSection');
const minutesInput = document.getElementById('minutesInput');
const startButton = document.getElementById('startButton');
const timeDisplay = document.getElementById('timeDisplay');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const alarmFile = document.getElementById('alarmFile');
const alarmPath = document.getElementById('alarmPath');
const alarmSound = document.getElementById('alarmSound');

let timerInterval;
let remainingTime;
let isPaused = false;

startButton.addEventListener('click', () => {
    initialization();
});

document.getElementById('minutesInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    initialization();
  }
});


function initialization() {
  const minutes = parseInt(minutesInput.value, 10);
    if (isNaN(minutes) || minutes <= 0) {
        alert('Please enter a valid number of minutes.');
        return;
    }

    remainingTime = minutes * 60; // Convert to seconds
    startSection.style.display = 'none';
    timerSection.style.display = 'block';
    updateDisplay();
    startTimer();
}

pauseButton.addEventListener('click', () => {
    if (isPaused) {
        startTimer();
        pauseButton.textContent = 'Pause';
    } else {
        clearInterval(timerInterval);
        pauseButton.textContent = 'Resume';
    }
    isPaused = !isPaused;
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    startSection.style.display = 'block';
    timerSection.style.display = 'none';
    minutesInput.value = '';
    remainingTime = 0;
});

alarmFile.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        alarmSound.src = fileURL;
        alarmPath.textContent = `Current Alarm: ${file.name}`;
    }
});

function startTimer() {
    timerInterval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            alarmSound.play();
            alert('Time is up!');
            resetButton.click();
        } else {
            remainingTime--;
            updateDisplay();
        }
    }, 1000);
}

function updateDisplay() {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;
    timeDisplay.textContent =
        `${String(hours).padStart(2, '0')}:` +
        `${String(minutes).padStart(2, '0')}:` +
        `${String(seconds).padStart(2, '0')}`;
}

