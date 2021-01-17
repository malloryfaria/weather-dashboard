# Weather Dashboard

## Description 
A weather dashboard with a 5 day forecast that will run in the browser and feature dynamically updated HTML and CSS.
## Build status

Live

## Deployed application
https://malloryfaria.github.io/weather-dashboard/
 
## Screenshots

![Weather Dashboard Screenshot](/assets/images/screenshot.jpg?raw=true "Weather Dashboard Screenshot")

## Tech/framework used

<b>Built with</b>
- HTML
- JavaScript
- JQuery
- BootStrap
- OpenWeather API
- Axios


## Code Example

```
    // Listener for the click on the search button

    $(search).on("click",function() {
        var searchTerm = input.value;

        // Ensure user input a city name

        if (searchTerm) {
            getWeather(searchTerm);
            searchHistory.push(searchTerm);
            localStorage.setItem("search",JSON.stringify(searchHistory));
            loadSearchHistory();

          } 
          // If user didn't input a value, alert them
          else {
            alert("Please enter a city name");
          }
          $("#city-input").val("");  
    })

```


## License
None

© [Mallory](https://github.com/malloryfaria)


