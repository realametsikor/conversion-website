const focusInput = document.getElementById('focus-minutes');
const breakInput = document.getElementById('break-minutes');
const display = document.getElementById('timer-display');
const statusText = document.getElementById('timer-status');
const startBtn = document.getElementById('timer-start');
const pauseBtn = document.getElementById('timer-pause');
const resetBtn = document.getElementById('timer-reset');

let timerId = null;
let remainingSeconds = 0;
let isFocus = true;
let rounds = 0;

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
};

const setInitialTime = () => {
    const minutes = Number(focusInput.value) || 25;
    remainingSeconds = minutes * 60;
    display.textContent = formatTime(remainingSeconds);
    statusText.textContent = 'Ready to focus.';
    isFocus = true;
};

const tick = () => {
    if (remainingSeconds <= 0) {
        isFocus = !isFocus;
        if (!isFocus) rounds += 1;
        const nextMinutes = Number(isFocus ? focusInput.value : breakInput.value) || 5;
        remainingSeconds = nextMinutes * 60;
        statusText.textContent = isFocus
            ? `Focus time started. Completed rounds: ${rounds}.`
            : 'Break time. Recharge for the next session.';
        display.textContent = formatTime(remainingSeconds);
        return;
    }

    remainingSeconds -= 1;
    display.textContent = formatTime(remainingSeconds);
};

startBtn.addEventListener('click', () => {
    if (timerId) return;
    if (!remainingSeconds) setInitialTime();
    statusText.textContent = isFocus ? 'Focus time started.' : 'Break time started.';
    timerId = setInterval(tick, 1000);
});

pauseBtn.addEventListener('click', () => {
    if (!timerId) return;
    clearInterval(timerId);
    timerId = null;
    statusText.textContent = 'Timer paused.';
});

resetBtn.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
    rounds = 0;
    setInitialTime();
});

setInitialTime();
