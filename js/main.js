const main = document.querySelector(`.main`);
const welcome = document
  .getElementById(`welcome`)
  .content.querySelector(`.welcome`);
const gameGenre = document
  .getElementById(`game-genre`)
  .content.querySelector(`.game`);
const gameArtist = document.getElementById(`game-artist`);
const resultSuccess = document.getElementById(`result-success`);
const failTime = document.getElementById(`fail-time`);
const failTries = document.getElementById(`fail-tries`);
const resultArtist = document.getElementById(`result-artist`);
const resultList = document.getElementById(`result-list`);
const resultGenre = document.getElementById(`result-genre`);
const modalError = document.getElementById(`modal-error`);
const modalConfirm = document.getElementById(`modal-confirm`);

document.addEventListener("DOMContentLoaded", ready);

function ready() {
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
}

document.addEventListener("keydown", function(event) {
  console.log(event.which);
  let counter = 0;
  if (event.which == 39) {
    counter++;
    console.log(counter);
    main.appendChild(gameGenre);
    main.removeChild(welcome);
  }
  if (event.which == 37) {
    counter--;
    main.appendChild(gameGenre);
    main.removeChild(welcome);
  }
  console.log(counter);
});
