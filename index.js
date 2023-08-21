const apikey = "46f80a02ecae410460d59960ded6e1c6",
    city = document.getElementById("city-input"),
    weatherData = document.getElementById("weather-data");

async function getWeather() {
    try {
        const response = await axios.get(`//api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apikey}&units=metric`);
        const data = response.data;
        if (response.status !== 200) throw new Error("Network response error");
        else {
            console.log("data", data);
            weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="not found"/>`;
            weatherData.querySelector(".temperature").textContent = `${Math.round(data.main.temp)}°C`;
            weatherData.querySelector(".description").textContent = `${data.weather[0].description}`;
            weatherData.querySelector(".details").innerHTML = [`Feels like: ${Math.round(data.main.feels_like)}`, `humidity: ${data.main.humidity}`, `pressure: ${data.main.pressure}`]
                .map(value => `<div>${value}</div>`)
                .join("");
        }
    } catch (err) {
        weatherData.querySelector(".icon").innerHTML = "";
        weatherData.querySelector(".details").innerHTML = "";
        weatherData.querySelector(".temperature").textContent = "";
        weatherData.querySelector(".description").textContent = "";
    }
}
city.focus();
city.addEventListener("input", getWeather);
