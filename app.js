// TODO : ranger ma fonction dans un objet app.init avec les listeners quivont bien
// todo: connecter l'input pour qu'il fetch la bonne ville lors de la recherche
// todo : renvoyer une citation random à chaque connection.
// todo: chemin de la journée (temps qui rste au soleil avant la fin de la journée)
// todo : icons / anims pour illustrer le temps
// todo : organiser card

//!déclarations d'éléments du DOM :
let cityName = document.querySelector(".town");
let countryName = document.querySelector(".country");
let iconDisplay = document.querySelector(".icon");
let temperatureDisplay = document.querySelector(".temp");
let searchIcon = document.querySelector("button");
let windDisplay = document.querySelector(".wind");
let card = document.querySelector(".card");
let dateDisplay = document.querySelector(".date");
let input = document.querySelector("input");
let cardElm = document.querySelectorAll("#cardElm");
let descriptionElm = document.querySelector(".desc");
let form = document.querySelector("form");

let app = {
  init: function () {
    app.fetchNewWeather(), app.addListenersToAction();
  },
  //!FETCH weather informations
  fetchNewWeather: async function (location) {
    try {
      if (!location) {
        location = "bègles";
      }

      // je déclare l'url pour le fetch
      let URL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=aaf97f9823335713fe4eab1ef64653df`;
      // ma réponse est le résultat de mon fetch
      const response = await fetch(URL);
      // mes données sont ma réponse au format json
      const data = await response.json();
      // si j'ai des données, je les insères dans le DOM
      console.log(data);
      card.classList.remove("error");
      cityName.textContent = data.name ?? data.message;
      countryName.textContent = `(${data.sys.country})`;
      temperatureDisplay.textContent = `${Math.round(data.main.temp)} °C`;
      windDisplay.textContent = `${Math.round(data.wind.speed)} km/h`;
      descriptionElm.textContent = data.weather[0].description;
    } catch (error) {
      card.classList.add("error");
      cardElm.forEach((element) => {
        element.textContent = " ";
      });
      console.log(error);
    }
  },
  addListenersToAction: function () {
    // attache un listener sur l'icone de search, qui va appeler fetchweather.
    searchIcon.addEventListener("click", app.getInputValue);
    //show l'input
    searchIcon.addEventListener("click", app.hideSearchInput);
  },
  hideSearchInput: function () {
    input.classList.toggle("hidden");
  },
  //récupère la value de l'input
  getInputValue: function (event) {
    // console.log("input value : " + input.value);
    const location = input.value;
    // appelle fetchNewWeather avec la nouvelle location
    app.fetchNewWeather(location);
  },
};

document.addEventListener("DOMContentLoaded", app.init);
