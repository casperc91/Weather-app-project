function formatDate() {
  let current = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = current.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = current.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDay = days[current.getDay()];

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = `${currentDay}, ${hours}:${minutes}`;
}

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = temperature;
}

function citytemp(city) {
  let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(weatherUpdates);
}

function city(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;

  document.querySelector("h1").innerHTML = city;
  citytemp(city);
}

function weatherUpdates(response) {
  showTemp(response);
  getHumidity(response);
  getWind(response);
  getPrecipitation(response);
  getDescrip(response);
  currentCityname(response);
  formatDate(date);

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function getHumidity(response) {
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
}

function getWind(response) {
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${wind} mph`;
}

function getPrecipitation(response) {
  let precipitation = Math.round(response.data.clouds.all);
  let precipElement = document.querySelector("#precip");
  precipElement.innerHTML = `Precipitation: ${precipitation}%`;
}

function getDescrip(response) {
  let descrip = response.data.weather[0].description;
  let descripElement = document.querySelector("#descrip");
  descripElement.innerHTML = descrip;
}

function currentLocationclick(event) {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

function currentPosition(position) {
  let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  console.log(lon);
  console.log(lat);

  axios.get(apiUrl).then(weatherUpdates);
}

function currentCityname(response) {
  let currentcity = response.data.name;
  let citynameElement = document.querySelector("h1");
  citynameElement.innerHTML = currentcity;
}
function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  fahrenheitlink.classList.add("active");
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
function displayfahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitTemp = null;

let form = document.querySelector("#city-form");
form.addEventListener("submit", city);

let button = document.querySelector("#current-location");
button.addEventListener("click", currentLocationclick);

let celsiuslink = document.querySelector("#celsius");
celsiuslink.addEventListener("click", displayCelsius);

let fahrenheitlink = document.querySelector("#fahrenheit");

citytemp("Chicago");
//function displayFahrenheit(event) {

//document.querySelector("#temp").innerHTML = celsiusTemp;
//}

//let temperature = 49;
//
//

//let fahrenheitTemp = 49;

//
