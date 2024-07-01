
async function getWeatherData(cityName) {
    const apiKey = '3d0c8c3446236b3046117af7e87f637c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; 
    }
}
function updateUI(weatherData) {
    const cityNameElement = document.getElementById('city-name');
    const temperatureElement = document.getElementById('temperature');

    if (weatherData) {
        cityNameElement.textContent = weatherData.name;
        temperatureElement.textContent = `${weatherData.main.temp} °C`;
    } else {
        cityNameElement.textContent = 'City not found';
        temperatureElement.textContent = '';
    }
}
document.getElementById('city-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const cityName = document.getElementById('city-input').value.trim();
    if (cityName) {
        const weatherData = await getWeatherData(cityName);
        updateUI(weatherData);
    } else {
        alert('Please enter a city name');
    }
});
