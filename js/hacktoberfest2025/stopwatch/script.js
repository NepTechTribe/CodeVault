
const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const stopBtn  = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const container = document.querySelector('.stopwatch');


let ms = 0, secs = 0, mins = 0;
let running = false;
let rafId = null;


const pad = n => (n < 10 ? `0${n}` : n);


const render = () => {
  timerEl.textContent = `${pad(mins)} : ${pad(secs)} : ${pad(ms)}`;
};

let last = 0;
const tick = now => {
  if (!last) last = now;
  const delta = now - last;

  if (delta >= 10) {              
    ms++;
    if (ms === 100) { ms = 0; secs++; }
    if (secs === 60) { secs = 0; mins++; }
    render();
    last = now;
  }
  rafId = requestAnimationFrame(tick);
};


startBtn.addEventListener('click', () => {
  if (running) return;
  running = true;
  container.classList.add('running');
  last = 0;
  rafId = requestAnimationFrame(tick);
});

stopBtn.addEventListener('click', () => {
  if (!running) return;
  running = false;
  container.classList.remove('running');
  cancelAnimationFrame(rafId);
});

resetBtn.addEventListener('click', () => {
  running = false;
  container.classList.remove('running');
  cancelAnimationFrame(rafId);
  ms = secs = mins = 0;
  render();
});