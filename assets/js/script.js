$(document).ready(function () {

    // Declared variables
    var inputEl = document.getElementById("city-input");
    var searchEl = document.getElementById("search-button");
    var nameEl = document.getElementById("city-name");
    var currentWeatherEl = document.getElementById("current-weather");
    var currentTempEl = document.getElementById("temperature");
    var currentHumidityEl = document.getElementById("humidity");
    var currentWindEl = document.getElementById("wind-speed");
    var currentUVEl = document.getElementById("uv-index");
    var historyEl = document.getElementById("history");
    var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);
    var APIKey = "a0cbd2da9176d7aecdf42af83bd9df06";

//  When search button is clicked capture city name typed by the user

    function getWeather(cityName) {
//  Using the city name run an Axios get request to open weather map api in metric units
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + APIKey;
        axios.get(queryURL)
        .then(function(response){
                                console.log(response);
                    //  Use response to display today's weather conditions & use moment.js to get & format dates
                                var currentDate = moment().format("MMM Do, YYYY");
                                console.log(currentDate);
                                nameEl.innerHTML = response.data.name + " " + "(" + currentDate +")";
                                var weatherPic = response.data.weather[0].icon;
                                currentWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
                                currentWeatherEl.setAttribute("alt",response.data.weather[0].description);
                                currentTempEl.innerHTML = "Temperature: " + response.data.main.temp + " &#8451";
                                currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                                currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " km/h";
                            var lat = response.data.coord.lat;
                            var lon = response.data.coord.lon;
                            var UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + APIKey + "&cnt=1";
                            axios.get(UVQueryURL)
                            .then(function(response){
                                var UVIndex = document.createElement("span");   
                                if(response.data[0].value < 3) {
                                    UVIndex.setAttribute("class","badge badge-success");
                                } 
                                else if(response.data[0].value > 3 && response.data[0].value < 5) {
                                    UVIndex.setAttribute("class","badge badge-warning");
                                } 
                                else if(response.data[0].value > 5) {
                                    UVIndex.setAttribute("class","badge badge-danger");
                                }
                                UVIndex.innerHTML = response.data[0].value;
                                currentUVEl.innerHTML = "UV Index: ";
                                currentUVEl.append(UVIndex);
                            });
                    //  Using saved city name, execute a 5-day forecast get request from open weather map api
                            var cityID = response.data.id;
                            var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&units=metric&appid=" + APIKey;
                            axios.get(forecastQueryURL)
                            .then(function(response){

                    //  User response to display forecast for next 5 days
                                console.log(response);
                                var forecastEls = document.querySelectorAll(".forecast");
                                for (i=0; i<forecastEls.length; i++) {
                                    forecastEls[i].innerHTML = "";
                                    var forecastIndex = i*8 + 4;
                                    var forecastDate = moment(response.data.list[forecastIndex].dt * 1000).format("ddd, MMM Do, YYYY");
                                    var forecastDateEl = document.createElement("p");
                                    forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
                                    forecastDateEl.innerHTML = forecastDate;
                                    forecastEls[i].append(forecastDateEl);
                                    var forecastWeatherEl = document.createElement("img");
                                    forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                                    forecastWeatherEl.setAttribute("alt",response.data.list[forecastIndex].weather[0].description);
                                    forecastEls[i].append(forecastWeatherEl);
                                    var forecastTempEl = document.createElement("p");
                                    forecastTempEl.innerHTML = "Temperature: " + response.data.list[forecastIndex].main.temp + " &#8451";
                                    forecastEls[i].append(forecastTempEl);
                                    var forecastHumidityEl = document.createElement("p");
                                    forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                                    forecastEls[i].append(forecastHumidityEl);
                                    }
                                })
        });  
    }


    // Listener for the click on the search button

    $(searchEl).on("click",function() {
        var searchTerm = inputEl.value;
        if (searchTerm) {
            getWeather(searchTerm);
            searchHistory.push(searchTerm);
            localStorage.setItem("search",JSON.stringify(searchHistory));
            renderSearchHistory();

          } else {
            alert("Please enter a city name");
          }
    })

    //  Save each city user searches for and display it under the search form
    function renderSearchHistory() {
        historyEl.innerHTML = "";
        
        for (var i=0; i<searchHistory.length; i++) {
            var historyItem = document.createElement("input");
            historyItem.setAttribute("type","text");
            historyItem.setAttribute("readonly",true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.setAttribute("value", searchHistory[i]);

            // Listen for users clicking on history items, if clicked, run getWeather()
            
            historyItem.addEventListener("click", function (e) {
                console.log(this.value)           // logs the value of this
                console.log(e.currentTarget === this) // logs TRUE
                getWeather(this.value);
              })

            historyEl.append(historyItem);
        }    

        }

    // Listener for the clear history button

    $("#clear-button").on("click",function() {
        searchHistory = [];
        historyItemId = 0;
        renderSearchHistory();
        $("#today").empty();
        $("#current-weather").empty();
        localStorage.clear();
        window.location.reload();
    })


    //  When page loads, automatically get today's conditions and 5-day forecast for the last city the user searched for
    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);        
    }

});

