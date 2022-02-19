/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const displayCityInfo = document.getElementById("cityDetails");
const searchCityDiv = document.getElementById("searchCity");
const input = document.getElementById("input")
const dailyForecast = document.getElementById("dailyForecast");
const cityName = document.getElementById("cityName");
const searchBtn = document.getElementById("search");
let urlKey = "ff29776d47fbae9020ce171caf42de56";
let urlApikey = "5266f3bdb4ea4bd6bc4211452211811";
let tempUnit = '°C'
//event listeners
window.addEventListener("load", getDefaultWeather);
searchBtn.addEventListener("click", searchCity);
input.addEventListener("keypress", (e)=>{
  if (e.key === 'Enter') {
    // Cancel the default action, if needed
    e.preventDefault();
    // Trigger the button element with a click
    searchCity();
  }
})


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
      displayCityInfo.innerHTML = `<div class="city-div fade-in">
        <div class="city-details">
          <p class="city-condition">${data.current.condition.text}</p>
          <h2>${data.location.name}, ${data.location.country}</h2>
          <h1>${data.current.temp_c} <sup>${tempUnit}</sup></h1>
          <div>
            <p class="date">${date}</p>
          </div>
        </div>

        <div class="details-extra">
          <div class="details-more">
            <p class="p-details">Feels Like</p>
            <h4>${data.current.feelslike_c} ${tempUnit}</h4>
          </div>
          <div class="details-more">
            <p class="p-details">Wind Speed</p>
            <h4>${data.current.wind_kph} Km/h</h4>
          </div>
          <div class="details-more">
            <p class="p-details">Humidity</p>
            <h4>${data.current.humidity} %</h4>
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
        let countryInfo = data.location.country
        if (countryInfo === 'United States of America') {
          countryInfo = data.location.region;
        } else {
          countryInfo = data.location.country
        }
        displayCityInfo.innerHTML = `<div class="city-div fade-in">
        <div class="city-details">
          <p class="city-condition">${data.current.condition.text}</p>
          <h2>${data.location.name}, ${countryInfo}</h2>
          <h1>${data.current.temp_c} <sup>${tempUnit}</sup></h1>
          <div>
            <p class="date">${date}</p>
          </div>
        </div>

        <div class="details-extra">
          <div class="details-more">
            <p class="p-details">Feels Like</p>
            <h4>${data.current.feelslike_c} ${tempUnit}</h4>
          </div>
          <div class="details-more">
            <p class="p-details">Wind Speed</p>
            <h4>${data.current.wind_kph} Km/h</h4>
          </div>
          <div class="details-more">
            <p class="p-details">Humidity</p>
            <h4>${data.current.humidity} %</h4>
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

  try {
    let response = await fetch(dayUrl);
    let dailyData = await response.json();
    // console.log(dailyData);
    let forecastDay = dailyData.daily;
    dailyForecast.innerHTML = "";
    forecastDay.forEach((day, i) => {
      // console.log(i);
      let dayToday = showDay(i);
      let iconSrc = getIcon(day.weather[0].icon);
      // console.log(dayToday);
      dailyForecast.innerHTML += `
        <div class="main-details fade-in">
          <p class="week-day">${dayToday}</p>
          <div class="week-details">
            <h4 class="week-temp">${day.temp.day} ${tempUnit}</h4>
            <p>${day.weather[0].description}</p>
            <img src=${iconSrc} class="icon" >
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
    case "01d" || 0:
      icon = "img/icons/sun.svg";
      break;

    case "02d" || 0:
      icon = "img/icons/sunny.svg";
      break;

    case "03d" || 0:
      icon = "img/icons/cloud.svg";
      break;

    case "04d" || 0:
      icon = "img/icons/cloudy.svg";
      break;

    case "09d" || 0:
      icon = "img/icons/rain.svg";
      break;

    case "10d" || 0:
      icon = "img/icons/heavy-rain.svg";
      break;

    case "11d" || 0:
      icon = "img/icons/thunderstorm.svg";
      break;

    case "13d" || 0:
      icon = "img/icons/snowflake.svg";
      break;

    case "50d" || 0:
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
// 9. Add units to corresponding values e.g celcuis, windspeed, humidity 
// 10. Add transition effect for fetched data.
// 11. Do mobile designs for teh UI 
// 12. Add a loader to the site before the fetched data returns.

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRpc3BsYXlDaXR5SW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0eURldGFpbHNcIik7XG5jb25zdCBzZWFyY2hDaXR5RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hDaXR5XCIpO1xuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0XCIpXG5jb25zdCBkYWlseUZvcmVjYXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYWlseUZvcmVjYXN0XCIpO1xuY29uc3QgY2l0eU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHlOYW1lXCIpO1xuY29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hcIik7XG5sZXQgdXJsS2V5ID0gXCJmZjI5Nzc2ZDQ3ZmJhZTkwMjBjZTE3MWNhZjQyZGU1NlwiO1xubGV0IHVybEFwaWtleSA9IFwiNTI2NmYzYmRiNGVhNGJkNmJjNDIxMTQ1MjIxMTgxMVwiO1xubGV0IHRlbXBVbml0ID0gJ8KwQydcbi8vZXZlbnQgbGlzdGVuZXJzXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZ2V0RGVmYXVsdFdlYXRoZXIpO1xuc2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzZWFyY2hDaXR5KTtcbmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCAoZSk9PntcbiAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgLy8gQ2FuY2VsIHRoZSBkZWZhdWx0IGFjdGlvbiwgaWYgbmVlZGVkXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIFRyaWdnZXIgdGhlIGJ1dHRvbiBlbGVtZW50IHdpdGggYSBjbGlja1xuICAgIHNlYXJjaENpdHkoKTtcbiAgfVxufSlcblxuXG5hc3luYyBmdW5jdGlvbiBnZXREZWZhdWx0V2VhdGhlcigpIHtcbiAgbGV0IHVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPWRvdWFsYSZ1bml0cz1tZXRyaWMmYXBwaWQ9JHt1cmxLZXl9YDtcblxuICBsZXQgdXJsQXBpID0gYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PSR7dXJsQXBpa2V5fSZxPWRvdWFsYSZkYXlzPTEmYXFpPW5vJmFsZXJ0cz1ub2A7XG4gIGxldCBkYXRlID0gbmV3IERhdGUoKS50b0dNVFN0cmluZygpO1xuXG4gIGF3YWl0IGZldGNoKHVybEFwaSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9XG4gICAgICB0aHJvdyBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgZGlzcGxheUNpdHlJbmZvLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiY2l0eS1kaXYgZmFkZS1pblwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2l0eS1kZXRhaWxzXCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJjaXR5LWNvbmRpdGlvblwiPiR7ZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0fTwvcD5cbiAgICAgICAgICA8aDI+JHtkYXRhLmxvY2F0aW9uLm5hbWV9LCAke2RhdGEubG9jYXRpb24uY291bnRyeX08L2gyPlxuICAgICAgICAgIDxoMT4ke2RhdGEuY3VycmVudC50ZW1wX2N9IDxzdXA+JHt0ZW1wVW5pdH08L3N1cD48L2gxPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImRhdGVcIj4ke2RhdGV9PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1leHRyYVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLW1vcmVcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwicC1kZXRhaWxzXCI+RmVlbHMgTGlrZTwvcD5cbiAgICAgICAgICAgIDxoND4ke2RhdGEuY3VycmVudC5mZWVsc2xpa2VfY30gJHt0ZW1wVW5pdH08L2g0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLW1vcmVcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwicC1kZXRhaWxzXCI+V2luZCBTcGVlZDwvcD5cbiAgICAgICAgICAgIDxoND4ke2RhdGEuY3VycmVudC53aW5kX2twaH0gS20vaDwvaDQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtbW9yZVwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJwLWRldGFpbHNcIj5IdW1pZGl0eTwvcD5cbiAgICAgICAgICAgIDxoND4ke2RhdGEuY3VycmVudC5odW1pZGl0eX0gJTwvaDQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtbW9yZVwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJwLWRldGFpbHNcIj5XaW5kIERpcmVjdGlvbjwvcD5cbiAgICAgICAgICAgIDxoND4ke2RhdGEuY3VycmVudC53aW5kX2Rpcn08L2g0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgYDtcblxuICAgICAgbGV0IGNpdHlMb25nID0gZGF0YS5sb2NhdGlvbi5sb247XG4gICAgICBsZXQgY2l0eUxhdCA9IGRhdGEubG9jYXRpb24ubGF0O1xuICAgICAgZ2V0RGFpbHlGb3JlY2FzdChjaXR5TGF0LCBjaXR5TG9uZyk7XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNlYXJjaENpdHkoKSB7XG4gIGxldCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgLy8gc2VhcmNoSW5wdXQudmFsdWUgPT09IFwiXCIgPyBhbGVydChcIkVudGVyIGEgQ2l0eVwiKSA6IHNlYXJjaElucHV0LnZhbHVlO1xuICBpZiAoc2VhcmNoSW5wdXQudmFsdWUgPT09IFwiXCIpIHtcbiAgICBzZWFyY2hCdG4ubmV4dEVsZW1lbnRTaWJsaW5nLmlubmVySFRNTCA9IGA8cCBjbGFzcz1cImVycm9yLXBvcHVwXCIgPkVudGVyIGEgQ2l0eTwvcD5gO1xuXG4gIH0gZWxzZSB7XG4gICAgbGV0IHNlYXJjaFVybCA9IGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT0ke3VybEFwaWtleX0mcT0ke3NlYXJjaElucHV0LnZhbHVlfSZkYXlzPTEmYXFpPW5vJmFsZXJ0cz1ub2A7XG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpLnRvR01UU3RyaW5nKCk7XG5cbiAgICBhd2FpdCBmZXRjaChzZWFyY2hVcmwpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgc2VhcmNoQnRuLm5leHRFbGVtZW50U2libGluZy5pbm5lckhUTUwgPSBgYDtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAwIHx8IHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJjaXR5IG5vdCBmb3VuZFwiKTtcbiAgICAgICAgICBzZWFyY2hCdG4ubmV4dEVsZW1lbnRTaWJsaW5nLmlubmVySFRNTCA9IGBcbiAgICAgICAgICA8cCBjbGFzcz1cImVycm9yLXBvcHVwXCI+Q2l0eSBub3QgZm91bmQ8L3A+YDtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgbGV0IGNvdW50cnlJbmZvID0gZGF0YS5sb2NhdGlvbi5jb3VudHJ5XG4gICAgICAgIGlmIChjb3VudHJ5SW5mbyA9PT0gJ1VuaXRlZCBTdGF0ZXMgb2YgQW1lcmljYScpIHtcbiAgICAgICAgICBjb3VudHJ5SW5mbyA9IGRhdGEubG9jYXRpb24ucmVnaW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvdW50cnlJbmZvID0gZGF0YS5sb2NhdGlvbi5jb3VudHJ5XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGxheUNpdHlJbmZvLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiY2l0eS1kaXYgZmFkZS1pblwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2l0eS1kZXRhaWxzXCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJjaXR5LWNvbmRpdGlvblwiPiR7ZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0fTwvcD5cbiAgICAgICAgICA8aDI+JHtkYXRhLmxvY2F0aW9uLm5hbWV9LCAke2NvdW50cnlJbmZvfTwvaDI+XG4gICAgICAgICAgPGgxPiR7ZGF0YS5jdXJyZW50LnRlbXBfY30gPHN1cD4ke3RlbXBVbml0fTwvc3VwPjwvaDE+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiZGF0ZVwiPiR7ZGF0ZX08L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLWV4dHJhXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtbW9yZVwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJwLWRldGFpbHNcIj5GZWVscyBMaWtlPC9wPlxuICAgICAgICAgICAgPGg0PiR7ZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jfSAke3RlbXBVbml0fTwvaDQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtbW9yZVwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJwLWRldGFpbHNcIj5XaW5kIFNwZWVkPC9wPlxuICAgICAgICAgICAgPGg0PiR7ZGF0YS5jdXJyZW50LndpbmRfa3BofSBLbS9oPC9oND5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1tb3JlXCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInAtZGV0YWlsc1wiPkh1bWlkaXR5PC9wPlxuICAgICAgICAgICAgPGg0PiR7ZGF0YS5jdXJyZW50Lmh1bWlkaXR5fSAlPC9oND5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1tb3JlXCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInAtZGV0YWlsc1wiPldpbmQgRGlyZWN0aW9uPC9wPlxuICAgICAgICAgICAgPGg0PiR7ZGF0YS5jdXJyZW50LndpbmRfZGlyfTwvaDQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICBgO1xuICAgICAgICBsZXQgY2l0eUxvbmcgPSBkYXRhLmxvY2F0aW9uLmxvbjtcbiAgICAgICAgbGV0IGNpdHlMYXQgPSBkYXRhLmxvY2F0aW9uLmxhdDtcbiAgICAgICAgZ2V0RGFpbHlGb3JlY2FzdChjaXR5TGF0LCBjaXR5TG9uZyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHNlYXJjaElucHV0LnZhbHVlID0gXCJcIjtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RGFpbHlGb3JlY2FzdChsYXQsIGxvbikge1xuICBsZXQgZGF5VXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZleGNsdWRlPW1pbnV0ZWx5LGhvdXJseSZ1bml0cz1tZXRyaWMmYXBwaWQ9JHt1cmxLZXl9YDtcblxuICB0cnkge1xuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGRheVVybCk7XG4gICAgbGV0IGRhaWx5RGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAvLyBjb25zb2xlLmxvZyhkYWlseURhdGEpO1xuICAgIGxldCBmb3JlY2FzdERheSA9IGRhaWx5RGF0YS5kYWlseTtcbiAgICBkYWlseUZvcmVjYXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgZm9yZWNhc3REYXkuZm9yRWFjaCgoZGF5LCBpKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhpKTtcbiAgICAgIGxldCBkYXlUb2RheSA9IHNob3dEYXkoaSk7XG4gICAgICBsZXQgaWNvblNyYyA9IGdldEljb24oZGF5LndlYXRoZXJbMF0uaWNvbik7XG4gICAgICAvLyBjb25zb2xlLmxvZyhkYXlUb2RheSk7XG4gICAgICBkYWlseUZvcmVjYXN0LmlubmVySFRNTCArPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYWluLWRldGFpbHMgZmFkZS1pblwiPlxuICAgICAgICAgIDxwIGNsYXNzPVwid2Vlay1kYXlcIj4ke2RheVRvZGF5fTwvcD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid2Vlay1kZXRhaWxzXCI+XG4gICAgICAgICAgICA8aDQgY2xhc3M9XCJ3ZWVrLXRlbXBcIj4ke2RheS50ZW1wLmRheX0gJHt0ZW1wVW5pdH08L2g0PlxuICAgICAgICAgICAgPHA+JHtkYXkud2VhdGhlclswXS5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICA8aW1nIHNyYz0ke2ljb25TcmN9IGNsYXNzPVwiaWNvblwiID5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNob3dEYXkodGltZXN0YW1wKSB7XG4gIHN3aXRjaCAodGltZXN0YW1wKSB7XG4gICAgZGVmYXVsdDpcbiAgICAgIGRheSA9IFwiU3VuZGF5XCI7XG4gICAgY2FzZSAwOlxuICAgICAgZGF5ID0gXCJTdW5kYXlcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMTpcbiAgICAgIGRheSA9IFwiTW9uZGF5XCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICBkYXkgPSBcIlR1ZXNkYXlcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzpcbiAgICAgIGRheSA9IFwiV2VkbmVzZGF5XCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDQ6XG4gICAgICBkYXkgPSBcIlRodXJzZGF5XCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDU6XG4gICAgICBkYXkgPSBcIkZyaWRheVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA2OlxuICAgICAgZGF5ID0gXCJTYXR1cmRheVwiO1xuICB9XG4gIHJldHVybiBkYXk7XG59XG5cbmZ1bmN0aW9uIGdldEljb24oY29kZSkge1xuICBzd2l0Y2ggKGNvZGUpIHtcbiAgICBjYXNlIFwiMDFkXCIgfHwgXCIwMW5cIjpcbiAgICAgIGljb24gPSBcImltZy9pY29ucy9zdW4uc3ZnXCI7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCIwMmRcIiB8fCBcIjAyblwiOlxuICAgICAgaWNvbiA9IFwiaW1nL2ljb25zL3N1bm55LnN2Z1wiO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFwiMDNkXCIgfHwgXCIwM25cIjpcbiAgICAgIGljb24gPSBcImltZy9pY29ucy9jbG91ZC5zdmdcIjtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBcIjA0ZFwiIHx8IFwiMDRuXCI6XG4gICAgICBpY29uID0gXCJpbWcvaWNvbnMvY2xvdWR5LnN2Z1wiO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFwiMDlkXCIgfHwgXCIwOW5cIjpcbiAgICAgIGljb24gPSBcImltZy9pY29ucy9yYWluLnN2Z1wiO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFwiMTBkXCIgfHwgXCIxMG5cIjpcbiAgICAgIGljb24gPSBcImltZy9pY29ucy9oZWF2eS1yYWluLnN2Z1wiO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFwiMTFkXCIgfHwgXCIxMW5cIjpcbiAgICAgIGljb24gPSBcImltZy9pY29ucy90aHVuZGVyc3Rvcm0uc3ZnXCI7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCIxM2RcIiB8fCBcIjEzblwiOlxuICAgICAgaWNvbiA9IFwiaW1nL2ljb25zL3Nub3dmbGFrZS5zdmdcIjtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBcIjUwZFwiIHx8IFwiNTBuXCI6XG4gICAgICBpY29uID0gXCJpbWcvaWNvbnMvbWlzdC5zdmdcIjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpY29uID0gXCJpbWcvaWNvbnMvbmlnaHQuc3ZnXCI7XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gaWNvbjtcbn1cblxuXG4vLyBUb2RvXG4vLyAxLiBGZXRjaCB3aGV0aGVyIGRhdGEgb24gbG9hZC4uXG4vLyAyLiBGdW5jdGlvbiB0aGF0IHdvdWxkIGRpc3BsYXkgZmV0Y2hlZCB3ZWF0aGVyIGRhdGFcbi8vICAgIC0gRmV0Y2ggd2hldGhlciBkYXRhIHdpdGggZGVmYXVsdCBjaXR5LlxuLy8gICAgLSBEaXNwbGF5IGZldGNoZWQgZGF0YSBvbiBzY3JlZW5cbi8vIDMuIFNob3cgZXJyb3IgbWVzc2FnZSBpZiBjaXR5IGlzIG5vdCBmb3VuZFxuLy8gNC4gYWRkIGRldGFpbHMgY29udGFpbmluZyBjbG91ZCBpY29ucyB0byBkYWlseSB3ZWF0aGVyIGZvcmVjYXN0XG4vLyA1LiBBZGQgZGF5IGRldGFpbHMgZm9yIGNvcnJlc3BvbmRpbmcgZGF5cy5cbi8vIDYuIENyZWF0ZSBhbiBpY29ucyBmb2xkZXJcbi8vIDcuIE1hdGNoIGljb25zIHRvIGNvcnJlc3BvbmRpbmcgaWNvbiBjb2Rlcy5cbi8vIDguIGFkZCBiYWNrZ3JvdW5kIGltYWdlLlxuLy8gOS4gQWRkIHVuaXRzIHRvIGNvcnJlc3BvbmRpbmcgdmFsdWVzIGUuZyBjZWxjdWlzLCB3aW5kc3BlZWQsIGh1bWlkaXR5IFxuLy8gMTAuIEFkZCB0cmFuc2l0aW9uIGVmZmVjdCBmb3IgZmV0Y2hlZCBkYXRhLlxuLy8gMTEuIERvIG1vYmlsZSBkZXNpZ25zIGZvciB0ZWggVUkgXG4vLyAxMi4gQWRkIGEgbG9hZGVyIHRvIHRoZSBzaXRlIGJlZm9yZSB0aGUgZmV0Y2hlZCBkYXRhIHJldHVybnMuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=