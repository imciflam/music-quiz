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
};

document.addEventListener(`DOMContentLoaded`, ready);

let counter = 0;
const switcher = () => {
  if (event.which === 39) {
    counter++;
    slider(counter);
  }
  if (event.which === 37) {
    counter--;
    slider(counter);
  }
};

const slider = counter => {
  switch (counter) {
    case 0:
      main.removeChild(gameGenreScreen);
      main.appendChild(welcomeScreen);
      break;
    case 1:
      if (gameArtistScreen.parentNode === main) {
        main.removeChild(gameArtistScreen);
      } else {
        main.removeChild(welcomeScreen);
      }
      main.appendChild(gameGenreScreen);
      break;
    case 2:
      if (gameGenreScreen.parentNode === main) {
        main.removeChild(gameGenreScreen);
      } else {
        main.removeChild(resultSuccessScreen);
      }
      main.appendChild(gameArtistScreen);
      break;
    case 3:
      if (failTriesScreen.parentNode === main) {
        main.removeChild(failTriesScreen);
      } else {
        main.removeChild(gameArtistScreen);
      }
      main.appendChild(resultSuccessScreen);
      break;
    case 4:
      if (failTimeScreen.parentNode === main) {
        main.removeChild(failTimeScreen);
      } else {
        main.removeChild(resultSuccessScreen);
      }
      main.appendChild(failTriesScreen);
      break;
    case 5:
      main.removeChild(failTriesScreen);
      main.appendChild(welcomeScreen);
      break;
    default:
      break;
  }
};

document.addEventListener("keydown", switcher);
