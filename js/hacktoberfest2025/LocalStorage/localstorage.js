
// Save, Load, and Clear data in browser

const nameInput = document.getElementById('name');
const output = document.getElementById('output');

function saveName() {
  const name = nameInput.value.trim();
  if (name === '') {
    alert('Please enter a name!');
    return;
  }
  localStorage.setItem('userName', name);
  alert('Name saved!');
  loadName(); 
}

function loadName() {
  const savedName = localStorage.getItem('userName');
  if (savedName) {
    output.innerHTML = `Saved name: <strong>${savedName}</strong>`;
  } else {
    output.innerHTML = `Saved name: <strong>None</strong>`;
  }
}


function clearName() {
  localStorage.removeItem('userName');
  output.innerHTML = `Saved name: <strong>None</strong>`;
  nameInput.value = '';
  alert('Name cleared!');
}

loadName();