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

export default class App {
  constructor() {
    this.main = document.querySelector(`.main`);
    this.main.addEventListener("DOMContentLoaded", this.ready());
  }
  ready() {
    this.main.appendChild(welcomeScreen);
    const welcomeButton = document.querySelector(`.welcome__button`);
    welcomeButton.addEventListener(`click`, () => {
      this.slider(1);
    });
  }
  returner() {
    const returnButton = document.querySelector(`.game__back`);
    returnButton.addEventListener(`click`, function() {
      slider(0);
    });
  }

  slider(slideNumbers) {
    switch (slideNumbers) {
      case 0:
        while (main.firstChild) {
          main.removeChild(main.firstChild);
        }
        main.appendChild(welcomeScreen);
        break;
      case 1: {
        if (artistLevel.parentNode === this.main) {
          this.main.removeChild(artistLevel);
        } else {
          this.main.removeChild(welcomeScreen);
        }
        this.main.appendChild(genreLevel);
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
  }
}