const main = document.querySelector(`.main`);
const welcome = document
  .getElementById(`welcome`)
  .content.querySelector(`.welcome`);
const gameGenre = document
  .getElementById(`game-genre`)
  .content.querySelector(`.game`);
const gameArtist = document
  .getElementById(`game-artist`)
  .content.querySelector(`.game`);
const resultSuccess = document
  .getElementById(`result-success`)
  .content.querySelector(`.result`);
const failTime = document
  .getElementById(`fail-time`)
  .content.querySelector(`.result`);
const failTries = document
  .getElementById(`fail-tries`)
  .content.querySelector(`.result`);
const resultArtist = document
  .getElementById(`result-artist`)
  .content.querySelector(`.result`);
const resultList = document
  .getElementById(`result-list`)
  .content.querySelector(`.result`);
const resultGenre = document
  .getElementById(`result-genre`)
  .content.querySelector(`.result`);
const modalError = document
  .getElementById(`modal-error`)
  .content.querySelector(`.modal`);
const modalConfirm = document
  .getElementById(`modal-confirm`)
  .content.querySelector(`.modal`);

const ready = () => {
  main.appendChild(welcome);
  const app = document.querySelector(`.app`);
  app.insertAdjacentHTML(
    "afterend",
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

document.addEventListener("DOMContentLoaded", ready);

let counter = 0;
const switcher = () => {
  console.log(event.which);
  if (event.which == 39) {
    counter++;
    slider(counter);
  }
  if (event.which == 37) {
    counter--;
    slider(counter);
  }
  console.log(counter);
};

const slider = counter => {
  console.log(counter);
  switch (counter) {
    case 0:
      main.removeChild(gameGenre);
      main.appendChild(welcome);
      break;
    case 1:
      if (gameArtist.parentNode == main) {
        main.removeChild(gameArtist);
      } else {
        main.removeChild(welcome);
      }
      main.appendChild(gameGenre);
      break;
    case 2:
      if (gameGenre.parentNode == main) {
        main.removeChild(gameGenre);
      } else {
        main.removeChild(resultSuccess);
      }
      main.appendChild(gameArtist);
      break;
    case 3:
      main.removeChild(gameArtist);
      main.appendChild(resultSuccess);
      break;
    case 4:
      main.removeChild(resultSuccess);
      main.appendChild(resultGenre);
      break;
    case 5:
      main.removeChild(resultGenre);
      main.appendChild(resultList);
      break;
    default:
      break;
  }
};

document.addEventListener("keydown", switcher);
