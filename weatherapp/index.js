//16eb148a0cf235ab7de3fd1dc5a5d80f

const apikey = "16eb148a0cf235ab7de3fd1dc5a5d80f";
const weatherData = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input");
const form = document.querySelector("form");

//Set default city
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = cityInput.value;
  getWeatherData(city);
});

//Get weather data
async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
        `Feels like: ${Math.round(data.main.feels_like)}°C`,
        `Humidity: ${data.main.humidity}%`,
        `Wind speed: ${data.wind.speed} km/h`,
    ]

//Display weather data
    weatherData.querySelector(".temperature").textContent = `${temperature}°C`;
    weatherData.querySelector(".description").textContent = description;
    weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png">`;
     weatherData.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");

  } 
  //Error handling
  catch (error) {
    weatherData.querySelector(".temperature").textContent = "";

    weatherData.querySelector(".description").textContent = "An error has occured, please try again later";

    weatherData.querySelector(".icon").innerHTML = "";

     weatherData.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
    
  }
}
