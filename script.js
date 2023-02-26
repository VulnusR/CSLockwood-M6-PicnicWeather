const API_KEY = "a54da92fedb6a7ab239ffa6b1965f74f";

var searchBtn = document.getElementById('searchbtn')
var searchTextInput = document.getElementById('searchbar')

var cityName = document.getElementById('cityname');
var tempElm = document.getElementById('templevel');
var humidElm = document.getElementById('humiditylevel');
var windElm = document.getElementById('windspeed');



//calls weather data to main card on click
searchBtn.addEventListener('click', function(event) {
    
    var city = searchTextInput.value;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Extract the data from the API response
            var city = data.name;
            var temperature = data.main.temp;
            var humidity = data.main.humidity;
            var windSpeed = data.wind.speed;

            if (!city || !temperature || !humidity || !windSpeed) {
                console.error("Error: Could not retrieve weather data.");
                return;
            }
            
            // Update the HTML elements with the data
            cityName.innerHTML = city;
            tempElm.innerHTML = `Temperature: ${temperature}°C`;
            humidElm.innerHTML = `Humidity: ${humidity}%`;
            windElm.innerHTML = `Wind Speed: ${windSpeed}m/s`;
        })
        
});

