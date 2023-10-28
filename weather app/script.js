const main = document.querySelector("#main");
const form = document.querySelector("#form");
const search = document.querySelectorAll(".search");
const apikey = "212955ee0c778c90082dff545bd8c5a9";
const url = (lat, lon) => 
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

function KtoC(K) {
    return (K - 273.15).toFixed(2);
}    

function addWeatherToPage(data) {
    console.log(data);
    const temp = KtoC(data.main.temp);
    main.innerHTML = "";
    const weather = document.createElement("div");
    weather.classList.add("weather");
    weather.innerHTML = `
        <h3>${data.name}</h3>
        <div class="result">
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h2>${temp}°C</h2>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        </div>

        <small>${data.weather[0].main}</small>
        `;
    main.appendChild(weather);
}

async function getWeather() {
    const [lat, lon] = [search[0].value, search[1].value];
    if(lat && lon) {
        const resp = await fetch(url(lat, lon));
        const respData = await resp.json();
        addWeatherToPage(respData);
    }
}

form.addEventListener("submit", e => {
    e.preventDefault();
    getWeather();
});