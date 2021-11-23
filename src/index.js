const displayCityInfo = document.getElementById("cityDetails");
const searchCityDiv = document.getElementById("searchCity");
const dailyForecast = document.getElementById("dailyForecast");
const cityName = document.getElementById("cityName");
const searchBtn = document.getElementById("search");
let urlKey = "ff29776d47fbae9020ce171caf42de56";
let urlApikey = "5266f3bdb4ea4bd6bc4211452211811";

//event listeners
window.addEventListener("load", getDefaultWeather);
searchBtn.addEventListener("click", searchCity);

async function getDefaultWeather() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=douala&units=metric&appid=${urlKey}`;

  let urlApi = `https://api.weatherapi.com/v1/forecast.json?key=${urlApikey}&q=douala&days=1&aqi=no&alerts=no`;
  let date = new Date().toGMTString();

  await fetch(urlApi)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw console.log(err);
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayCityInfo.innerHTML = `<div class="city-div">
        <div class="city-details">
          <p class="city-condition">${data.current.condition.text}</p>
          <h2>${data.location.name}, ${data.location.country}</h2>
          <h1>${data.current.temp_c}</h1>
          <div>
            <p class="date">${date}</p>
          </div>
        </div>

        <div class="details-extra">
          <div class="details-more">
            <p class="p-details">Feels Like</p>
            <h4>${data.current.feelslike_c}</h4>
          </div>
          <div class="details-more">
            <p class="p-details">Wind Speed</p>
            <h4>${data.current.wind_kph}</h4>
          </div>
          <div class="details-more">
            <p class="p-details">Humidity</p>
            <h4>${data.current.humidity}</h4>
          </div>
          <div class="details-more">
            <p class="p-details">Wind Direction</p>
            <h4>${data.current.wind_dir}</h4>
          </div>
        </div>
      </div>
      `;

      let cityLong = data.location.lon;
      let cityLat = data.location.lat;
      getDailyForecast(cityLat, cityLong);
    });
}

async function searchCity() {
  let searchInput = document.querySelector("input");
  // searchInput.value === "" ? alert("Enter a City") : searchInput.value;
  if (searchInput.value === "") {
    searchBtn.nextElementSibling.innerHTML = `<p class="error-popup" >Enter a City</p>`;
    // alert("Enter a City")
  } else {
    let searchUrl = `https://api.weatherapi.com/v1/forecast.json?key=${urlApikey}&q=${searchInput.value}&days=1&aqi=no&alerts=no`;
    let date = new Date().toGMTString();

    await fetch(searchUrl)
      .then((response) => {
        if (response.ok) {
          searchBtn.nextElementSibling.innerHTML = ``;
          return response;
        }
        if (response.status === 400 || response.status === 404) {
          console.log("city not found");
          searchBtn.nextElementSibling.innerHTML = `
          <p class="error-popup">City not found</p>`;
        }
        throw console.log(err);
      })
      .then((response) => response.json())
      .then((data) => {
        displayCityInfo.innerHTML = `<div class="city-div">
        <div class="city-details">
          <p class="city-condition">${data.current.condition.text}</p>
          <h2>${data.location.name}, ${data.location.country}</h2>
          <h1>${data.current.temp_c}</h1>
          <div>
            <p class="date">${date}</p>
          </div>
        </div>

        <div class="details-extra">
          <div class="details-more">
            <p class="p-details">Feels Like</p>
            <h4>${data.current.feelslike_c}</h4>
          </div>
          <div class="details-more">
            <p class="p-details">Wind Speed</p>
            <h4>${data.current.wind_kph}</h4>
          </div>
          <div class="details-more">
            <p class="p-details">Humidity</p>
            <h4>${data.current.humidity}</h4>
          </div>
          <div class="details-more">
            <p class="p-details">Wind Direction</p>
            <h4>${data.current.wind_dir}</h4>
          </div>
        </div>
      </div>
      `;
        let cityLong = data.location.lon;
        let cityLat = data.location.lat;
        getDailyForecast(cityLat, cityLong);
      });
  }

  searchInput.value = "";
}

async function getDailyForecast(lat, lon) {
  let dayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${urlKey}`;

  console.log(dayUrl);

  try {
    let response = await fetch(dayUrl);
    let dailyData = await response.json();
    console.log(dailyData);
    let forecastDay = dailyData.daily;
    dailyForecast.innerHTML = "";
    forecastDay.forEach((day, i) => {
      // console.log(i);
      let dayToday = showDay(i);
      let iconSrc = getIcon(day.weather[0].icon);
      console.log(dayToday);
      dailyForecast.innerHTML += `
        <div class="main-details">
          <p class="week-day">${dayToday}</p>
          <div>
          <h4 class="week-temp">${day.temp.day}</h4>
          <p>${day.weather[0].description}</p>
          <img src=${iconSrc} width="60px">
          </div>
        </div>
        `;
    });
  } catch (error) {
    console.log(error);
  }
}

function showDay(timestamp) {
  switch (timestamp) {
    default:
      day = "Sunday";
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
  }
  return day;
}

function getIcon(code) {
  switch (code) {
    case "01d" || "01n":
      icon = "img/icons/sun.svg";
      break;

    case "02d" || "02n":
      icon = "img/icons/sunny.svg";
      break;

    case "03d" || "03n":
      icon = "img/icons/cloud.svg";
      break;

    case "04d" || "04n":
      icon = "img/icons/cloudy.svg";
      break;

    case "09d" || "09n":
      icon = "img/icons/rain.svg";
      break;

    case "10d" || "10n":
      icon = "img/icons/heavy-rain.svg";
      break;

    case "11d" || "11n":
      icon = "img/icons/thunderstorm.svg";
      break;

    case "13d" || "13n":
      icon = "img/icons/snowflake.svg";
      break;

    case "50d" || "50n":
      icon = "img/icons/mist.svg";
      break;
    default:
      icon = "img/icons/night.svg";
      break;
  }
  return icon;
}

// Todo
// 1. Fetch whether data on load..
// 2. Function that would display fetched weather data
//    - Fetch whether data with default city.
//    - Display fetched data on screen
// 3. Show error message if city is not found
// 4. add details containing cloud icons to daily weather forecast
// 5. Add day details for corresponding days.
// 6. Create an icons folder
// 7. Match icons to corresponding icon codes.
// 8. add background image.
