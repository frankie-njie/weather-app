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

async function getDefaultWeather() {
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
      displayCityInfo.innerHTML = ` <div class="city-details">
        <div>
        <h2>${data.name}, ${data.sys.country}</h2>
        <h1>${data.main.temp}</h1>
        </div>
        <div>
          <p>${data.weather[0].description}</p>
          <p>${date}</p>
        </div>
        
     
        <div class="details-extra">
            <div class="details-more"><p>Feels Like</p><h4>${data.main.feels_like}</h4></div>
            <div class="details-more"><p>Wind Speed</p><h4>${data.wind.speed}</h4></div>
            <div class="details-more"><p>Humidity</p><h4>${data.main.humidity}</h4></div>
            <div class="details-more"><p>Pressure</p><h4>${data.main.pressure}</h4></div>
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
        searchBtn.nextElementSibling.innerHTML = `<h3>City is not found</h3>`;
      }
      throw console.log(err);
    })
    .then((response) => response.json())
    .then((data) => {
      displayCityInfo.innerHTML = `<div class="city-details">
          <h2>${data.name}, ${data.sys.country}</h2>
          <h1>${data.main.temp}</h1>
          <div>
          <p>${data.weather[0].description}</p>
          <p>${date}</p>
          </div>
         
          <div class="details-extra">
              <div class="details-more"><p>Feels Like</p><h4>${data.main.feels_like}</h4></div>
              <div class="details-more"><p>Wind Speed</p><h4>${data.wind.speed}</h4></div>
              <div class="details-more"><p>Humidity</p><h4>${data.main.humidity}</h4></div>
              <div class="details-more"><p>Pressure</p><h4>${data.main.pressure}</h4></div>
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
        <div class="main-details">
          <h4>${dayToday}</h4>
          <h4>${day.temp.day}</h4>
          <p>${day.weather[0].description}</p>
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

// Todo
// 1. Fetch whether data on load..
// 2. Function that would display fetched weather data
// - Fetch whether data with default city.
// - Display fetched data on screen
// 3. Show error message if city is not found
// 4. add details containing cloud icons to daily weather forecast
// 5. Add day details for corresponding days.
// 6. Create an icons folder
// 7. add background image.

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFVBQVUsSUFBSSxpQkFBaUI7QUFDN0MsY0FBYyxlQUFlO0FBQzdCO0FBQ0E7QUFDQSxlQUFlLDRCQUE0QjtBQUMzQyxlQUFlLEtBQUs7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQscUJBQXFCO0FBQ2xGLDZEQUE2RCxnQkFBZ0I7QUFDN0UsMkRBQTJELG1CQUFtQjtBQUM5RSwyREFBMkQsbUJBQW1CO0FBQzlFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUUsa0JBQWtCO0FBQ3pGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixVQUFVLElBQUksaUJBQWlCO0FBQy9DLGdCQUFnQixlQUFlO0FBQy9CO0FBQ0EsZUFBZSw0QkFBNEI7QUFDM0MsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCxxQkFBcUI7QUFDcEYsK0RBQStELGdCQUFnQjtBQUMvRSw2REFBNkQsbUJBQW1CO0FBQ2hGLDZEQUE2RCxtQkFBbUI7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0Esc0VBQXNFLElBQUksT0FBTyxJQUFJOztBQUVyRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsU0FBUztBQUN6QixnQkFBZ0IsYUFBYTtBQUM3QixlQUFlLDJCQUEyQjtBQUMxQztBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkaXNwbGF5Q2l0eUluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHlEZXRhaWxzXCIpO1xuY29uc3Qgc2VhcmNoQ2l0eURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoQ2l0eVwiKTtcbmNvbnN0IGRhaWx5Rm9yZWNhc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhaWx5Rm9yZWNhc3RcIik7XG5jb25zdCBjaXR5TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0eU5hbWVcIik7XG5jb25zdCBzZWFyY2hCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFwiKTtcblxuLy9ldmVudCBsaXN0ZW5lcnNcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBnZXREZWZhdWx0V2VhdGhlcik7XG5zZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlYXJjaENpdHkpO1xuXG5hc3luYyBmdW5jdGlvbiBnZXREZWZhdWx0V2VhdGhlcigpIHtcbiAgbGV0IHVybCA9XG4gICAgXCJodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPWRvdWFsYSZ1bml0cz1tZXRyaWMmYXBwaWQ9ZmYyOTc3NmQ0N2ZiYWU5MDIwY2UxNzFjYWY0MmRlNTZcIjtcbiAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpLnRvR01UU3RyaW5nKCk7XG5cbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH1cbiAgICAgIHRocm93IGNvbnNvbGUubG9nKGVycik7XG4gICAgfSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAvLyBsZXQgZGF0ZSA9IG5ldyBEYXRlKGRhdGEuZHQpXG4gICAgICBkaXNwbGF5Q2l0eUluZm8uaW5uZXJIVE1MID0gYCA8ZGl2IGNsYXNzPVwiY2l0eS1kZXRhaWxzXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgIDxoMj4ke2RhdGEubmFtZX0sICR7ZGF0YS5zeXMuY291bnRyeX08L2gyPlxuICAgICAgICA8aDE+JHtkYXRhLm1haW4udGVtcH08L2gxPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD4ke2RhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgPHA+JHtkYXRlfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtZXh0cmFcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLW1vcmVcIj48cD5GZWVscyBMaWtlPC9wPjxoND4ke2RhdGEubWFpbi5mZWVsc19saWtlfTwvaDQ+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1tb3JlXCI+PHA+V2luZCBTcGVlZDwvcD48aDQ+JHtkYXRhLndpbmQuc3BlZWR9PC9oND48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLW1vcmVcIj48cD5IdW1pZGl0eTwvcD48aDQ+JHtkYXRhLm1haW4uaHVtaWRpdHl9PC9oND48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLW1vcmVcIj48cD5QcmVzc3VyZTwvcD48aDQ+JHtkYXRhLm1haW4ucHJlc3N1cmV9PC9oND48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgICAgYDtcblxuICAgICAgbGV0IGNpdHlMb25nID0gZGF0YS5jb29yZC5sb247XG4gICAgICBsZXQgY2l0eUxhdCA9IGRhdGEuY29vcmQubGF0O1xuICAgICAgZ2V0RGFpbHlGb3JlY2FzdChjaXR5TGF0LCBjaXR5TG9uZyk7XG4gICAgfSk7XG5cbiAgLy8gcmVzcG9uc2UuanNvbigpXG4gIC8vIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgLy8gICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gIC8vICAgY2l0eU5hbWUuaW5uZXJIVE1MID0gcmVzcG9uc2UubmFtZVxuICAvLyB9KVxufVxuXG5hc3luYyBmdW5jdGlvbiBzZWFyY2hDaXR5KCkge1xuICBsZXQgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gIHNlYXJjaElucHV0LnZhbHVlID09PSBcIlwiID8gYWxlcnQoXCJFbnRlciBhIENpdHlcIikgOiBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgbGV0IHNlYXJjaFVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7c2VhcmNoSW5wdXQudmFsdWV9JnVuaXRzPW1ldHJpYyZhcHBpZD1mZjI5Nzc2ZDQ3ZmJhZTkwMjBjZTE3MWNhZjQyZGU1NmA7XG4gIGxldCBkYXRlID0gbmV3IERhdGUoKS50b0dNVFN0cmluZygpO1xuXG4gIGF3YWl0IGZldGNoKHNlYXJjaFVybClcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJjaXR5IG5vdCBmb3VuZFwiKTtcbiAgICAgICAgc2VhcmNoQnRuLm5leHRFbGVtZW50U2libGluZy5pbm5lckhUTUwgPSBgPGgzPkNpdHkgaXMgbm90IGZvdW5kPC9oMz5gO1xuICAgICAgfVxuICAgICAgdGhyb3cgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBkaXNwbGF5Q2l0eUluZm8uaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJjaXR5LWRldGFpbHNcIj5cbiAgICAgICAgICA8aDI+JHtkYXRhLm5hbWV9LCAke2RhdGEuc3lzLmNvdW50cnl9PC9oMj5cbiAgICAgICAgICA8aDE+JHtkYXRhLm1haW4udGVtcH08L2gxPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+JHtkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgIDxwPiR7ZGF0ZX08L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1leHRyYVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1tb3JlXCI+PHA+RmVlbHMgTGlrZTwvcD48aDQ+JHtkYXRhLm1haW4uZmVlbHNfbGlrZX08L2g0PjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1tb3JlXCI+PHA+V2luZCBTcGVlZDwvcD48aDQ+JHtkYXRhLndpbmQuc3BlZWR9PC9oND48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtbW9yZVwiPjxwPkh1bWlkaXR5PC9wPjxoND4ke2RhdGEubWFpbi5odW1pZGl0eX08L2g0PjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1tb3JlXCI+PHA+UHJlc3N1cmU8L3A+PGg0PiR7ZGF0YS5tYWluLnByZXNzdXJlfTwvaDQ+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICAgICAgbGV0IGNpdHlMb25nID0gZGF0YS5jb29yZC5sb247XG4gICAgICBsZXQgY2l0eUxhdCA9IGRhdGEuY29vcmQubGF0O1xuICAgICAgZ2V0RGFpbHlGb3JlY2FzdChjaXR5TGF0LCBjaXR5TG9uZyk7XG4gICAgfSk7XG5cbiAgc2VhcmNoSW5wdXQudmFsdWUgPSBcIlwiO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXREYWlseUZvcmVjYXN0KGxhdCwgbG9uKSB7XG4gIGxldCBkYXlVcmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L29uZWNhbGw/bGF0PSR7bGF0fSZsb249JHtsb259JmV4Y2x1ZGU9bWludXRlbHksaG91cmx5JnVuaXRzPW1ldHJpYyZhcHBpZD1mZjI5Nzc2ZDQ3ZmJhZTkwMjBjZTE3MWNhZjQyZGU1NmA7XG5cbiAgY29uc29sZS5sb2coZGF5VXJsKTtcblxuICB0cnkge1xuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGRheVVybCk7XG4gICAgbGV0IGRhaWx5RGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zb2xlLmxvZyhkYWlseURhdGEpO1xuICAgIGxldCBmb3JlY2FzdERheSA9IGRhaWx5RGF0YS5kYWlseTtcbiAgICBkYWlseUZvcmVjYXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgZm9yZWNhc3REYXkuZm9yRWFjaCgoZGF5LCBpKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhpKTtcbiAgICAgIGxldCBkYXlUb2RheSA9IHNob3dEYXkoaSk7XG4gICAgICBjb25zb2xlLmxvZyhkYXlUb2RheSk7XG4gICAgICBkYWlseUZvcmVjYXN0LmlubmVySFRNTCArPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYWluLWRldGFpbHNcIj5cbiAgICAgICAgICA8aDQ+JHtkYXlUb2RheX08L2g0PlxuICAgICAgICAgIDxoND4ke2RheS50ZW1wLmRheX08L2g0PlxuICAgICAgICAgIDxwPiR7ZGF5LndlYXRoZXJbMF0uZGVzY3JpcHRpb259PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvd0RheSh0aW1lc3RhbXApIHtcbiAgc3dpdGNoICh0aW1lc3RhbXApIHtcbiAgICBkZWZhdWx0OlxuICAgICAgZGF5ID0gXCJTdW5kYXlcIjtcbiAgICBjYXNlIDA6XG4gICAgICBkYXkgPSBcIlN1bmRheVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAxOlxuICAgICAgZGF5ID0gXCJNb25kYXlcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMjpcbiAgICAgIGRheSA9IFwiVHVlc2RheVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAzOlxuICAgICAgZGF5ID0gXCJXZWRuZXNkYXlcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNDpcbiAgICAgIGRheSA9IFwiVGh1cnNkYXlcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNTpcbiAgICAgIGRheSA9IFwiRnJpZGF5XCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDY6XG4gICAgICBkYXkgPSBcIlNhdHVyZGF5XCI7XG4gIH1cbiAgcmV0dXJuIGRheTtcbn1cblxuLy8gVG9kb1xuLy8gMS4gRmV0Y2ggd2hldGhlciBkYXRhIG9uIGxvYWQuLlxuLy8gMi4gRnVuY3Rpb24gdGhhdCB3b3VsZCBkaXNwbGF5IGZldGNoZWQgd2VhdGhlciBkYXRhXG4vLyAtIEZldGNoIHdoZXRoZXIgZGF0YSB3aXRoIGRlZmF1bHQgY2l0eS5cbi8vIC0gRGlzcGxheSBmZXRjaGVkIGRhdGEgb24gc2NyZWVuXG4vLyAzLiBTaG93IGVycm9yIG1lc3NhZ2UgaWYgY2l0eSBpcyBub3QgZm91bmRcbi8vIDQuIGFkZCBkZXRhaWxzIGNvbnRhaW5pbmcgY2xvdWQgaWNvbnMgdG8gZGFpbHkgd2VhdGhlciBmb3JlY2FzdFxuLy8gNS4gQWRkIGRheSBkZXRhaWxzIGZvciBjb3JyZXNwb25kaW5nIGRheXMuXG4vLyA2LiBDcmVhdGUgYW4gaWNvbnMgZm9sZGVyXG4vLyA3LiBhZGQgYmFja2dyb3VuZCBpbWFnZS5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==