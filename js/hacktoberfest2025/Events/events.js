// JS Events – Simple & Complete

const output = document.getElementById('output');

// 1. onclick (inline)
function buttonClicked() {
  output.innerHTML = '<p style="color:blue;"><strong>Button clicked!</strong> (onclick)</p>';
}

// 2. onchange
function optionChanged(value) {
  output.innerHTML = `<p style="color:${value};">Color changed to: <strong>${value}</strong></p>`;
}

// 3. onkeydown
function keyPressed(event) {
  output.innerHTML = `<p>Key pressed: <strong>${event.key}</strong> (Code: ${event.keyCode})</p>`;
}

// 4. onsubmit + preventDefault
document.getElementById('myForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Stop page reload
  const name = document.getElementById('name').value;
  output.innerHTML = `<p>Form submitted! Name: <strong>${name}</strong></p>`;
});

// 5. addEventListener (modern way)
document.getElementById('child').addEventListener('click', function() {
  output.innerHTML = '<p style="color:orange;">Child clicked!</p>';
});

document.getElementById('parent').addEventListener('click', function() {
  output.innerHTML += '<p style="color:purple;">Parent also clicked! (Bubbling)</p>';
});

// 6. onload
function pageLoaded() {
  console.log("Page fully loaded!");
  output.innerHTML = '<p style="color:green;">Page loaded! Ready to go!</p>';
}