

const apiKey = "389c11fa8f1f0803602f4180a900990b";

GeoCodeApiCall = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}"
WeatherApiCall = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units={units}&appid={API key}"

var city
var usState
var countryCode

currentWeather = document.getElementById("current-weather")
currentLow = document.getElementById("current-low")
currentHigh = document.getElementById("current-high")
tempFeelsLike = document.getElementById("feels-like")
cityCountry = document.getElementById("location")
background = document.getElementById("body-background")
weatherDetails = document.getElementById("weather")
emoji = document.getElementById("emoji")


function displayData(mainTemp, minTemp, maxTemp, feelsLike, weather, showUnit) {
    if ((mainTemp <= 32 && units === "imperial") || (mainTemp <= 0 && units === "metric")){
        background.classList.remove()
        background.classList.add("temp-based-decor-cold")
        emoji.innerHTML = "🥶"

    }
    else if ((32 < mainTemp < 75 && units === "imperial") || (0 < mainTemp < 23 && units === "metric")) {
        background.classList.remove()
        background.classList.add("temp-based-decor-mild")
        emoji.innerHTML = "😄"
    }
    else if ((mainTemp >= 75 && units === "imperial") || (mainTemp >= 23 && units === "metric")) {
        background.classList.remove()
        background.classList.add("temp-based-decor-hot")
        emoji.innerHTML = "😎"
    }
    else {
        console.log("temperature out of range")
    }
    currentWeather.innerHTML = mainTemp + " " + showUnit
    weatherDetails.innerHTML = weather
    currentLow.innerHTML = "Today's Low: " + minTemp
    currentHigh.innerHTML = "Today's High: " + maxTemp
    tempFeelsLike.innerHTML = "Feels Like: " + feelsLike
    cityCountry.innerHTML = city + ", " + countryCode
}

function getWeather(a,b) {
    let url2 = WeatherApiCall
        .replace("{lat}",a)
        .replace("{lon}",b)
        .replace("{units}",units)
        .replace("{API key}", apiKey);
    fetch(url2)
        .then(response => response.json())
        .then(weatherData => {
            displayData(weatherData.main.temp, weatherData.main.temp_min,
                 weatherData.main.temp_max, weatherData.main.feels_like, weatherData.weather[0].main, unitSymbol)
        })
        .catch(error => console.error(error));
}

function getData(){
    let url1  = GeoCodeApiCall
        .replace("{city name}", city)
        .replace("{state code}", usState)
        .replace("{counrty code}", countryCode)
        .replace("{limit}", 1)
        .replace("{API key}", apiKey);
    fetch(url1)
        .then(response => response.json())
        .then(data => {
            console.log(data[0].lat)
            console.log(data[0].lon)
            getWeather(data[0].lat,data[0].lon);
        })
        .catch(error => console.error(error));
    }

document.getElementById("submit-button").onclick = () => {

    city = document.getElementById("city").value
    usState = document.getElementById("state").value
    countryCode = document.getElementById("country").value

    if (countryCode === "USA" || countryCode === "US") {
        units = "imperial"
        unitSymbol = "° F"
    }
    else {
        units = "metric"
        unitSymbol = "° C"
    }

    getData();
}