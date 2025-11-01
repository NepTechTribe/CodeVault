// Elements
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const timerDisplay = document.getElementById('timer-display');
const timerMode = document.getElementById('timer-mode');
const progress = document.querySelector('.timer-progress');
const taskInput = document.getElementById('task-input');
const addTask = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const sessionCount = document.getElementById('session-count');

// State
let timeLeft = 25 * 60;
let totalTime = 25 * 60;
let isRunning = false;
let isFocus = true;
let timerId;
let sessions = parseInt(localStorage.getItem('pomoflow-sessions')) || 0;
let tasks = JSON.parse(localStorage.getItem('pomoflow-tasks')) || [];

// Sound
const bell = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-bell-notification-933.mp3');

// Update Timer
function updateTimer() {
  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${mins}:${secs}`;

  const offset = ((totalTime - timeLeft) / totalTime) * 754;
  progress.style.strokeDashoffset = 754 - offset;
}

// Start Timer
function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startBtn.textContent = 'Pause';

  timerId = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(timerId);
      isRunning = false;
      startBtn.textContent = 'Start';
      bell.play();

      if (isFocus) {
        sessions++;
        sessionCount.textContent = sessions;
        localStorage.setItem('pomoflow-sessions', sessions);
        switchToBreak();
      } else {
        switchToFocus();
      }
    }
  }, 1000);
}

// Switch Modes
function switchToFocus() {
  isFocus = true;
  timeLeft = 25 * 60;
  totalTime = 25 * 60;
  timerMode.textContent = 'Focus Time';
  document.body.classList.remove('break-mode');
  updateTimer();
}

function switchToBreak() {
  isFocus = false;
  timeLeft = 5 * 60;
  totalTime = 5 * 60;
  timerMode.textContent = 'Break Time';
  document.body.classList.add('break-mode');
  updateTimer();
}

// Reset
resetBtn.addEventListener('click', () => {
  clearInterval(timerId);
  isRunning = false;
  startBtn.textContent = 'Start';
  isFocus ? switchToFocus() : switchToBreak();
});

// Start/Pause
startBtn.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Start';
  } else {
    startTimer();
  }
});

// Tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, i) => {
    const div = document.createElement('div');
    div.className = `flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all ${task.done ? 'opacity-60 line-through' : ''}`;
    div.innerHTML = `
      <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTask(${i})" class="w-5 h-5 rounded text-teal-500 focus:ring-teal-400"/>
      <span class="flex-1 text-gray-800 dark:text-gray-200">${task.text}</span>
      <button onclick="deleteTask(${i})" class="text-red-500 hover:scale-110 transition-all text-sm">Delete</button>
    `;
    taskList.appendChild(div);
  });
  localStorage.setItem('pomoflow-tasks', JSON.stringify(tasks));
}

function toggleTask(i) {
  tasks[i].done = !tasks[i].done;
  renderTasks();
}

window.deleteTask = function(i) {
  tasks.splice(i, 1);
  renderTasks();
};

addTask.addEventListener('click', () => {
  if (taskInput.value.trim()) {
    tasks.push({ text: taskInput.value.trim(), done: false });
    taskInput.value = '';
    renderTasks();
  }
});

taskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask.click();
});

// Dark Mode
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  document.getElementById('theme-toggle').textContent = isDark ? 'Light Mode' : 'Dark Mode';
});

// Init
switchToFocus();
renderTasks();
sessionCount.textContent = sessions;