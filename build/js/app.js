var app = (function () {
'use strict';

function htmlToElement(html) {
  const div = document.createElement(`div`);
  html = html.trim(); // remove whitespaces
  div.innerHTML = html;
  return div.firstChild;
}

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


















const samples = [
  {
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    artist: `Riot`,
    name: `	Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
    artist: `Gunnar Olsen`,
    name: `Home Stretch`,
    image: `https://f4.bcbits.com/img/0004181452_10.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Electronic`
  }
];

const levels = [
  {
    type: `Genre`,
    title: `Выберите Jazz треки`,
    questions: [samples[0], samples[1], samples[2], samples[3]],
    answer: `1000`
  },
  {
    type: `Genre`,
    title: `Выберите Rock треки`,
    questions: [samples[0], samples[1], samples[2], samples[3]],
    answer: `0110`
  },
  {
    type: `Genre`,
    title: `Выберите Country треки`,
    questions: [samples[0], samples[1], samples[2], samples[3]],
    answer: `0010`
  },
  {
    type: `Genre`,
    title: `Выберите R&B треки`,
    questions: [samples[0], samples[1], samples[2], samples[3]],
    answer: `0001`
  },
  {
    type: `Genre`,
    title: `Выберите Pop треки`,
    questions: [samples[4], samples[1], samples[2], samples[3]],
    answer: `1000`
  },
  {
    type: `Genre`,
    title: `Выберите Electronic треки`,
    questions: [samples[0], samples[5], samples[2], samples[3]],
    answer: `0100`
  },
  {
    type: `Artist`,
    title: `Кто исполняет эту песню?`,
    questions: [samples[0], samples[1], samples[2]],
    src: samples[0].src,
    answer: 0
  },
  {
    type: `Artist`,
    title: `Кто исполняет эту песню?`,
    questions: [samples[1], samples[2], samples[3]],
    src: samples[2].src,
    answer: 1
  },
  {
    type: `Artist`,
    title: `Кто исполняет эту песню?`,
    questions: [samples[3], samples[2], samples[1]],
    src: samples[1].src,
    answer: 2
  },
  {
    type: `Artist`,
    title: `Кто исполняет эту песню?`,
    questions: [samples[0], samples[1], samples[2]],
    src: samples[1].src,
    answer: 1
  }
];

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

const gameGenreScreen = (levels$$1, remainingAttempts) => `
<section class="game game--genre">
${header(remainingAttempts)}
    <section class="game__screen">
      <h2 class="game__title">${levels$$1[0].title}</h2>
      <form class="game__tracks">
      ${questionsTemplate(levels$$1[0].questions)}
        <button class="game__submit button" type="submit"  >Ответить</button>
      </form>
    </section>
  </section>`;

const questionsTemplate = levels$$1 => {
  return levels$$1.reduce((string, it, index) => {
    console.log(it);
    const n = index++;
    const itemTemplate = `
    <div class="track">
          <button class="track__button track__button--play" type="button"></button>
          <div class="track__status">            
          <audio src="${it.src}"></audio>
          </div>
          <div class="game__answer">
            <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-${n}" id="answer-${n}">
            <label class="game__check" for="answer-${n}">Отметить</label>
          </div>
        </div>`;

    return string + itemTemplate;
  }, ``);
};

const genreLevel = htmlToElement(gameGenreScreen(levels, 1));

const gameArtistScreen = (levels$$1, remainingAttempts) => `
<section class="game game--artist">
${header(remainingAttempts)}
    <section class="game__screen">
      <h2 class="game__title">${levels$$1[6].title}</h2>
      <div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        <audio loop autoplay src="${levels$$1[6].src}"></audio>
      </div>

      <form class="game__artist">
      ${questionsTemplate$1(levels$$1[6].questions)}
         
      </form>
    </section>
  </section>`;

const questionsTemplate$1 = data => {
  console.log(data);
  return data.reduce((string, it, index) => {
    const n = index++;
    const itemTemplate = `
      <div class="artist">
        <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-${n}" id="answer-${n}">
        <label class="artist__name" for="answer-${n}">
          <img class="artist__picture" src="${it.image}" alt="${it.artist}">
          ${it.artist}
        </label>
      </div> `;

    return string + itemTemplate;
  }, ``);
};

const artistLevel = htmlToElement(gameArtistScreen(levels, 1));

const resultSuccessScreen = htmlToElement(`
<section class="result">
<div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
<h2 class="result__title">Вы настоящий меломан!</h2>
<p class="result__total">За 3 минуты и 25 секунд вы набрали 12 баллов (8 быстрых), совершив 3 ошибки</p>
<p class="result__text">Вы заняли 2 место из 10. Это лучше чем у 80% игроков</p>
<button class="result__replay" type="button">Сыграть ещё раз</button>
</section>`);

const failTriesScreen = htmlToElement(`
<section class="result">
  <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
  <h2 class="result__title">Увы и ах!</h2>
  <p class="result__total result__total--fail">Время вышло! Вы не успели отгадать все мелодии</p>
  <button class="result__replay" type="button">Попробовать ещё раз</button>
</section>`);

const URL = `https://es.dump.academy/guess-melody`;

class Loader {
  getLevels() {
    return fetch(`${URL}/questions`)
      .then(response => {
        if (response.ok) {
          console.log(response);
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Request ${URL}/questions failed.`);
        }
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      })
      .then(data => {
        return data;
      });
  }
}

const linkAddresses = Object.freeze({
  WELCOMESCREEN: ``,
  GAME: `game`,
  RESULTSCREEN: `result`
});

class App {
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
    returnButton.addEventListener(`click`, () => {
      this.slider(0);
    });
  }

  slider(slideNumbers) {
    switch (slideNumbers) {
      case 0:
        while (this.main.firstChild) {
          this.main.removeChild(this.main.firstChild);
        }
        this.main.appendChild(welcomeScreen);
        break;
      case 1: {
        //static, so call class method
        Loader.getLevels().then(data => {
          console.log(data);
        });
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
        this.returner();
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
        this.returner();
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

return App;

}());

//# sourceMappingURL=app.js.map
