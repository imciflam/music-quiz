import welcomeScreen from "./welcomeScreen";
import gameGenreScreen from "./gameGenreScreen";
import gameArtistScreen from "./gameArtistScreen";
import resultSuccessScreen from "./resultSuccessScreen";
import failTimeScreen from "./failTimeScreen";
import failTriesScreen from "./failTriesScreen";

const main = document.querySelector(`.main`);

const ready = () => {
  main.appendChild(welcomeScreen);
  const app = document.querySelector(`.app`);
  app.insertAdjacentHTML(
    `afterend`,
    `<div class="arrows__wrap">
        <style>
        .arrows__wrap {
            position: absolute;
            top: 135px;
            left: 50%;
            margin-left: -56px;
        }
        .arrows__btn {
            background: none;
            border: 2px solid black;
            padding: 5px 20px;
        }
        </style>
        <button class="arrows__btn"><-</button>
        <button class="arrows__btn">-></button>
</div>
`
  );

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
    case 1:
      if (gameArtistScreen.parentNode === main) {
        main.removeChild(gameArtistScreen);
      } else {
        main.removeChild(welcomeScreen);
      }
      main.appendChild(gameGenreScreen);
      let flag = 0;
      const gameInputs = document.querySelectorAll(".game__input");
      for (let i = 0; i < gameInputs.length; i++) {
        gameInputs[i].addEventListener("click", function() {
          flag++;
        });
      }
      document.querySelector(".game__submit").onclick = function(e) {
        e.preventDefault();
        if (flag > 0) slider(2);
        else alert("выберите хотя бы один вариант");
      };
      returner();
      break;
    case 2:
      if (gameGenreScreen.parentNode === main) {
        main.removeChild(gameGenreScreen);
      } else {
        main.removeChild(resultSuccessScreen);
      }
      main.appendChild(gameArtistScreen);
      const artistsInputs = document.querySelectorAll(".artist__input ");
      for (let i = 0; i < artistsInputs.length; i++) {
        artistsInputs[i].addEventListener("click", function() {
          const rand = Math.floor(Math.random() * 2) + 3;
          slider(3);
        });
      }
      returner();
      break;
    case 3:
      if (failTriesScreen.parentNode === main) {
        main.removeChild(failTriesScreen);
      } else {
        main.removeChild(gameArtistScreen);
      }
      main.appendChild(resultSuccessScreen);

      document.querySelector(".result__replay").onclick = function(e) {
        e.preventDefault();
        slider(0);
      };
      break;
    case 4:
      if (failTimeScreen.parentNode === main) {
        main.removeChild(failTimeScreen);
      } else {
        main.removeChild(resultSuccessScreen);
      }
      main.appendChild(failTriesScreen);
      break;
    default:
      break;
  }
};
