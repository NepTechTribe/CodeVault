const apiKey = 'cdd7176a047c94a0c3436198b8cd1e05';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.querySelector('.weather-info');
const errorMsg = document.querySelector('.error-msg');
const loading = document.querySelector('.loading');
const weatherIcon = document.getElementById('weather-icon');

async function checkWeather(city) {
  if (!city.trim()) return;

  errorMsg.classList.add('hidden');
  weatherInfo.classList.add('hidden');
  loading.classList.remove('hidden');

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.querySelector('.city').textContent = data.name;
    document.querySelector('.temp').textContent = Math.round(data.main.temp) + "°C";
    document.querySelector('.humidity').textContent = data.main.humidity + "%";
    document.querySelector('.wind').textContent = data.wind.speed + " km/h";

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    loading.classList.add('hidden');
    weatherInfo.classList.remove('hidden');

  } catch (err) {
    loading.classList.add('hidden');
    errorMsg.classList.remove('hidden');
  }
}

searchBtn.addEventListener('click', () => checkWeather(cityInput.value));
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') checkWeather(cityInput.value);
});

window.addEventListener('load', () => {
  cityInput.value = 'Kathmandu';
  checkWeather('Kathmandu');
});