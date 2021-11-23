/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJGQUEyRixPQUFPOztBQUVsRyxrRUFBa0UsVUFBVTtBQUM1RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyw0QkFBNEI7QUFDbEUsZ0JBQWdCLG1CQUFtQixJQUFJLHNCQUFzQjtBQUM3RCxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0EsOEJBQThCLEtBQUs7QUFDbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IseUJBQXlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4QztBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isc0JBQXNCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osdUVBQXVFLFVBQVUsS0FBSyxrQkFBa0I7QUFDeEc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLDRCQUE0QjtBQUNsRSxnQkFBZ0IsbUJBQW1CLElBQUksc0JBQXNCO0FBQzdELGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQSw4QkFBOEIsS0FBSztBQUNuQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix5QkFBeUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4QztBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isc0JBQXNCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHNFQUFzRSxJQUFJLE9BQU8sSUFBSSw4Q0FBOEMsT0FBTzs7QUFFMUk7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsU0FBUztBQUN6QztBQUNBLGtDQUFrQyxhQUFhO0FBQy9DLGVBQWUsMkJBQTJCO0FBQzFDLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLENBQUs7QUFDdkI7QUFDQTs7QUFFQSxrQkFBa0IsQ0FBSztBQUN2QjtBQUNBOztBQUVBLGtCQUFrQixDQUFLO0FBQ3ZCO0FBQ0E7O0FBRUEsa0JBQWtCLENBQUs7QUFDdkI7QUFDQTs7QUFFQSxrQkFBa0IsQ0FBSztBQUN2QjtBQUNBOztBQUVBLGtCQUFrQixDQUFLO0FBQ3ZCO0FBQ0E7O0FBRUEsa0JBQWtCLENBQUs7QUFDdkI7QUFDQTs7QUFFQSxrQkFBa0IsQ0FBSztBQUN2QjtBQUNBOztBQUVBLGtCQUFrQixDQUFLO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGlzcGxheUNpdHlJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5RGV0YWlsc1wiKTtcbmNvbnN0IHNlYXJjaENpdHlEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaENpdHlcIik7XG5jb25zdCBkYWlseUZvcmVjYXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYWlseUZvcmVjYXN0XCIpO1xuY29uc3QgY2l0eU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHlOYW1lXCIpO1xuY29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hcIik7XG5sZXQgdXJsS2V5ID0gXCJmZjI5Nzc2ZDQ3ZmJhZTkwMjBjZTE3MWNhZjQyZGU1NlwiO1xubGV0IHVybEFwaWtleSA9IFwiNTI2NmYzYmRiNGVhNGJkNmJjNDIxMTQ1MjIxMTgxMVwiO1xuXG4vL2V2ZW50IGxpc3RlbmVyc1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGdldERlZmF1bHRXZWF0aGVyKTtcbnNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VhcmNoQ2l0eSk7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldERlZmF1bHRXZWF0aGVyKCkge1xuICBsZXQgdXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9ZG91YWxhJnVuaXRzPW1ldHJpYyZhcHBpZD0ke3VybEtleX1gO1xuXG4gIGxldCB1cmxBcGkgPSBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9JHt1cmxBcGlrZXl9JnE9ZG91YWxhJmRheXM9MSZhcWk9bm8mYWxlcnRzPW5vYDtcbiAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpLnRvR01UU3RyaW5nKCk7XG5cbiAgYXdhaXQgZmV0Y2godXJsQXBpKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH1cbiAgICAgIHRocm93IGNvbnNvbGUubG9nKGVycik7XG4gICAgfSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICBkaXNwbGF5Q2l0eUluZm8uaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJjaXR5LWRpdlwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2l0eS1kZXRhaWxzXCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJjaXR5LWNvbmRpdGlvblwiPiR7ZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0fTwvcD5cbiAgICAgICAgICA8aDI+JHtkYXRhLmxvY2F0aW9uLm5hbWV9LCAke2RhdGEubG9jYXRpb24uY291bnRyeX08L2gyPlxuICAgICAgICAgIDxoMT4ke2RhdGEuY3VycmVudC50ZW1wX2N9PC9oMT5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJkYXRlXCI+JHtkYXRlfTwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtZXh0cmFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1tb3JlXCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInAtZGV0YWlsc1wiPkZlZWxzIExpa2U8L3A+XG4gICAgICAgICAgICA8aDQ+JHtkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2N9PC9oND5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1tb3JlXCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInAtZGV0YWlsc1wiPldpbmQgU3BlZWQ8L3A+XG4gICAgICAgICAgICA8aDQ+JHtkYXRhLmN1cnJlbnQud2luZF9rcGh9PC9oND5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1tb3JlXCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInAtZGV0YWlsc1wiPkh1bWlkaXR5PC9wPlxuICAgICAgICAgICAgPGg0PiR7ZGF0YS5jdXJyZW50Lmh1bWlkaXR5fTwvaDQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtbW9yZVwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJwLWRldGFpbHNcIj5XaW5kIERpcmVjdGlvbjwvcD5cbiAgICAgICAgICAgIDxoND4ke2RhdGEuY3VycmVudC53aW5kX2Rpcn08L2g0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgYDtcblxuICAgICAgbGV0IGNpdHlMb25nID0gZGF0YS5sb2NhdGlvbi5sb247XG4gICAgICBsZXQgY2l0eUxhdCA9IGRhdGEubG9jYXRpb24ubGF0O1xuICAgICAgZ2V0RGFpbHlGb3JlY2FzdChjaXR5TGF0LCBjaXR5TG9uZyk7XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNlYXJjaENpdHkoKSB7XG4gIGxldCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgLy8gc2VhcmNoSW5wdXQudmFsdWUgPT09IFwiXCIgPyBhbGVydChcIkVudGVyIGEgQ2l0eVwiKSA6IHNlYXJjaElucHV0LnZhbHVlO1xuICBpZiAoc2VhcmNoSW5wdXQudmFsdWUgPT09IFwiXCIpIHtcbiAgICBzZWFyY2hCdG4ubmV4dEVsZW1lbnRTaWJsaW5nLmlubmVySFRNTCA9IGA8cCBjbGFzcz1cImVycm9yLXBvcHVwXCIgPkVudGVyIGEgQ2l0eTwvcD5gO1xuICAgIC8vIGFsZXJ0KFwiRW50ZXIgYSBDaXR5XCIpXG4gIH0gZWxzZSB7XG4gICAgbGV0IHNlYXJjaFVybCA9IGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT0ke3VybEFwaWtleX0mcT0ke3NlYXJjaElucHV0LnZhbHVlfSZkYXlzPTEmYXFpPW5vJmFsZXJ0cz1ub2A7XG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpLnRvR01UU3RyaW5nKCk7XG5cbiAgICBhd2FpdCBmZXRjaChzZWFyY2hVcmwpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgc2VhcmNoQnRuLm5leHRFbGVtZW50U2libGluZy5pbm5lckhUTUwgPSBgYDtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAwIHx8IHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJjaXR5IG5vdCBmb3VuZFwiKTtcbiAgICAgICAgICBzZWFyY2hCdG4ubmV4dEVsZW1lbnRTaWJsaW5nLmlubmVySFRNTCA9IGBcbiAgICAgICAgICA8cCBjbGFzcz1cImVycm9yLXBvcHVwXCI+Q2l0eSBub3QgZm91bmQ8L3A+YDtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgZGlzcGxheUNpdHlJbmZvLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiY2l0eS1kaXZcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpdHktZGV0YWlsc1wiPlxuICAgICAgICAgIDxwIGNsYXNzPVwiY2l0eS1jb25kaXRpb25cIj4ke2RhdGEuY3VycmVudC5jb25kaXRpb24udGV4dH08L3A+XG4gICAgICAgICAgPGgyPiR7ZGF0YS5sb2NhdGlvbi5uYW1lfSwgJHtkYXRhLmxvY2F0aW9uLmNvdW50cnl9PC9oMj5cbiAgICAgICAgICA8aDE+JHtkYXRhLmN1cnJlbnQudGVtcF9jfTwvaDE+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiZGF0ZVwiPiR7ZGF0ZX08L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLWV4dHJhXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtbW9yZVwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJwLWRldGFpbHNcIj5GZWVscyBMaWtlPC9wPlxuICAgICAgICAgICAgPGg0PiR7ZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jfTwvaDQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtbW9yZVwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJwLWRldGFpbHNcIj5XaW5kIFNwZWVkPC9wPlxuICAgICAgICAgICAgPGg0PiR7ZGF0YS5jdXJyZW50LndpbmRfa3BofTwvaDQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtbW9yZVwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJwLWRldGFpbHNcIj5IdW1pZGl0eTwvcD5cbiAgICAgICAgICAgIDxoND4ke2RhdGEuY3VycmVudC5odW1pZGl0eX08L2g0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLW1vcmVcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwicC1kZXRhaWxzXCI+V2luZCBEaXJlY3Rpb248L3A+XG4gICAgICAgICAgICA8aDQ+JHtkYXRhLmN1cnJlbnQud2luZF9kaXJ9PC9oND5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIGA7XG4gICAgICAgIGxldCBjaXR5TG9uZyA9IGRhdGEubG9jYXRpb24ubG9uO1xuICAgICAgICBsZXQgY2l0eUxhdCA9IGRhdGEubG9jYXRpb24ubGF0O1xuICAgICAgICBnZXREYWlseUZvcmVjYXN0KGNpdHlMYXQsIGNpdHlMb25nKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgc2VhcmNoSW5wdXQudmFsdWUgPSBcIlwiO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXREYWlseUZvcmVjYXN0KGxhdCwgbG9uKSB7XG4gIGxldCBkYXlVcmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L29uZWNhbGw/bGF0PSR7bGF0fSZsb249JHtsb259JmV4Y2x1ZGU9bWludXRlbHksaG91cmx5JnVuaXRzPW1ldHJpYyZhcHBpZD0ke3VybEtleX1gO1xuXG4gIGNvbnNvbGUubG9nKGRheVVybCk7XG5cbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChkYXlVcmwpO1xuICAgIGxldCBkYWlseURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc29sZS5sb2coZGFpbHlEYXRhKTtcbiAgICBsZXQgZm9yZWNhc3REYXkgPSBkYWlseURhdGEuZGFpbHk7XG4gICAgZGFpbHlGb3JlY2FzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGZvcmVjYXN0RGF5LmZvckVhY2goKGRheSwgaSkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coaSk7XG4gICAgICBsZXQgZGF5VG9kYXkgPSBzaG93RGF5KGkpO1xuICAgICAgbGV0IGljb25TcmMgPSBnZXRJY29uKGRheS53ZWF0aGVyWzBdLmljb24pO1xuICAgICAgY29uc29sZS5sb2coZGF5VG9kYXkpO1xuICAgICAgZGFpbHlGb3JlY2FzdC5pbm5lckhUTUwgKz0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbi1kZXRhaWxzXCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJ3ZWVrLWRheVwiPiR7ZGF5VG9kYXl9PC9wPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgPGg0IGNsYXNzPVwid2Vlay10ZW1wXCI+JHtkYXkudGVtcC5kYXl9PC9oND5cbiAgICAgICAgICA8cD4ke2RheS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICA8aW1nIHNyYz0ke2ljb25TcmN9IHdpZHRoPVwiNjBweFwiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvd0RheSh0aW1lc3RhbXApIHtcbiAgc3dpdGNoICh0aW1lc3RhbXApIHtcbiAgICBkZWZhdWx0OlxuICAgICAgZGF5ID0gXCJTdW5kYXlcIjtcbiAgICBjYXNlIDA6XG4gICAgICBkYXkgPSBcIlN1bmRheVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAxOlxuICAgICAgZGF5ID0gXCJNb25kYXlcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMjpcbiAgICAgIGRheSA9IFwiVHVlc2RheVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAzOlxuICAgICAgZGF5ID0gXCJXZWRuZXNkYXlcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNDpcbiAgICAgIGRheSA9IFwiVGh1cnNkYXlcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNTpcbiAgICAgIGRheSA9IFwiRnJpZGF5XCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDY6XG4gICAgICBkYXkgPSBcIlNhdHVyZGF5XCI7XG4gIH1cbiAgcmV0dXJuIGRheTtcbn1cblxuZnVuY3Rpb24gZ2V0SWNvbihjb2RlKSB7XG4gIHN3aXRjaCAoY29kZSkge1xuICAgIGNhc2UgXCIwMWRcIiB8fCBcIjAxblwiOlxuICAgICAgaWNvbiA9IFwiaW1nL2ljb25zL3N1bi5zdmdcIjtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBcIjAyZFwiIHx8IFwiMDJuXCI6XG4gICAgICBpY29uID0gXCJpbWcvaWNvbnMvc3Vubnkuc3ZnXCI7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCIwM2RcIiB8fCBcIjAzblwiOlxuICAgICAgaWNvbiA9IFwiaW1nL2ljb25zL2Nsb3VkLnN2Z1wiO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFwiMDRkXCIgfHwgXCIwNG5cIjpcbiAgICAgIGljb24gPSBcImltZy9pY29ucy9jbG91ZHkuc3ZnXCI7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCIwOWRcIiB8fCBcIjA5blwiOlxuICAgICAgaWNvbiA9IFwiaW1nL2ljb25zL3JhaW4uc3ZnXCI7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCIxMGRcIiB8fCBcIjEwblwiOlxuICAgICAgaWNvbiA9IFwiaW1nL2ljb25zL2hlYXZ5LXJhaW4uc3ZnXCI7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCIxMWRcIiB8fCBcIjExblwiOlxuICAgICAgaWNvbiA9IFwiaW1nL2ljb25zL3RodW5kZXJzdG9ybS5zdmdcIjtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBcIjEzZFwiIHx8IFwiMTNuXCI6XG4gICAgICBpY29uID0gXCJpbWcvaWNvbnMvc25vd2ZsYWtlLnN2Z1wiO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFwiNTBkXCIgfHwgXCI1MG5cIjpcbiAgICAgIGljb24gPSBcImltZy9pY29ucy9taXN0LnN2Z1wiO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGljb24gPSBcImltZy9pY29ucy9uaWdodC5zdmdcIjtcbiAgICAgIGJyZWFrO1xuICB9XG4gIHJldHVybiBpY29uO1xufVxuXG4vLyBUb2RvXG4vLyAxLiBGZXRjaCB3aGV0aGVyIGRhdGEgb24gbG9hZC4uXG4vLyAyLiBGdW5jdGlvbiB0aGF0IHdvdWxkIGRpc3BsYXkgZmV0Y2hlZCB3ZWF0aGVyIGRhdGFcbi8vICAgIC0gRmV0Y2ggd2hldGhlciBkYXRhIHdpdGggZGVmYXVsdCBjaXR5LlxuLy8gICAgLSBEaXNwbGF5IGZldGNoZWQgZGF0YSBvbiBzY3JlZW5cbi8vIDMuIFNob3cgZXJyb3IgbWVzc2FnZSBpZiBjaXR5IGlzIG5vdCBmb3VuZFxuLy8gNC4gYWRkIGRldGFpbHMgY29udGFpbmluZyBjbG91ZCBpY29ucyB0byBkYWlseSB3ZWF0aGVyIGZvcmVjYXN0XG4vLyA1LiBBZGQgZGF5IGRldGFpbHMgZm9yIGNvcnJlc3BvbmRpbmcgZGF5cy5cbi8vIDYuIENyZWF0ZSBhbiBpY29ucyBmb2xkZXJcbi8vIDcuIE1hdGNoIGljb25zIHRvIGNvcnJlc3BvbmRpbmcgaWNvbiBjb2Rlcy5cbi8vIDguIGFkZCBiYWNrZ3JvdW5kIGltYWdlLlxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9