// JS Syllabus #13 – Promises & async/await
// Simulate API delay with fake data

// Fake API function (returns Promise)
function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success
      if (success) {
        resolve({
          name: "Sabin",
          role: "JS Developer",
          level: "Intermediate"
        });
      } else {
        reject(new Error("Network failed! Try again."));
      }
    }, 1500);
  });
}

// Method 1: Using .then() and .catch()
function runPromise() {
  const output = document.getElementById('output');
  output.innerHTML = '<em>Loading with Promise...</em>';

  fetchUserData()
    .then(data => {
      output.innerHTML = `<p class="success">
        Success! Name: ${data.name}, Role: ${data.role}, Level: ${data.level}
      </p>`;
    })
    .catch(error => {
      output.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    });
}

// Method 2: Using async/await
async function runAsync() {
  const output = document.getElementById('output');
  output.innerHTML = '<em>Loading with async/await...</em>';

  try {
    const data = await fetchUserData();
    output.innerHTML = `<p class="success">
      Success! Name: ${data.name}, Role: ${data.role}, Level: ${data.level}
    </p>`;
  } catch (error) {
    output.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  }
}