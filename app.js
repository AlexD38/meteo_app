
//!déclarations d'éléments du DOM :
let cityName = document.querySelector(".town");
let countryName = document.querySelector(".country");
let iconDisplay = document.querySelector(".icon");
let temperatureDisplay = document.querySelector(".temp");
let searchIcon = document.querySelector("button");
let windDisplay = document.querySelector(".wind");
let card = document.querySelector(".card");
// let dateDisplay = document.querySelector(".date");
let input = document.querySelector("input");
let cardElm = document.querySelectorAll("#cardElm");
let descriptionElm = document.querySelector(".desc");
let form = document.querySelector("form");
let sideCard = document.querySelector("#sidecard");
let dateDisplay = document.querySelector("#dateDisplay");
// let timeDisplay = document.querySelector("#timeDisplay");

let app = {
  init: function () {
    app.fetchNewWeather(),
      app.addListenersToAction(),
      app.getRandomNummber(),
      app.displayDate();
    // app.displayTime();
    setInterval(app.displayTime, 1000);
  },
  //!FETCH weather informations
  fetchNewWeather: async function (location) {
    try {
      if (!location) {
        location = "bègles";
      }

      // je déclare l'url pour le fetch
      let URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=aaf97f9823335713fe4eab1ef64653df`;
      // ma réponse est le résultat de mon fetch
      const response = await fetch(URL);
      // mes données sont ma réponse au format json
      const data = await response.json();
      // si j'ai des données, je les insères dans le DOM
      console.log(data);
      cityName.textContent = data.name ?? data.message;
      card.classList.remove("error");
      countryName.textContent = `(${data.sys.country})`;
      temperatureDisplay.textContent = `${Math.round(data.main.temp)} °C`;
      windDisplay.textContent = `${Math.round(data.wind.speed)} km/h`;
      const weatherDescription = data.weather[0].description;
      descriptionElm.textContent = weatherDescription;
      document.body.style.backgroundImage = `url('https://source.unsplash.com/1700x1300?${weatherDescription}')`;
      return data;
    } catch (error) {
      console.error("errror is :", error);
      card.classList.add("error");
      cardElm.forEach((element) => {
        element.textContent = " ";
      });
      console.log(error);
    }
  },
  getRandomNummber: function () {
    const random = Math.floor(Math.random() * 10);
    return random;
  },
  fetchQuotes: async function () {
    const random = app.getRandomNummber();
    const url = "/quotes.json";
    const response = await fetch(url);
    const data = await response.json();
    const quotes = data.quotes;
    sideCard.textContent = quotes[random].quote + " " + quotes[random].author;
  },
  addListenersToAction: function () {
    // attache un listener sur l'icone de search, qui va appeler fetchweather.
    searchIcon.addEventListener("click", app.getInputValue);

    //show l'input
    searchIcon.addEventListener("click", app.hideSearchInput);
    //developer le sidecard
    sideCard.addEventListener("click", app.developSidecard);
    input.addEventListener("keyup", app.enterKeyPressed);
  },
  hideSearchInput: function () {
    input.classList.toggle("hidden");
  },
  //récupère la value de l'input
  getInputValue: function () {
    const location = input.value;
    // appelle fetchNewWeather avec la nouvelle location
    app.fetchNewWeather(location);
    return location;
  },

  developSidecard: function () {
    sideCard.classList.toggle("active");
    if (sideCard.classList.contains("active")) {
      app.fetchQuotes();
      card.classList.add("shade");
    } else {
      card.classList.remove("shade");
      sideCard.textContent = "";
    }
  },
  enterKeyPressed: function (e) {
    if (e.key === "Enter") {
      const location = app.getInputValue();
      app.fetchNewWeather(location);
    } else {
    }
  },
  displayDate: function () {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const currentDayMonthyear = date.toLocaleDateString(undefined, options);
    let dateDisplayed = (dateDisplay.innerHTML = currentDayMonthyear);
    return dateDisplayed;
  },
  displayTime: function () {
    let HTML = (dateDisplay.innerHTML = app.displayDate() + " ");
    const date = new Date();
    const currentHour = date.toLocaleTimeString();
    const secondsUpdated = (dateDisplay.innerHTML += currentHour);
  },
};

document.addEventListener("DOMContentLoaded", app.init);
