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
      displayCityInfo.innerHTML = `<div class="city-details">
        <div>
          <p>${data.current.condition.text}</p>
          <h2>${data.location.name}, ${data.location.country}</h2>
          <h1>${data.current.temp_c}</h1>
        </div>
        <div>
          <p>${date}</p>
        </div>
        
        <div class="details-extra">
          <div class="details-more"><p>Feels Like</p><h4>${data.current.feelslike_c}</h4></div>
          <div class="details-more"><p>Wind Speed</p><h4>${data.current.wind_kph}</h4></div>
          <div class="details-more"><p>Humidity</p><h4>${data.current.humidity}</h4></div>
          <div class="details-more"><p>Wind Direction</p><h4>${data.current.wind_dir}</h4></div>
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
    searchBtn.nextElementSibling.innerHTML = `<h3>Enter a City</h3>`;
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
          searchBtn.nextElementSibling.innerHTML = `<h3>City is not found</h3>`;
        }
        throw console.log(err);
      })
      .then((response) => response.json())
      .then((data) => {
        displayCityInfo.innerHTML = `<div class="city-details">
        <div>
          <p>${data.current.condition.text}</p>
          <h2>${data.location.name}, ${data.location.country}</h2>
          <h1>${data.current.temp_c}</h1>
        </div>
        <div>
          <p>${date}</p>
        </div>
        
        <div class="details-extra">
          <div class="details-more"><p>Feels Like</p><h4>${data.current.feelslike_c}</h4></div>
          <div class="details-more"><p>Wind Speed</p><h4>${data.current.wind_kph}</h4></div>
          <div class="details-more"><p>Humidity</p><h4>${data.current.humidity}</h4></div>
          <div class="details-more"><p>Wind Direction</p><h4>${data.current.wind_dir}</h4></div>
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
  let dayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=ff29776d47fbae9020ce171caf42de56`;

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
      let iconSrc = getIcon(day.weather[0].icon)
      console.log(dayToday);
      dailyForecast.innerHTML += `
        <div class="main-details">
          <h4>${dayToday}</h4>
          <h4>${day.temp.day}</h4>
          <p>${day.weather[0].description}</p>
          <img src=${iconSrc} width="60px">
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
      icon = "img/icons/snowflakes.svg";
      break;

    case "50d" || 0:
      icon = "img/icons/mist.svg";
      break;
    default:
      icon = "img/icons/night.svg"  
      break;
  }
  return icon

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJGQUEyRixPQUFPOztBQUVsRyxrRUFBa0UsVUFBVTtBQUM1RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsNEJBQTRCO0FBQzNDLGdCQUFnQixtQkFBbUIsSUFBSSxzQkFBc0I7QUFDN0QsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCx5QkFBeUI7QUFDcEYsMkRBQTJELHNCQUFzQjtBQUNqRix5REFBeUQsc0JBQXNCO0FBQy9FLCtEQUErRCxzQkFBc0I7QUFDckY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osdUVBQXVFLFVBQVUsS0FBSyxrQkFBa0I7QUFDeEc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsNEJBQTRCO0FBQzNDLGdCQUFnQixtQkFBbUIsSUFBSSxzQkFBc0I7QUFDN0QsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCx5QkFBeUI7QUFDcEYsMkRBQTJELHNCQUFzQjtBQUNqRix5REFBeUQsc0JBQXNCO0FBQy9FLCtEQUErRCxzQkFBc0I7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzRUFBc0UsSUFBSSxPQUFPLElBQUk7O0FBRXJGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFNBQVM7QUFDekIsZ0JBQWdCLGFBQWE7QUFDN0IsZUFBZSwyQkFBMkI7QUFDMUMscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLENBQUs7QUFDdkI7QUFDQTs7QUFFQSxrQkFBa0IsQ0FBSztBQUN2QjtBQUNBOztBQUVBLGtCQUFrQixDQUFLO0FBQ3ZCO0FBQ0E7O0FBRUEsa0JBQWtCLENBQUs7QUFDdkI7QUFDQTs7QUFFQSxrQkFBa0IsQ0FBSztBQUN2QjtBQUNBOztBQUVBLGtCQUFrQixDQUFLO0FBQ3ZCO0FBQ0E7O0FBRUEsa0JBQWtCLENBQUs7QUFDdkI7QUFDQTs7QUFFQSxrQkFBa0IsQ0FBSztBQUN2QjtBQUNBOztBQUVBLGtCQUFrQixDQUFLO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRpc3BsYXlDaXR5SW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0eURldGFpbHNcIik7XG5jb25zdCBzZWFyY2hDaXR5RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hDaXR5XCIpO1xuY29uc3QgZGFpbHlGb3JlY2FzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFpbHlGb3JlY2FzdFwiKTtcbmNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5TmFtZVwiKTtcbmNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoXCIpO1xubGV0IHVybEtleSA9IFwiZmYyOTc3NmQ0N2ZiYWU5MDIwY2UxNzFjYWY0MmRlNTZcIjtcbmxldCB1cmxBcGlrZXkgPSBcIjUyNjZmM2JkYjRlYTRiZDZiYzQyMTE0NTIyMTE4MTFcIjtcblxuLy9ldmVudCBsaXN0ZW5lcnNcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBnZXREZWZhdWx0V2VhdGhlcik7XG5zZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlYXJjaENpdHkpO1xuXG5hc3luYyBmdW5jdGlvbiBnZXREZWZhdWx0V2VhdGhlcigpIHtcbiAgbGV0IHVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPWRvdWFsYSZ1bml0cz1tZXRyaWMmYXBwaWQ9JHt1cmxLZXl9YDtcblxuICBsZXQgdXJsQXBpID0gYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PSR7dXJsQXBpa2V5fSZxPWRvdWFsYSZkYXlzPTEmYXFpPW5vJmFsZXJ0cz1ub2A7XG4gIGxldCBkYXRlID0gbmV3IERhdGUoKS50b0dNVFN0cmluZygpO1xuXG4gIGF3YWl0IGZldGNoKHVybEFwaSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9XG4gICAgICB0aHJvdyBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgZGlzcGxheUNpdHlJbmZvLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiY2l0eS1kZXRhaWxzXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+JHtkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHR9PC9wPlxuICAgICAgICAgIDxoMj4ke2RhdGEubG9jYXRpb24ubmFtZX0sICR7ZGF0YS5sb2NhdGlvbi5jb3VudHJ5fTwvaDI+XG4gICAgICAgICAgPGgxPiR7ZGF0YS5jdXJyZW50LnRlbXBfY308L2gxPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD4ke2RhdGV9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLWV4dHJhXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtbW9yZVwiPjxwPkZlZWxzIExpa2U8L3A+PGg0PiR7ZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jfTwvaDQ+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtbW9yZVwiPjxwPldpbmQgU3BlZWQ8L3A+PGg0PiR7ZGF0YS5jdXJyZW50LndpbmRfa3BofTwvaDQ+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtbW9yZVwiPjxwPkh1bWlkaXR5PC9wPjxoND4ke2RhdGEuY3VycmVudC5odW1pZGl0eX08L2g0PjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLW1vcmVcIj48cD5XaW5kIERpcmVjdGlvbjwvcD48aDQ+JHtkYXRhLmN1cnJlbnQud2luZF9kaXJ9PC9oND48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIGA7XG5cbiAgICAgIGxldCBjaXR5TG9uZyA9IGRhdGEubG9jYXRpb24ubG9uO1xuICAgICAgbGV0IGNpdHlMYXQgPSBkYXRhLmxvY2F0aW9uLmxhdDtcbiAgICAgIGdldERhaWx5Rm9yZWNhc3QoY2l0eUxhdCwgY2l0eUxvbmcpO1xuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZWFyY2hDaXR5KCkge1xuICBsZXQgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gIC8vIHNlYXJjaElucHV0LnZhbHVlID09PSBcIlwiID8gYWxlcnQoXCJFbnRlciBhIENpdHlcIikgOiBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgaWYgKHNlYXJjaElucHV0LnZhbHVlID09PSBcIlwiKSB7XG4gICAgc2VhcmNoQnRuLm5leHRFbGVtZW50U2libGluZy5pbm5lckhUTUwgPSBgPGgzPkVudGVyIGEgQ2l0eTwvaDM+YDtcbiAgICAvLyBhbGVydChcIkVudGVyIGEgQ2l0eVwiKVxuICB9IGVsc2Uge1xuICAgIGxldCBzZWFyY2hVcmwgPSBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9JHt1cmxBcGlrZXl9JnE9JHtzZWFyY2hJbnB1dC52YWx1ZX0mZGF5cz0xJmFxaT1ubyZhbGVydHM9bm9gO1xuICAgIGxldCBkYXRlID0gbmV3IERhdGUoKS50b0dNVFN0cmluZygpO1xuXG4gICAgYXdhaXQgZmV0Y2goc2VhcmNoVXJsKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgIHNlYXJjaEJ0bi5uZXh0RWxlbWVudFNpYmxpbmcuaW5uZXJIVE1MID0gYGA7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMCB8fCByZXNwb25zZS5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2l0eSBub3QgZm91bmRcIik7XG4gICAgICAgICAgc2VhcmNoQnRuLm5leHRFbGVtZW50U2libGluZy5pbm5lckhUTUwgPSBgPGgzPkNpdHkgaXMgbm90IGZvdW5kPC9oMz5gO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBkaXNwbGF5Q2l0eUluZm8uaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJjaXR5LWRldGFpbHNcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD4ke2RhdGEuY3VycmVudC5jb25kaXRpb24udGV4dH08L3A+XG4gICAgICAgICAgPGgyPiR7ZGF0YS5sb2NhdGlvbi5uYW1lfSwgJHtkYXRhLmxvY2F0aW9uLmNvdW50cnl9PC9oMj5cbiAgICAgICAgICA8aDE+JHtkYXRhLmN1cnJlbnQudGVtcF9jfTwvaDE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxwPiR7ZGF0ZX08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtZXh0cmFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1tb3JlXCI+PHA+RmVlbHMgTGlrZTwvcD48aDQ+JHtkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2N9PC9oND48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1tb3JlXCI+PHA+V2luZCBTcGVlZDwvcD48aDQ+JHtkYXRhLmN1cnJlbnQud2luZF9rcGh9PC9oND48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1tb3JlXCI+PHA+SHVtaWRpdHk8L3A+PGg0PiR7ZGF0YS5jdXJyZW50Lmh1bWlkaXR5fTwvaDQ+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtbW9yZVwiPjxwPldpbmQgRGlyZWN0aW9uPC9wPjxoND4ke2RhdGEuY3VycmVudC53aW5kX2Rpcn08L2g0PjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgYDtcbiAgICAgICAgbGV0IGNpdHlMb25nID0gZGF0YS5sb2NhdGlvbi5sb247XG4gICAgICAgIGxldCBjaXR5TGF0ID0gZGF0YS5sb2NhdGlvbi5sYXQ7XG4gICAgICAgIGdldERhaWx5Rm9yZWNhc3QoY2l0eUxhdCwgY2l0eUxvbmcpO1xuICAgICAgfSk7XG4gIH1cblxuICBzZWFyY2hJbnB1dC52YWx1ZSA9IFwiXCI7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldERhaWx5Rm9yZWNhc3QobGF0LCBsb24pIHtcbiAgbGV0IGRheVVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mZXhjbHVkZT1taW51dGVseSxob3VybHkmdW5pdHM9bWV0cmljJmFwcGlkPWZmMjk3NzZkNDdmYmFlOTAyMGNlMTcxY2FmNDJkZTU2YDtcblxuICBjb25zb2xlLmxvZyhkYXlVcmwpO1xuXG4gIHRyeSB7XG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZGF5VXJsKTtcbiAgICBsZXQgZGFpbHlEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnNvbGUubG9nKGRhaWx5RGF0YSk7XG4gICAgbGV0IGZvcmVjYXN0RGF5ID0gZGFpbHlEYXRhLmRhaWx5O1xuICAgIGRhaWx5Rm9yZWNhc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBmb3JlY2FzdERheS5mb3JFYWNoKChkYXksIGkpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGkpO1xuICAgICAgbGV0IGRheVRvZGF5ID0gc2hvd0RheShpKTtcbiAgICAgIGxldCBpY29uU3JjID0gZ2V0SWNvbihkYXkud2VhdGhlclswXS5pY29uKVxuICAgICAgY29uc29sZS5sb2coZGF5VG9kYXkpO1xuICAgICAgZGFpbHlGb3JlY2FzdC5pbm5lckhUTUwgKz0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbi1kZXRhaWxzXCI+XG4gICAgICAgICAgPGg0PiR7ZGF5VG9kYXl9PC9oND5cbiAgICAgICAgICA8aDQ+JHtkYXkudGVtcC5kYXl9PC9oND5cbiAgICAgICAgICA8cD4ke2RheS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICA8aW1nIHNyYz0ke2ljb25TcmN9IHdpZHRoPVwiNjBweFwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvd0RheSh0aW1lc3RhbXApIHtcbiAgc3dpdGNoICh0aW1lc3RhbXApIHtcbiAgICBkZWZhdWx0OlxuICAgICAgZGF5ID0gXCJTdW5kYXlcIjtcbiAgICBjYXNlIDA6XG4gICAgICBkYXkgPSBcIlN1bmRheVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAxOlxuICAgICAgZGF5ID0gXCJNb25kYXlcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMjpcbiAgICAgIGRheSA9IFwiVHVlc2RheVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAzOlxuICAgICAgZGF5ID0gXCJXZWRuZXNkYXlcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNDpcbiAgICAgIGRheSA9IFwiVGh1cnNkYXlcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNTpcbiAgICAgIGRheSA9IFwiRnJpZGF5XCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDY6XG4gICAgICBkYXkgPSBcIlNhdHVyZGF5XCI7XG4gIH1cbiAgcmV0dXJuIGRheTtcbn1cblxuZnVuY3Rpb24gZ2V0SWNvbihjb2RlKSB7XG4gIHN3aXRjaCAoY29kZSkge1xuICAgIGNhc2UgXCIwMWRcIiB8fCBcIjAxblwiOlxuICAgICAgaWNvbiA9IFwiaW1nL2ljb25zL3N1bi5zdmdcIjtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBcIjAyZFwiIHx8IFwiMDJuXCI6XG4gICAgICBpY29uID0gXCJpbWcvaWNvbnMvc3Vubnkuc3ZnXCI7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCIwM2RcIiB8fCBcIjAzblwiOlxuICAgICAgaWNvbiA9IFwiaW1nL2ljb25zL2Nsb3VkLnN2Z1wiO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFwiMDRkXCIgfHwgXCIwNG5cIjpcbiAgICAgIGljb24gPSBcImltZy9pY29ucy9jbG91ZHkuc3ZnXCI7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCIwOWRcIiB8fCBcIjA5blwiOlxuICAgICAgaWNvbiA9IFwiaW1nL2ljb25zL3JhaW4uc3ZnXCI7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCIxMGRcIiB8fCBcIjEwblwiOlxuICAgICAgaWNvbiA9IFwiaW1nL2ljb25zL2hlYXZ5LXJhaW4uc3ZnXCI7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCIxMWRcIiB8fCBcIjExblwiOlxuICAgICAgaWNvbiA9IFwiaW1nL2ljb25zL3RodW5kZXJzdG9ybS5zdmdcIjtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBcIjEzZFwiIHx8IFwiMTNuXCI6XG4gICAgICBpY29uID0gXCJpbWcvaWNvbnMvc25vd2ZsYWtlcy5zdmdcIjtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBcIjUwZFwiIHx8IFwiNTBuXCI6XG4gICAgICBpY29uID0gXCJpbWcvaWNvbnMvbWlzdC5zdmdcIjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpY29uID0gXCJpbWcvaWNvbnMvbmlnaHQuc3ZnXCIgIFxuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIGljb25cblxufVxuXG4vLyBUb2RvXG4vLyAxLiBGZXRjaCB3aGV0aGVyIGRhdGEgb24gbG9hZC4uXG4vLyAyLiBGdW5jdGlvbiB0aGF0IHdvdWxkIGRpc3BsYXkgZmV0Y2hlZCB3ZWF0aGVyIGRhdGFcbi8vICAgIC0gRmV0Y2ggd2hldGhlciBkYXRhIHdpdGggZGVmYXVsdCBjaXR5LlxuLy8gICAgLSBEaXNwbGF5IGZldGNoZWQgZGF0YSBvbiBzY3JlZW5cbi8vIDMuIFNob3cgZXJyb3IgbWVzc2FnZSBpZiBjaXR5IGlzIG5vdCBmb3VuZFxuLy8gNC4gYWRkIGRldGFpbHMgY29udGFpbmluZyBjbG91ZCBpY29ucyB0byBkYWlseSB3ZWF0aGVyIGZvcmVjYXN0XG4vLyA1LiBBZGQgZGF5IGRldGFpbHMgZm9yIGNvcnJlc3BvbmRpbmcgZGF5cy5cbi8vIDYuIENyZWF0ZSBhbiBpY29ucyBmb2xkZXJcbi8vIDcuIE1hdGNoIGljb25zIHRvIGNvcnJlc3BvbmRpbmcgaWNvbiBjb2Rlcy5cbi8vIDguIGFkZCBiYWNrZ3JvdW5kIGltYWdlLlxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9