import welcomeScreen from "./welcomeScreen";
import { genreLevel } from "./templates/genreLevel";
import { artistLevel } from "./templates/artistLevel";
import resultSuccessScreen from "./resultSuccessScreen";
import failTriesScreen from "./failTriesScreen";

const linkAddresses = Object.freeze({
  WELCOMESCREEN: ``,
  GAME: `game`,
  RESULTSCREEN: `result`
});

const main = document.querySelector(`.main`);

const ready = () => {
  main.appendChild(welcomeScreen);
  const welcomeButton = document.querySelector(`.welcome__button`);
  welcomeButton.addEventListener(`click`, function() {
    slider(1);
  });
};

const returner = () => {
  const returnButton = document.querySelector(`.game__back`);
  returnButton.addEventListener(`click`, function() {
    slider(0);
  });
};
document.addEventListener(`DOMContentLoaded`, ready);

const slider = slideNumbers => {
  switch (slideNumbers) {
    case 0:
      while (main.firstChild) {
        main.removeChild(main.firstChild);
      }
      main.appendChild(welcomeScreen);
      break;
    case 1: {
      if (artistLevel.parentNode === main) {
        main.removeChild(artistLevel);
      } else {
        main.removeChild(welcomeScreen);
      }
      main.appendChild(genreLevel);
      let flag = 0;
      const gameInputs = document.querySelectorAll(".game__input");
      for (let i = 0; i < gameInputs.length; i++) {
        gameInputs[i].addEventListener("click", function() {
          flag++;
        });
      }
      document.querySelector(".game__submit").onclick = function(e) {
        e.preventDefault();
        if (flag > 0) {
          document.querySelector(".game__tracks").reset();
          slider(2);
        } else alert("выберите хотя бы один вариант");
      };
      returner();
      break;
    }
    case 2: {
      while (main.firstChild) {
        main.removeChild(main.firstChild);
      }
      main.appendChild(artistLevel);
      const artistsInputs = document.querySelectorAll(".artist__input ");
      for (let i = 0; i < artistsInputs.length; i++) {
        artistsInputs[i].addEventListener("click", function() {
          const rand = Math.floor(Math.random() * 2) + 3;
          slider(rand);
        });
      }
      returner();
      break;
    }
    case 3:
      while (main.firstChild) {
        main.removeChild(main.firstChild);
      }
      main.appendChild(resultSuccessScreen);
      document.querySelector(".result__replay").onclick = function(e) {
        e.preventDefault();
        slider(0);
      };
      break;
    case 4:
      while (main.firstChild) {
        main.removeChild(main.firstChild);
      }
      main.appendChild(failTriesScreen);
      document.querySelector(".result__replay").onclick = function(e) {
        e.preventDefault();
        slider(0);
      };
      break;
    default:
      break;
  }
};
