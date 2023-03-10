const API_KEY = "a54da92fedb6a7ab239ffa6b1965f74f";

var searchBtn = document.getElementById('searchbtn')
var searchTextInput = document.getElementById('searchbar')

var cityName = document.getElementById('cityname');
var tempElm = document.getElementById('templevel');
var humidElm = document.getElementById('humiditylevel');
var windElm = document.getElementById('windspeed');
var headerIcon = document.getElementById("headerimg");
var dateToday = document.getElementById("datetoday");
var fiveDayTxt =document.getElementById('fivedayforecasth2')

var savedCities = [];

searchBtn.addEventListener('click', function(event) {
    var city = searchTextInput.value;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })

        .then(function(data) {
            var city = data.name;
            var temperature = data.main.temp;
            var humidity = data.main.humidity;
            var windSpeed = data.wind.speed;
            var weatherIcon = data.weather[0].icon;

            cityName.innerHTML = city;
            tempElm.innerHTML = `Temperature: ${temperature}°C`;
            humidElm.innerHTML = `Humidity: ${humidity}%`;
            windElm.innerHTML = `Wind Speed: ${windSpeed}m/s`;
            headerIcon.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
            dateToday.innerHTML = new Date().toLocaleDateString();
            fiveDayTxt.innerHTML = "5 Day Forecast: "

            if (!savedCities.includes(city)) {
                savedCities.push(city);
                if (savedCities.length > 0) {
                createButtons();
                }
              }

            displayForecast(city);
        })

        .catch(function(error) {
            cityName.innerHTML = "Error:";
            tempElm.innerHTML = "Enter a valid city name."
            humidElm.innerHTML = " ";
            windElm.innerHTML = "Please check your spelling and try again."
        });
});

function createButtons() {
    

    if (savedCities.length === 0) {
        return;
    }

    var historyBox = document.querySelector('.historybox');
    historyBox.innerHTML = '';
    

    for (var i = 0; i < savedCities.length; i++) {
        var newBtn = document.createElement('button');
        newBtn.innerHTML = savedCities[i];
        newBtn.classList.add('historybtn');
        newBtn.addEventListener('click', function() {
            searchTextInput.value = this.innerHTML;
            searchBtn.click();
        });
        historyBox.appendChild(newBtn);
    }
}

function displayForecast(city) {
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(forecastUrl)
        .then(function(response) {
            
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
    })

    .then(function(forecastData) {
        var forecastList = forecastData.list.slice(0,5);
        
        // Loop through the next 5 days
        for (var i = 0; i < 5; i++) {
            var day = forecastList[i];

            // Get the date of the current day
            var date = new Date(day.dt * 1000);
            date.setDate(date.getDate() + i);
            date = date.toLocaleDateString();
            

            //Get the temperature, humidity, and wind speed for the current day
            var temperature = day.main.temp;
            var humidity = day.main.humidity;
            var windSpeed = day.wind.speed;

            // Get the weather icon for the current day
            var weatherIcon = day.weather[0].icon;

            // Get the container for the current day
            var dayContainer = document.getElementById(`day${i + 1}`);

            // Update the content of the container for the current day
            dayContainer.innerHTML = `
                <h3>${date}</h3>
                <p>Temperature: ${temperature}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed}m/s</p>
                <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png">
            `;
        }
    })
}