 $(document).ready(function () {

        // Declare the variables

        var cityInput = document.getElementById("#city-input");
        var cityDisplayName = document.getElementById("#city-name");
        var currentWeather = document.getElementById("#current-weather");
        var currentForecast = document.getElementById("#today-forecast");
        var currentDate = document.getElementById("#current-date");
        var currentTemp = document.getElementById("#current-temperature");
        var currentHumidity = document.getElementById("#current-humidity");
        var currentWind = document.getElementById("#current-wind");
        var currentUV = document.getElementById("#current-uv-index");
        var historyForm = document.getElementById("#history");
        var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
        var APIKey = "a0cbd2da9176d7aecdf42af83bd9df06";
        


        // On page load, display search history
        console.log(searchHistory);

        //  When search button is clicked, read the city name typed by the user
        $("#search-button").on("click", function() {
            event.preventDefault();
            var searchInput = $("#city-input").val();
            console.log(searchInput);
            getWeather(searchInput);


        }); 

        function getWeather(searchInput) {
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&unit=metric&appid=" + APIKey;
            //  Using saved city name, execute a current condition get request from open weather map api
                fetch(queryURL)
                .then(function(response){
                    console.log(response);
                    // Set the date to today's date
                    currentDate = moment();
                    // Set the city to the searched city & the date
                    cityDisplayName.innerHTML = response.data.name + currentDate;

                    // Parse the response to be able to display the data

                })
        };


});





