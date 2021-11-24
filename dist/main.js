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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkaXNwbGF5Q2l0eUluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHlEZXRhaWxzXCIpO1xuY29uc3Qgc2VhcmNoQ2l0eURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoQ2l0eVwiKTtcbmNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dFwiKVxuY29uc3QgZGFpbHlGb3JlY2FzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFpbHlGb3JlY2FzdFwiKTtcbmNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5TmFtZVwiKTtcbmNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoXCIpO1xubGV0IHVybEtleSA9IFwiZmYyOTc3NmQ0N2ZiYWU5MDIwY2UxNzFjYWY0MmRlNTZcIjtcbmxldCB1cmxBcGlrZXkgPSBcIjUyNjZmM2JkYjRlYTRiZDZiYzQyMTE0NTIyMTE4MTFcIjtcbmxldCB0ZW1wVW5pdCA9ICfCsEMnXG4vL2V2ZW50IGxpc3RlbmVyc1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGdldERlZmF1bHRXZWF0aGVyKTtcbnNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VhcmNoQ2l0eSk7XG5pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgKGUpPT57XG4gIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgIC8vIENhbmNlbCB0aGUgZGVmYXVsdCBhY3Rpb24sIGlmIG5lZWRlZFxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyBUcmlnZ2VyIHRoZSBidXR0b24gZWxlbWVudCB3aXRoIGEgY2xpY2tcbiAgICBzZWFyY2hDaXR5KCk7XG4gIH1cbn0pXG5cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RGVmYXVsdFdlYXRoZXIoKSB7XG4gIGxldCB1cmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT1kb3VhbGEmdW5pdHM9bWV0cmljJmFwcGlkPSR7dXJsS2V5fWA7XG5cbiAgbGV0IHVybEFwaSA9IGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT0ke3VybEFwaWtleX0mcT1kb3VhbGEmZGF5cz0xJmFxaT1ubyZhbGVydHM9bm9gO1xuICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCkudG9HTVRTdHJpbmcoKTtcblxuICBhd2FpdCBmZXRjaCh1cmxBcGkpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfVxuICAgICAgdGhyb3cgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIGRpc3BsYXlDaXR5SW5mby5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImNpdHktZGl2IGZhZGUtaW5cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpdHktZGV0YWlsc1wiPlxuICAgICAgICAgIDxwIGNsYXNzPVwiY2l0eS1jb25kaXRpb25cIj4ke2RhdGEuY3VycmVudC5jb25kaXRpb24udGV4dH08L3A+XG4gICAgICAgICAgPGgyPiR7ZGF0YS5sb2NhdGlvbi5uYW1lfSwgJHtkYXRhLmxvY2F0aW9uLmNvdW50cnl9PC9oMj5cbiAgICAgICAgICA8aDE+JHtkYXRhLmN1cnJlbnQudGVtcF9jfSA8c3VwPiR7dGVtcFVuaXR9PC9zdXA+PC9oMT5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJkYXRlXCI+JHtkYXRlfTwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtZXh0cmFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1tb3JlXCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInAtZGV0YWlsc1wiPkZlZWxzIExpa2U8L3A+XG4gICAgICAgICAgICA8aDQ+JHtkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2N9ICR7dGVtcFVuaXR9PC9oND5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1tb3JlXCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInAtZGV0YWlsc1wiPldpbmQgU3BlZWQ8L3A+XG4gICAgICAgICAgICA8aDQ+JHtkYXRhLmN1cnJlbnQud2luZF9rcGh9IEttL2g8L2g0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLW1vcmVcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwicC1kZXRhaWxzXCI+SHVtaWRpdHk8L3A+XG4gICAgICAgICAgICA8aDQ+JHtkYXRhLmN1cnJlbnQuaHVtaWRpdHl9ICU8L2g0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLW1vcmVcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwicC1kZXRhaWxzXCI+V2luZCBEaXJlY3Rpb248L3A+XG4gICAgICAgICAgICA8aDQ+JHtkYXRhLmN1cnJlbnQud2luZF9kaXJ9PC9oND5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIGA7XG5cbiAgICAgIGxldCBjaXR5TG9uZyA9IGRhdGEubG9jYXRpb24ubG9uO1xuICAgICAgbGV0IGNpdHlMYXQgPSBkYXRhLmxvY2F0aW9uLmxhdDtcbiAgICAgIGdldERhaWx5Rm9yZWNhc3QoY2l0eUxhdCwgY2l0eUxvbmcpO1xuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZWFyY2hDaXR5KCkge1xuICBsZXQgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gIC8vIHNlYXJjaElucHV0LnZhbHVlID09PSBcIlwiID8gYWxlcnQoXCJFbnRlciBhIENpdHlcIikgOiBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgaWYgKHNlYXJjaElucHV0LnZhbHVlID09PSBcIlwiKSB7XG4gICAgc2VhcmNoQnRuLm5leHRFbGVtZW50U2libGluZy5pbm5lckhUTUwgPSBgPHAgY2xhc3M9XCJlcnJvci1wb3B1cFwiID5FbnRlciBhIENpdHk8L3A+YDtcblxuICB9IGVsc2Uge1xuICAgIGxldCBzZWFyY2hVcmwgPSBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9JHt1cmxBcGlrZXl9JnE9JHtzZWFyY2hJbnB1dC52YWx1ZX0mZGF5cz0xJmFxaT1ubyZhbGVydHM9bm9gO1xuICAgIGxldCBkYXRlID0gbmV3IERhdGUoKS50b0dNVFN0cmluZygpO1xuXG4gICAgYXdhaXQgZmV0Y2goc2VhcmNoVXJsKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgIHNlYXJjaEJ0bi5uZXh0RWxlbWVudFNpYmxpbmcuaW5uZXJIVE1MID0gYGA7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMCB8fCByZXNwb25zZS5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2l0eSBub3QgZm91bmRcIik7XG4gICAgICAgICAgc2VhcmNoQnRuLm5leHRFbGVtZW50U2libGluZy5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgPHAgY2xhc3M9XCJlcnJvci1wb3B1cFwiPkNpdHkgbm90IGZvdW5kPC9wPmA7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGxldCBjb3VudHJ5SW5mbyA9IGRhdGEubG9jYXRpb24uY291bnRyeVxuICAgICAgICBpZiAoY291bnRyeUluZm8gPT09ICdVbml0ZWQgU3RhdGVzIG9mIEFtZXJpY2EnKSB7XG4gICAgICAgICAgY291bnRyeUluZm8gPSBkYXRhLmxvY2F0aW9uLnJlZ2lvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb3VudHJ5SW5mbyA9IGRhdGEubG9jYXRpb24uY291bnRyeVxuICAgICAgICB9XG4gICAgICAgIGRpc3BsYXlDaXR5SW5mby5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImNpdHktZGl2IGZhZGUtaW5cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpdHktZGV0YWlsc1wiPlxuICAgICAgICAgIDxwIGNsYXNzPVwiY2l0eS1jb25kaXRpb25cIj4ke2RhdGEuY3VycmVudC5jb25kaXRpb24udGV4dH08L3A+XG4gICAgICAgICAgPGgyPiR7ZGF0YS5sb2NhdGlvbi5uYW1lfSwgJHtjb3VudHJ5SW5mb308L2gyPlxuICAgICAgICAgIDxoMT4ke2RhdGEuY3VycmVudC50ZW1wX2N9IDxzdXA+JHt0ZW1wVW5pdH08L3N1cD48L2gxPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImRhdGVcIj4ke2RhdGV9PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1leHRyYVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLW1vcmVcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwicC1kZXRhaWxzXCI+RmVlbHMgTGlrZTwvcD5cbiAgICAgICAgICAgIDxoND4ke2RhdGEuY3VycmVudC5mZWVsc2xpa2VfY30gJHt0ZW1wVW5pdH08L2g0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLW1vcmVcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwicC1kZXRhaWxzXCI+V2luZCBTcGVlZDwvcD5cbiAgICAgICAgICAgIDxoND4ke2RhdGEuY3VycmVudC53aW5kX2twaH0gS20vaDwvaDQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtbW9yZVwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJwLWRldGFpbHNcIj5IdW1pZGl0eTwvcD5cbiAgICAgICAgICAgIDxoND4ke2RhdGEuY3VycmVudC5odW1pZGl0eX0gJTwvaDQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtbW9yZVwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJwLWRldGFpbHNcIj5XaW5kIERpcmVjdGlvbjwvcD5cbiAgICAgICAgICAgIDxoND4ke2RhdGEuY3VycmVudC53aW5kX2Rpcn08L2g0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgYDtcbiAgICAgICAgbGV0IGNpdHlMb25nID0gZGF0YS5sb2NhdGlvbi5sb247XG4gICAgICAgIGxldCBjaXR5TGF0ID0gZGF0YS5sb2NhdGlvbi5sYXQ7XG4gICAgICAgIGdldERhaWx5Rm9yZWNhc3QoY2l0eUxhdCwgY2l0eUxvbmcpO1xuICAgICAgfSk7XG4gIH1cblxuICBzZWFyY2hJbnB1dC52YWx1ZSA9IFwiXCI7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldERhaWx5Rm9yZWNhc3QobGF0LCBsb24pIHtcbiAgbGV0IGRheVVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mZXhjbHVkZT1taW51dGVseSxob3VybHkmdW5pdHM9bWV0cmljJmFwcGlkPSR7dXJsS2V5fWA7XG5cbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChkYXlVcmwpO1xuICAgIGxldCBkYWlseURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgLy8gY29uc29sZS5sb2coZGFpbHlEYXRhKTtcbiAgICBsZXQgZm9yZWNhc3REYXkgPSBkYWlseURhdGEuZGFpbHk7XG4gICAgZGFpbHlGb3JlY2FzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGZvcmVjYXN0RGF5LmZvckVhY2goKGRheSwgaSkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coaSk7XG4gICAgICBsZXQgZGF5VG9kYXkgPSBzaG93RGF5KGkpO1xuICAgICAgbGV0IGljb25TcmMgPSBnZXRJY29uKGRheS53ZWF0aGVyWzBdLmljb24pO1xuICAgICAgLy8gY29uc29sZS5sb2coZGF5VG9kYXkpO1xuICAgICAgZGFpbHlGb3JlY2FzdC5pbm5lckhUTUwgKz0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbi1kZXRhaWxzIGZhZGUtaW5cIj5cbiAgICAgICAgICA8cCBjbGFzcz1cIndlZWstZGF5XCI+JHtkYXlUb2RheX08L3A+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIndlZWstZGV0YWlsc1wiPlxuICAgICAgICAgICAgPGg0IGNsYXNzPVwid2Vlay10ZW1wXCI+JHtkYXkudGVtcC5kYXl9ICR7dGVtcFVuaXR9PC9oND5cbiAgICAgICAgICAgIDxwPiR7ZGF5LndlYXRoZXJbMF0uZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgPGltZyBzcmM9JHtpY29uU3JjfSBjbGFzcz1cImljb25cIiA+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzaG93RGF5KHRpbWVzdGFtcCkge1xuICBzd2l0Y2ggKHRpbWVzdGFtcCkge1xuICAgIGRlZmF1bHQ6XG4gICAgICBkYXkgPSBcIlN1bmRheVwiO1xuICAgIGNhc2UgMDpcbiAgICAgIGRheSA9IFwiU3VuZGF5XCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDE6XG4gICAgICBkYXkgPSBcIk1vbmRheVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAyOlxuICAgICAgZGF5ID0gXCJUdWVzZGF5XCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDM6XG4gICAgICBkYXkgPSBcIldlZG5lc2RheVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA0OlxuICAgICAgZGF5ID0gXCJUaHVyc2RheVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA1OlxuICAgICAgZGF5ID0gXCJGcmlkYXlcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNjpcbiAgICAgIGRheSA9IFwiU2F0dXJkYXlcIjtcbiAgfVxuICByZXR1cm4gZGF5O1xufVxuXG5mdW5jdGlvbiBnZXRJY29uKGNvZGUpIHtcbiAgc3dpdGNoIChjb2RlKSB7XG4gICAgY2FzZSBcIjAxZFwiIHx8IFwiMDFuXCI6XG4gICAgICBpY29uID0gXCJpbWcvaWNvbnMvc3VuLnN2Z1wiO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFwiMDJkXCIgfHwgXCIwMm5cIjpcbiAgICAgIGljb24gPSBcImltZy9pY29ucy9zdW5ueS5zdmdcIjtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBcIjAzZFwiIHx8IFwiMDNuXCI6XG4gICAgICBpY29uID0gXCJpbWcvaWNvbnMvY2xvdWQuc3ZnXCI7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCIwNGRcIiB8fCBcIjA0blwiOlxuICAgICAgaWNvbiA9IFwiaW1nL2ljb25zL2Nsb3VkeS5zdmdcIjtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBcIjA5ZFwiIHx8IFwiMDluXCI6XG4gICAgICBpY29uID0gXCJpbWcvaWNvbnMvcmFpbi5zdmdcIjtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBcIjEwZFwiIHx8IFwiMTBuXCI6XG4gICAgICBpY29uID0gXCJpbWcvaWNvbnMvaGVhdnktcmFpbi5zdmdcIjtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBcIjExZFwiIHx8IFwiMTFuXCI6XG4gICAgICBpY29uID0gXCJpbWcvaWNvbnMvdGh1bmRlcnN0b3JtLnN2Z1wiO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFwiMTNkXCIgfHwgXCIxM25cIjpcbiAgICAgIGljb24gPSBcImltZy9pY29ucy9zbm93Zmxha2Uuc3ZnXCI7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCI1MGRcIiB8fCBcIjUwblwiOlxuICAgICAgaWNvbiA9IFwiaW1nL2ljb25zL21pc3Quc3ZnXCI7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgaWNvbiA9IFwiaW1nL2ljb25zL25pZ2h0LnN2Z1wiO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIGljb247XG59XG5cblxuLy8gVG9kb1xuLy8gMS4gRmV0Y2ggd2hldGhlciBkYXRhIG9uIGxvYWQuLlxuLy8gMi4gRnVuY3Rpb24gdGhhdCB3b3VsZCBkaXNwbGF5IGZldGNoZWQgd2VhdGhlciBkYXRhXG4vLyAgICAtIEZldGNoIHdoZXRoZXIgZGF0YSB3aXRoIGRlZmF1bHQgY2l0eS5cbi8vICAgIC0gRGlzcGxheSBmZXRjaGVkIGRhdGEgb24gc2NyZWVuXG4vLyAzLiBTaG93IGVycm9yIG1lc3NhZ2UgaWYgY2l0eSBpcyBub3QgZm91bmRcbi8vIDQuIGFkZCBkZXRhaWxzIGNvbnRhaW5pbmcgY2xvdWQgaWNvbnMgdG8gZGFpbHkgd2VhdGhlciBmb3JlY2FzdFxuLy8gNS4gQWRkIGRheSBkZXRhaWxzIGZvciBjb3JyZXNwb25kaW5nIGRheXMuXG4vLyA2LiBDcmVhdGUgYW4gaWNvbnMgZm9sZGVyXG4vLyA3LiBNYXRjaCBpY29ucyB0byBjb3JyZXNwb25kaW5nIGljb24gY29kZXMuXG4vLyA4LiBhZGQgYmFja2dyb3VuZCBpbWFnZS5cbi8vIDkuIEFkZCB1bml0cyB0byBjb3JyZXNwb25kaW5nIHZhbHVlcyBlLmcgY2VsY3Vpcywgd2luZHNwZWVkLCBodW1pZGl0eSBcbi8vIDEwLiBBZGQgdHJhbnNpdGlvbiBlZmZlY3QgZm9yIGZldGNoZWQgZGF0YS5cbi8vIDExLiBEbyBtb2JpbGUgZGVzaWducyBmb3IgdGVoIFVJIFxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9