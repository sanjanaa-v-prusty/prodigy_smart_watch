
let startStopBtn = document.getElementById("startStopBtn");
let resetBtn = document.getElementById("resetBtn");
let lapBtn = document.getElementById("lapBtn");
let minutesEl = document.getElementById("minutes");
let secondsEl = document.getElementById("seconds");
let millisecondsEl = document.getElementById("milliseconds");
let lapsContainer = document.getElementById("laps");

let minutes = 0, seconds = 0, milliseconds = 0;
let interval;
let isRunning = false;

// Start/Stop Function
startStopBtn.addEventListener("click", () => {
    if (!isRunning) {
        interval = setInterval(updateTime, 10);
        startStopBtn.textContent = "Stop";
        startStopBtn.style.backgroundColor = "orange";
    } else {
        clearInterval(interval);
        startStopBtn.textContent = "Start";
        startStopBtn.style.backgroundColor = "green";
    }
    isRunning = !isRunning;
});

// Reset Function
resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    minutes = seconds = milliseconds = 0;
    updateDisplay();
    startStopBtn.textContent = "Start";
    startStopBtn.style.backgroundColor = "green";
    isRunning = false;
    lapsContainer.innerHTML = ""; // Clear laps
});

// Lap Function
lapBtn.addEventListener("click", () => {
    if (isRunning) {
        let lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
        let lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
        lapsContainer.appendChild(lapItem);
    }
});

// Timer Logic
function updateTime() {
    milliseconds++;
    if (milliseconds >= 100) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    updateDisplay();
}

// Update UI
function updateDisplay() {
    minutesEl.textContent = formatTime(minutes);
    secondsEl.textContent = formatTime(seconds);
    millisecondsEl.textContent = formatTime(milliseconds);
}

// Format Time (Ensures two digits)
function formatTime(unit) {
    return unit < 10 ? `0${unit}` : unit;
}
