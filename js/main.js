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
}

document.addEventListener("keydown", function(event) {
  console.log(event.which);
  if (event.which == 39) {
    main.appendChild(gameGenre);
  }
});
