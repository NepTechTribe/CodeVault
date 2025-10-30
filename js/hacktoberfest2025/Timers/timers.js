// setTimeout, setInterval, Animation

const log = document.getElementById('log');
function print(msg) {
  log.textContent += msg + '\n';
  console.log(msg);
}

// 1. setTimeout 
function showAlert() {
  print("setTimeout: Starting 3-second delay...");
  setTimeout(() => {
    alert("Hello from setTimeout! 3 seconds passed!");
    print("setTimeout: Alert shown!");
  }, 3000);
}

// 2. setInterval 
let countdownInterval;
function startCountdown() {
  let time = 10;
  document.getElementById('countdown').textContent = time;
  print("setInterval: Countdown started!");

  countdownInterval = setInterval(() => {
    time--;
    document.getElementById('countdown').textContent = time;
    if (time <= 0) {
      clearInterval(countdownInterval);
      print("Countdown finished!");
    }
  }, 1000);
}

function stopCountdown() {
  clearInterval(countdownInterval);
  print("Countdown stopped!");
}

// 3. Animation
let animationInterval;
let pos = 0;
const box = document.getElementById('animatedBox');

function startAnimation() {
  pos = 0;
  box.style.marginLeft = '0px';
  print("Animation started!");

  animationInterval = setInterval(() => {
    pos += 5;
    box.style.marginLeft = pos + 'px';
    if (pos >= 300) {
      clearInterval(animationInterval);
      print("Animation finished!");
    }
  }, 50);
}

function stopAnimation() {
  clearInterval(animationInterval);
  print("Animation stopped!");
}

// 4. Real-time Clock
let clockInterval;
function startClock() {
  print("Clock started!");
  clockInterval = setInterval(() => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    document.getElementById('clock').textContent = time;
  }, 1000);
}

function stopClock() {
  clearInterval(clockInterval);
  print("Clock stopped!");
}