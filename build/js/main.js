(function () {
'use strict';

function htmlToElement(html) {
  const div = document.createElement(`div`);
  html = html.trim(); // remove whitespaces
  div.innerHTML = html;
  return div.firstChild;
}

//  Приветствие
const welcomeScreen = htmlToElement(`
  <section class="welcome">
    <div class="welcome__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <button class="welcome__button"><span class="visually-hidden">Начать игру</span></button>
    <h2 class="welcome__rules-title">Правила игры</h2>
    <p class="welcome__text">Правила просты:</p>
    <ul class="welcome__rules-list">
      <li>За 5 минут нужно ответить на все вопросы.</li>
      <li>Можно допустить 3 ошибки.</li>
    </ul>
    <p class="welcome__text">Удачи!</p>
  </section>`);

const MAX_ERRORS_COUNT = 3;
 // 5 minutes + 1 second

const Label = {
  GAME: `Угадай мелодию`,

  TITLE_WIN: `Вы настоящий меломан!`,
  TITLE_WELCOME: `Правила игры`,
  TITLE_FAIL_TIME: `Увы и ах!`,
  TITLE_FAIL_TRY: `Какая жалость!`,

  BUTTON_WELCOME: `Начать игру`,
  BUTTON_WIN: `Сыграть ещё раз`,
  BUTTON_FAIL: `Попробовать ещё раз`
};

const phrase = {
  timeIsUp: () => `Время вышло!<br>Вы не успели отгадать все мелодии`,
  noMoreAttempts: () =>
    `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`,
  win: ({ place, playersCount, betterThan }) =>
    `Вы заняли ${place}-ое место из ${playersCount} игроков. Это&nbsp;лучше чем у&nbsp;${betterThan}%&nbsp;игроков`
};





const resultTime = {
  name: Label.GAME,
  title: Label.TITLE_FAIL_TIME,
  button: Label.BUTTON_FAIL,
  content: phrase.timeIsUp(),
  isWin: false
};

const header = attemptsLeft => `<header class="game__header">
<a class="game__back" href="#">
  <span class="visually-hidden">Сыграть ещё раз</span>
  <img class="game__logo" src="/img/melody-logo-ginger.png" alt="Угадай мелодию">
</a>

<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 40 780 780">
  <circle class="timer__line" cx="390" cy="390" r="370" style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">
</svg>

<div class="timer__value" xmlns="http://www.w3.org/1999/xhtml">
  <span class="timer__mins">05</span>
  <span class="timer__dots">:</span>
  <span class="timer__secs">00</span>
</div>

<div class="game__mistakes">
  ${mistakes(MAX_ERRORS_COUNT - attemptsLeft)}
</div>
</header>`;

const mistakes = errors => {
  let mistakeElement = ``;
  if (errors > 0) {
    while (errors) {
      mistakeElement += `
      <div class="wrong"></div>`;
      errors--;
    }
  }
  return mistakeElement;
};

//  Игра на выбор жанра
const gameGenreScreen = `
<section class="game game--genre">
${header(1)}
    <section class="game__screen">
      <h2 class="game__title">Выберите инди-рок треки</h2>
      <form class="game__tracks">
        <div class="track">
          <button class="track__button track__button--play" type="button"></button>
          <div class="track__status">
            <audio></audio>
          </div>
          <div class="game__answer">
            <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-1">
            <label class="game__check" for="answer-1">Отметить</label>
          </div>
        </div>

        <div class="track">
          <button class="track__button track__button--play" type="button"></button>
          <div class="track__status">
            <audio></audio>
          </div>
          <div class="game__answer">
            <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-2">
            <label class="game__check" for="answer-2">Отметить</label>
          </div>
        </div>

        <div class="track">
          <button class="track__button track__button--pause" type="button"></button>
          <div class="track__status">
            <audio></audio>
          </div>
          <div class="game__answer">
            <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-3">
            <label class="game__check" for="answer-3">Отметить</label>
          </div>
        </div>

        <div class="track">
          <button class="track__button track__button--play" type="button"></button>
          <div class="track__status">
            <audio></audio>
          </div>
          <div class="game__answer">
            <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1"  id="answer-4">
            <label class="game__check " for="answer-4">Отметить</label>
          </div>
        </div>

        <button class="game__submit button" type="submit"  >Ответить</button>
      </form>
    </section>
  </section>`;

const genreLevel = htmlToElement(gameGenreScreen);

//  Игра на выбор исполнителя
const gameArtistScreen = `
<section class="game game--artist">
${header(1)}
    <section class="game__screen">
      <h2 class="game__title">Кто исполняет эту песню?</h2>
      <div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        <audio></audio>
      </div>

      <form class="game__artist">
        <div class="artist">
          <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-1" id="answer-1">
          <label class="artist__name" for="answer-1">
            <img class="artist__picture" src="http://placehold.it/134x134" alt="Пелагея">
            Пелагея
          </label>
        </div>

        <div class="artist">
          <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-2" id="answer-2">
          <label class="artist__name" for="answer-2">
            <img class="artist__picture" src="http://placehold.it/134x134" alt="Пелагея">
            Краснознаменная дивизия имени моей бабушки
          </label>
        </div>

        <div class="artist">
          <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-3" id="answer-3">
          <label class="artist__name" for="answer-3">
            <img class="artist__picture" src="http://placehold.it/134x134" alt="Пелагея">
            Lorde
          </label>
        </div>
      </form>
    </section>
  </section>`;

const artistLevel = htmlToElement(gameArtistScreen);

//  Результат игры: выигрыш
const resultSuccessScreen = htmlToElement(`
<section class="result">
<div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
<h2 class="result__title">Вы настоящий меломан!</h2>
<p class="result__total">За 3 минуты и 25 секунд вы набрали 12 баллов (8 быстрых), совершив 3 ошибки</p>
<p class="result__text">Вы заняли 2 место из 10. Это лучше чем у 80% игроков</p>
<button class="result__replay" type="button">Сыграть ещё раз</button>
</section>`);

//  Результат игры: проигрыш, время вышло
const failTriesScreen = htmlToElement(`
<section class="result">
  <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
  <h2 class="result__title">Увы и ах!</h2>
  <p class="result__total result__total--fail">Время вышло! Вы не успели отгадать все мелодии</p>
  <button class="result__replay" type="button">Попробовать ещё раз</button>
</section>`);

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

}());

//# sourceMappingURL=main.js.map
