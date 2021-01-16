// Declared variables
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);
var form = document.querySelector("input-form");
var cityInput = document.querySelector("city-input");
var inputList = document.querySelector("input-list");
var formHistory = document.querySelector("history");
var cityName = document.getElementById("#city-name");
var currentWeatherImg = document.getElementById("#current-weather");
var humidity = document.getElementById("#humidity");
var windSpeed = document.getElementById("#wind-speed");
var uvIndex = document.getElementById("#UV-index");

// Open Weather API Key

var apiKey = "a0cbd2da9176d7aecdf42af83bd9df06";

var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=metric&appid=" + apiKey;



$("#search-button").on("click", function(){
    console.log("Search button clicked");
    fetch(apiURL)
  .then(response => response.json())
  .then(data => console.log(data));
})

var formSubmitHandler = function(event) {

    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var city = cityInput.value.trim();

    // format the API URL
    //  The format for the query to send to open weather map
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey;
  
    if (city) {
      getForecastData(city);
  
      // clear old content
      cityInput.textContent = '';
      cityInput.value = '';
    } else {
      alert('Please enter a city name');
    }
  };
  
  var getForecastData = function(city, apiURL) {
  
    // make a get request to url
    fetch(apiURL)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
            displayRepos(data, city);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function(error) {
        alert('Unable to connect to weather provider');
      });
  };
  
//   var displayForecast = function(repos, searchTerm) {
//     // check if api returned any repos
//     if (repos.length === 0) {
//       repoContainerEl.textContent = 'No repositories found.';
//       return;
//     }
  
//     repoSearchTerm.textContent = searchTerm;
  
//     // loop over repos
//     for (var i = 0; i < repos.length; i++) {
//       // format repo name
//       var repoName = repos[i].owner.login + '/' + repos[i].name;
  
//       // create a container for each repo
//       var repoEl = document.createElement('div');
//       repoEl.classList = 'list-item flex-row justify-space-between align-center';
  
//       // create a span element to hold repository name
//       var titleEl = document.createElement('span');
//       titleEl.textContent = repoName;
  
//       // append to container
//       repoEl.appendChild(titleEl);
  
//       // create a status element
//       var statusEl = document.createElement('span');
//       statusEl.classList = 'flex-row align-center';
  
//       // check if current repo has issues or not
//       if (repos[i].open_issues_count > 0) {
//         statusEl.innerHTML =
//           "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
//       } else {
//         statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//       }
  
//       // append to container
//       repoEl.appendChild(statusEl);
  
//       // append container to the dom
//       repoContainerEl.appendChild(repoEl);
//     }
//   };
  
//   // add event listeners to forms
//   userFormEl.addEventListener('submit', formSubmitHandler);