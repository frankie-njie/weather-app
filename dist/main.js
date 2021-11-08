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

//event listeners
window.addEventListener("load", getDefaultWeather);
searchBtn.addEventListener("click", searchCity);

async function getDefaultWeather(location) {
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=douala&units=metric&appid=ff29776d47fbae9020ce171caf42de56";
  let date = new Date().toGMTString();

  let response = await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw console.log(err);
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // let date = new Date(data.dt)
      displayCityInfo.innerHTML = ` <div>
        <h2>${data.name}, ${data.sys.country}</h2>
        <h1>${data.main.temp}</h1>
        <div>
          <p>${data.weather[0].description}</p>
        </div>
        <p>${date}</p>
        <div>
        <div>
            <p>Feels Like</p><h4>${data.main.feels_like}</h4>
            <p>Wind Speed</p><h4>${data.wind.speed}</h4>
            <p>Humidity</p><h4>${data.main.humidity}</h4>
            <p>Pressure</p><h4>${data.main.pressure}</h4>
        </div>

      </div>
      `;

      let cityLong = data.coord.lon;
      let cityLat = data.coord.lat;
      getDailyForecast(cityLat, cityLong);
    });

  // response.json()
  // .then(response => {
  //   console.log(response);
  //   cityName.innerHTML = response.name
  // })
}

async function searchCity() {
  let searchInput = document.querySelector("input");
  searchInput.value === "" ? alert("Enter a City") : searchInput.value;
  let searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=ff29776d47fbae9020ce171caf42de56`;
  let date = new Date().toGMTString();

  await fetch(searchUrl)
    .then((response) => {
      if (response.ok) {
        return response;
      } 
      if (response.status === 404) {
        console.log("city not found");
        searchBtn.nextElementSibling.innerHTML = `<h3>City is not found</h3>`
      }
      throw console.log(err);
    })
    .then((response) => response.json())
    .then((data) => {
      displayCityInfo.innerHTML = `<div>
          <h2>${data.name}, ${data.sys.country}</h2>
          <h1>${data.main.temp}</h1>
          <div>
          <p>${data.weather[0].description}</p>
          </div>
          <p>${date}</p>
          <div>
            <p>Feels Like</p><h4>${data.main.feels_like}</h4>
            <p>Wind Speed</p><h4>${data.wind.speed}</h4>
            <p>Humidity</p><h4>${data.main.humidity}</h4>
            <p>Pressure</p><h4>${data.main.pressure}</h4>
        </div>
      </div>
    `;
      let cityLong = data.coord.lon;
      let cityLat = data.coord.lat;
      getDailyForecast(cityLat, cityLong);
    });

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
      console.log(i);
      let dayToday = showDay(i);
      console.log(dayToday);
      dailyForecast.innerHTML += `
        <div>
          <h4>${dayToday}</h4>
          <h4>${day.temp.day}</h4>
          <p>${day.weather[0].description}</p>
        </div>
        `

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

// Todo
// 1. Fetch whether data on load..
// 2. Function that would display fetched weather data
// - Fetch whether data with default city.
// - Display fetched data on screen
// 3. Show error message is wrong city is not found
// 4. add details containing cloud icons to daily weather forecast
// 5. Add day details for corresponding days.
// 6. Create an icons folder
// 7. add background image.

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxVQUFVLElBQUksaUJBQWlCO0FBQzdDLGNBQWMsZUFBZTtBQUM3QjtBQUNBLGVBQWUsNEJBQTRCO0FBQzNDO0FBQ0EsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQSxtQ0FBbUMscUJBQXFCO0FBQ3hELG1DQUFtQyxnQkFBZ0I7QUFDbkQsaUNBQWlDLG1CQUFtQjtBQUNwRCxpQ0FBaUMsbUJBQW1CO0FBQ3BEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUUsa0JBQWtCO0FBQ3pGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixVQUFVLElBQUksaUJBQWlCO0FBQy9DLGdCQUFnQixlQUFlO0FBQy9CO0FBQ0EsZUFBZSw0QkFBNEI7QUFDM0M7QUFDQSxlQUFlLEtBQUs7QUFDcEI7QUFDQSxtQ0FBbUMscUJBQXFCO0FBQ3hELG1DQUFtQyxnQkFBZ0I7QUFDbkQsaUNBQWlDLG1CQUFtQjtBQUNwRCxpQ0FBaUMsbUJBQW1CO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBLHNFQUFzRSxJQUFJLE9BQU8sSUFBSTs7QUFFckY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFNBQVM7QUFDekIsZ0JBQWdCLGFBQWE7QUFDN0IsZUFBZSwyQkFBMkI7QUFDMUM7QUFDQTs7QUFFQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRpc3BsYXlDaXR5SW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0eURldGFpbHNcIik7XG5jb25zdCBzZWFyY2hDaXR5RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hDaXR5XCIpO1xuY29uc3QgZGFpbHlGb3JlY2FzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFpbHlGb3JlY2FzdFwiKTtcbmNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5TmFtZVwiKTtcbmNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoXCIpO1xuXG4vL2V2ZW50IGxpc3RlbmVyc1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGdldERlZmF1bHRXZWF0aGVyKTtcbnNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VhcmNoQ2l0eSk7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldERlZmF1bHRXZWF0aGVyKGxvY2F0aW9uKSB7XG4gIGxldCB1cmwgPVxuICAgIFwiaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT1kb3VhbGEmdW5pdHM9bWV0cmljJmFwcGlkPWZmMjk3NzZkNDdmYmFlOTAyMGNlMTcxY2FmNDJkZTU2XCI7XG4gIGxldCBkYXRlID0gbmV3IERhdGUoKS50b0dNVFN0cmluZygpO1xuXG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybClcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9XG4gICAgICB0aHJvdyBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgLy8gbGV0IGRhdGUgPSBuZXcgRGF0ZShkYXRhLmR0KVxuICAgICAgZGlzcGxheUNpdHlJbmZvLmlubmVySFRNTCA9IGAgPGRpdj5cbiAgICAgICAgPGgyPiR7ZGF0YS5uYW1lfSwgJHtkYXRhLnN5cy5jb3VudHJ5fTwvaDI+XG4gICAgICAgIDxoMT4ke2RhdGEubWFpbi50ZW1wfTwvaDE+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+JHtkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb259PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHA+JHtkYXRlfTwvcD5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxwPkZlZWxzIExpa2U8L3A+PGg0PiR7ZGF0YS5tYWluLmZlZWxzX2xpa2V9PC9oND5cbiAgICAgICAgICAgIDxwPldpbmQgU3BlZWQ8L3A+PGg0PiR7ZGF0YS53aW5kLnNwZWVkfTwvaDQ+XG4gICAgICAgICAgICA8cD5IdW1pZGl0eTwvcD48aDQ+JHtkYXRhLm1haW4uaHVtaWRpdHl9PC9oND5cbiAgICAgICAgICAgIDxwPlByZXNzdXJlPC9wPjxoND4ke2RhdGEubWFpbi5wcmVzc3VyZX08L2g0PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG4gICAgICBgO1xuXG4gICAgICBsZXQgY2l0eUxvbmcgPSBkYXRhLmNvb3JkLmxvbjtcbiAgICAgIGxldCBjaXR5TGF0ID0gZGF0YS5jb29yZC5sYXQ7XG4gICAgICBnZXREYWlseUZvcmVjYXN0KGNpdHlMYXQsIGNpdHlMb25nKTtcbiAgICB9KTtcblxuICAvLyByZXNwb25zZS5qc29uKClcbiAgLy8gLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAvLyAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgLy8gICBjaXR5TmFtZS5pbm5lckhUTUwgPSByZXNwb25zZS5uYW1lXG4gIC8vIH0pXG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNlYXJjaENpdHkoKSB7XG4gIGxldCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgc2VhcmNoSW5wdXQudmFsdWUgPT09IFwiXCIgPyBhbGVydChcIkVudGVyIGEgQ2l0eVwiKSA6IHNlYXJjaElucHV0LnZhbHVlO1xuICBsZXQgc2VhcmNoVXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtzZWFyY2hJbnB1dC52YWx1ZX0mdW5pdHM9bWV0cmljJmFwcGlkPWZmMjk3NzZkNDdmYmFlOTAyMGNlMTcxY2FmNDJkZTU2YDtcbiAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpLnRvR01UU3RyaW5nKCk7XG5cbiAgYXdhaXQgZmV0Y2goc2VhcmNoVXJsKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH0gXG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJjaXR5IG5vdCBmb3VuZFwiKTtcbiAgICAgICAgc2VhcmNoQnRuLm5leHRFbGVtZW50U2libGluZy5pbm5lckhUTUwgPSBgPGgzPkNpdHkgaXMgbm90IGZvdW5kPC9oMz5gXG4gICAgICB9XG4gICAgICB0aHJvdyBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGRpc3BsYXlDaXR5SW5mby5pbm5lckhUTUwgPSBgPGRpdj5cbiAgICAgICAgICA8aDI+JHtkYXRhLm5hbWV9LCAke2RhdGEuc3lzLmNvdW50cnl9PC9oMj5cbiAgICAgICAgICA8aDE+JHtkYXRhLm1haW4udGVtcH08L2gxPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+JHtkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxwPiR7ZGF0ZX08L3A+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxwPkZlZWxzIExpa2U8L3A+PGg0PiR7ZGF0YS5tYWluLmZlZWxzX2xpa2V9PC9oND5cbiAgICAgICAgICAgIDxwPldpbmQgU3BlZWQ8L3A+PGg0PiR7ZGF0YS53aW5kLnNwZWVkfTwvaDQ+XG4gICAgICAgICAgICA8cD5IdW1pZGl0eTwvcD48aDQ+JHtkYXRhLm1haW4uaHVtaWRpdHl9PC9oND5cbiAgICAgICAgICAgIDxwPlByZXNzdXJlPC9wPjxoND4ke2RhdGEubWFpbi5wcmVzc3VyZX08L2g0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgICBsZXQgY2l0eUxvbmcgPSBkYXRhLmNvb3JkLmxvbjtcbiAgICAgIGxldCBjaXR5TGF0ID0gZGF0YS5jb29yZC5sYXQ7XG4gICAgICBnZXREYWlseUZvcmVjYXN0KGNpdHlMYXQsIGNpdHlMb25nKTtcbiAgICB9KTtcblxuICBzZWFyY2hJbnB1dC52YWx1ZSA9IFwiXCI7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldERhaWx5Rm9yZWNhc3QobGF0LCBsb24pIHtcbiAgbGV0IGRheVVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mZXhjbHVkZT1taW51dGVseSxob3VybHkmdW5pdHM9bWV0cmljJmFwcGlkPWZmMjk3NzZkNDdmYmFlOTAyMGNlMTcxY2FmNDJkZTU2YDtcblxuICBjb25zb2xlLmxvZyhkYXlVcmwpO1xuXG4gIHRyeSB7XG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZGF5VXJsKTtcbiAgICBsZXQgZGFpbHlEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnNvbGUubG9nKGRhaWx5RGF0YSk7XG4gICAgbGV0IGZvcmVjYXN0RGF5ID0gZGFpbHlEYXRhLmRhaWx5O1xuICAgIGRhaWx5Rm9yZWNhc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBmb3JlY2FzdERheS5mb3JFYWNoKChkYXksIGkpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGkpO1xuICAgICAgbGV0IGRheVRvZGF5ID0gc2hvd0RheShpKTtcbiAgICAgIGNvbnNvbGUubG9nKGRheVRvZGF5KTtcbiAgICAgIGRhaWx5Rm9yZWNhc3QuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDQ+JHtkYXlUb2RheX08L2g0PlxuICAgICAgICAgIDxoND4ke2RheS50ZW1wLmRheX08L2g0PlxuICAgICAgICAgIDxwPiR7ZGF5LndlYXRoZXJbMF0uZGVzY3JpcHRpb259PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNob3dEYXkodGltZXN0YW1wKSB7XG4gIHN3aXRjaCAodGltZXN0YW1wKSB7XG4gICAgZGVmYXVsdDpcbiAgICAgIGRheSA9IFwiU3VuZGF5XCI7XG4gICAgY2FzZSAwOlxuICAgICAgZGF5ID0gXCJTdW5kYXlcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMTpcbiAgICAgIGRheSA9IFwiTW9uZGF5XCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICBkYXkgPSBcIlR1ZXNkYXlcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzpcbiAgICAgIGRheSA9IFwiV2VkbmVzZGF5XCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDQ6XG4gICAgICBkYXkgPSBcIlRodXJzZGF5XCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDU6XG4gICAgICBkYXkgPSBcIkZyaWRheVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA2OlxuICAgICAgZGF5ID0gXCJTYXR1cmRheVwiO1xuICB9XG4gIHJldHVybiBkYXk7XG59XG5cbi8vIFRvZG9cbi8vIDEuIEZldGNoIHdoZXRoZXIgZGF0YSBvbiBsb2FkLi5cbi8vIDIuIEZ1bmN0aW9uIHRoYXQgd291bGQgZGlzcGxheSBmZXRjaGVkIHdlYXRoZXIgZGF0YVxuLy8gLSBGZXRjaCB3aGV0aGVyIGRhdGEgd2l0aCBkZWZhdWx0IGNpdHkuXG4vLyAtIERpc3BsYXkgZmV0Y2hlZCBkYXRhIG9uIHNjcmVlblxuLy8gMy4gU2hvdyBlcnJvciBtZXNzYWdlIGlzIHdyb25nIGNpdHkgaXMgbm90IGZvdW5kXG4vLyA0LiBhZGQgZGV0YWlscyBjb250YWluaW5nIGNsb3VkIGljb25zIHRvIGRhaWx5IHdlYXRoZXIgZm9yZWNhc3Rcbi8vIDUuIEFkZCBkYXkgZGV0YWlscyBmb3IgY29ycmVzcG9uZGluZyBkYXlzLlxuLy8gNi4gQ3JlYXRlIGFuIGljb25zIGZvbGRlclxuLy8gNy4gYWRkIGJhY2tncm91bmQgaW1hZ2UuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=