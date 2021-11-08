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
