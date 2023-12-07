const apikey = `783f866b0bf049a4e78edf7cb8c7f849`;
const searchInput = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-button");
const searchForm = document.getElementById("search-form");
let lat, lon;  

searchForm.addEventListener("submit", userInput);

function userInput(event) {
    event.preventDefault();
    let searchCity = searchInput.value;
    fetchCoordinates(searchCity);
}

function fetchCoordinates(search) {
    var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apikey}`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            lat = data[0].lat;
            lon = data[0].lon;
            fetchWeather(data[0]);
        });
}

function fetchWeather(location) {
  let city = location.name;
  const weatherapi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apikey}`;

  fetch(weatherapi)
      .then(function (res) {
          return res.json();
      })
      .then(function (data) {
          renderWeather(city, data);
      })
      .catch(function (err) {
          console.error(err);
      });
}

function renderWeather(city, weatherData) {
  const weatherContainer = document.getElementById("weather-container");
  weatherContainer.innerHTML = "";

  const forecastData = weatherData.list;
  
  const dailyForecast = forecastData.filter(item => item.dt_txt.includes("12:00:00"));

  dailyForecast.forEach(function (forecast) {
      const date = new Date(forecast.dt * 1000);
      const day = date.toLocaleDateString("en-US", { weekday: "short" });
      const temperature = forecast.main.temp;
      const description = forecast.weather[0].description;

      const weatherCard = document.createElement("div");
      weatherCard.classList.add("weather-card");

      weatherCard.innerHTML = `
          <h3>${day}</h3>
          <p>${city}</p>
          <p>${temperature}°F</p>
          <p>${description}</p>
      `;

      weatherContainer.appendChild(weatherCard);
  });
}