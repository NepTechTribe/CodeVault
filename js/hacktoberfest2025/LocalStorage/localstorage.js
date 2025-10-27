
// Save, Load, and Clear data in browser

const nameInput = document.getElementById('name');
const output = document.getElementById('output');

// Save name to localStorage
function saveName() {
  const name = nameInput.value.trim();
  if (name === '') {
    alert('Please enter a name!');
    return;
  }
  localStorage.setItem('userName', name);
  alert('Name saved!');
  loadName(); // Update display
}

// Load name from localStorage
function loadName() {
  const savedName = localStorage.getItem('userName');
  if (savedName) {
    output.innerHTML = `Saved name: <strong>${savedName}</strong>`;
  } else {
    output.innerHTML = `Saved name: <strong>None</strong>`;
  }
}

// Clear name from localStorage
function clearName() {
  localStorage.removeItem('userName');
  output.innerHTML = `Saved name: <strong>None</strong>`;
  nameInput.value = '';
  alert('Name cleared!');
}

// Load on page start
loadName();