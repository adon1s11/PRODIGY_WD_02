const playButton = document.querySelector(".Play");
const lapButton = document.querySelector(".lap");
const resetButton = document.querySelector(".reset");
const clearButton = document.querySelector(".lap-clear-button"); // Corrected class name
const minuteButton = document.querySelector(".minute");
const secondButton = document.querySelector(".sec");
const centisecondButton = document.querySelector(".msec");
const laps = document.querySelector(".laps");
const bgButton = document.querySelector(".outer-circle"); // Assuming this is the correct selector for your background element

let isPlay = false;
let secCounter = 0;
let centiCounter = 0;
let sec;
let centiSec;
let min;
let minCounter = 0;
let lapitem = 0; // Initialize lapitem to 0

// Function to toggle visibility of clearButton
const toggleClearButton = () => {
    if (clearButton.classList.contains("hidden")) {
        clearButton.classList.remove("hidden");
    } else {
        clearButton.classList.add("hidden");
    }
};

const play = () => {
    if (!isPlay) {
        playButton.textContent = 'Pause';
        bgButton.classList.add("animation-bg");
        min = setInterval(() => {
            minCounter++;
            minuteButton.innerHTML = `&nbsp;${minCounter} : `;
        }, 60 * 1000);
        isPlay = true;
        sec = setInterval(() => {
            secCounter++;
            if (secCounter === 60) secCounter = 0;
            secondButton.innerHTML = `&nbsp;${secCounter} : `;
        }, 1000);
        centiSec = setInterval(() => {
            centiCounter++;
            if (centiCounter === 100) centiCounter = 0;
            centisecondButton.innerHTML = `&nbsp;${centiCounter}  `;
        }, 10);
        lapButton.classList.remove("hidden");
        resetButton.classList.remove("hidden");
    } else {
        clearInterval(min);
        playButton.textContent = 'Play';
        clearInterval(sec);
        clearInterval(centiSec);
        isPlay = false;
        lapButton.classList.add("hidden");
        resetButton.classList.add("hidden");
        bgButton.classList.remove("animation-bg");
    }
};

const reset = () => {
    clearInterval(min);
    minuteButton.innerHTML = '&nbsp;0 : ';
    clearInterval(sec);
    clearInterval(centiSec);
    secCounter = 0;
    centiCounter = 0;
    secondButton.innerHTML = '&nbsp;0 : ';
    centisecondButton.innerHTML = '&nbsp;0 ';
    playButton.textContent = 'Play';
    isPlay = false;
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    laps.innerHTML = ''; // Clear laps list
    lapitem = 0; // Reset lapitem counter
    clearButton.classList.add("hidden"); // Hide clearButton when resetting
};

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "time-stamp");

    number.innerText = `#${++lapitem}`;
    timeStamp.innerText = `${minCounter} : ${secCounter} : ${centiCounter}`;

    li.appendChild(number);
    li.appendChild(timeStamp);
    laps.appendChild(li);
    toggleClearButton(); // Show clearButton when adding a lap
};

const clearAll = () => {
    laps.innerHTML = '';
    lapitem = 0;
    clearButton.classList.add("hidden"); // Hide clearButton when clearing all laps
};

// Initially hide lapButton, resetButton, and clearButton
lapButton.classList.add("hidden");
resetButton.classList.add("hidden");
clearButton.classList.add("hidden");

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);