const apikey = `783f866b0bf049a4e78edf7cb8c7f849`
// const weatherapi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`
const searchInput = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-button");
const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", userInput)

function userInput(event) {
    event.preventDefault()
    console.log("event", event)


    let searchCity = searchInput.value
    console.log("searchCity", searchCity);
    fetchCoordinates(searchCity)
}

function fetchCoordinates(search) {
    var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apikey}`;
    fetch(apiUrl).then(function(response){
        return response.json()
    }).then(function(data){
        console.log("data", data[0]);
        fetchWeather(data[0])
    })
}

function fetchWeather(location) {
    console.log(location);
    let lat  = location.lat;
  let lon  = location.lot;
  let city = location.name;
    const weatherapi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`

  fetch(weatherapi)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
    //   renderItems(city, data);
    })
    .catch(function (err) {
      console.error(err);
    });
}



// let x = 5
// let z = 10

// function myFunction (num1, num2) {
//  return num1 + num2
// }
// myFunction(x, z)