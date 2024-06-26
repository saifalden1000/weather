const myApiKey = "e88ba5b7f8cc4f569f3145152242606";
const baseUrl = "https://api.weatherapi.com/v1/forecast.json";
const searchInput = document.querySelector("input");
const searchBtn = document.querySelector("#searchBtn");
let data;
async function getWeather(city) {
  document.querySelector(".row").innerHTML = `<div class="loader"></div> `;
  try {
    let response = await fetch(`${baseUrl}?key=${myApiKey}&q=${city}&days=3`);
    data = await response.json();

    console.log(data);
    displayData(data);
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter a valid location or check your internet",
    });
    document.querySelector(".row").innerHTML = ` `;
  }
}
function clearInput() {
  searchInput.value = "";
}
function displayData(data) {
  let weatherCards = "";
  for (let i = 0; i < 3; i++) {
    let usedData = data.forecast.forecastday[i];
    let date = new Date(usedData.date);
    let day = date.getDate();
    let weekDay = date.toLocaleDateString("en-us", { weekday: "long" });
    let month = date.toLocaleDateString("en-us", { month: "long" });
    weatherCards += `<div class="col-md-4 p-0">
          <div
            class="weather-header p-2 d-flex justify-content-between align-items-center"
          >
            <span>${weekDay}</span>
            <span>${day} ${month}</span>
          </div>
          <div class="weather-body p-4">
            <span>${data.location.name}</span>
            <h2 class="display-1 fw-bolder">${usedData.day.avgtemp_c}°C</h2>
            <img
              id="main-img"
              class="mb-3"
              src="https:${usedData.day.condition.icon}"
              alt=""
            />
            <span class="d-block mb-3">${usedData.day.condition.text}</span>
            <span class="weather-cond"
              ><img class="px-2" src="./icon-umberella.png" alt="" />${usedData.day.daily_chance_of_rain}%</span
            >
            <span class="weather-cond"
              ><img class="px-2" src="./icon-wind.png" alt="" />${usedData.day.avgvis_km}km/h</span
            >
         
          </div>
        </div>`;
  }
  document.querySelector(".row").innerHTML = weatherCards;
}
function myLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let currentLocation = `${latitude},${longitude}`;
  getWeather(currentLocation);
}
navigator.geolocation.getCurrentPosition(myLocation);

searchInput.addEventListener("change", function () {
  getWeather(searchInput.value);
  clearInput();
});
searchBtn.addEventListener("click", function () {
  getWeather(searchInput.value);
  clearInput();
});
