(function (exports) {
'use strict';

function htmlToElement(html) {
  const div = document.createElement(`div`);
  html = html.trim(); // remove whitespaces
  div.innerHTML = html;
  return div.firstChild;
}

const samples = [
  {
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  }, {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  }, {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  }, {
    artist: `Riot`,
    name: `	Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  }, {
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  }, {
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
    questions: [
      samples[0],
      samples[1],
      samples[2],
      samples[3]
    ],
    answer: `1000`
  }, {
    type: `Genre`,
    title: `Выберите Rock треки`,
    questions: [
      samples[0],
      samples[1],
      samples[2],
      samples[3]
    ],
    answer: `0110`
  }, {
    type: `Genre`,
    title: `Выберите Country треки`,
    questions: [
      samples[0],
      samples[1],
      samples[2],
      samples[3]
    ],
    answer: `0010`
  }, {
    type: `Genre`,
    title: `Выберите R&B треки`,
    questions: [
      samples[0],
      samples[1],
      samples[2],
      samples[3]
    ],
    answer: `0001`
  }, {
    type: `Genre`,
    title: `Выберите Pop треки`,
    questions: [
      samples[4],
      samples[1],
      samples[2],
      samples[3]
    ],
    answer: `1000`
  }, {
    type: `Genre`,
    title: `Выберите Electronic треки`,
    questions: [
      samples[0],
      samples[5],
      samples[2],
      samples[3]
    ],
    answer: `0100`
  }, {
    type: `Artist`,
    title: `Кто исполняет эту песню?`,
    questions: [
      samples[0],
      samples[1],
      samples[2]
    ],
    src: samples[0].src,
    answer: 0
  }, {
    type: `Artist`,
    title: `Кто исполняет эту песню?`,
    questions: [
      samples[1],
      samples[2],
      samples[3]
    ],
    src: samples[2].src,
    answer: 1
  }, {
    type: `Artist`,
    title: `Кто исполняет эту песню?`,
    questions: [
      samples[3],
      samples[2],
      samples[1]
    ],
    src: samples[1].src,
    answer: 2
  }, {
    type: `Artist`,
    title: `Кто исполняет эту песню?`,
    questions: [
      samples[0],
      samples[1],
      samples[2]
    ],
    src: samples[1].src,
    answer: 1
  }
];



const MAX_ERRORS_COUNT = 4;
 // 5 minutes + 1 second

const label = {
  GAME: `Угадай мелодию`,

  TITLE_WIN: `Вы настоящий меломан!`,
  TITLE_WELCOME: `Правила игры`,
  TITLE_FAIL_TIME: `Увы и ах!`,
  TITLE_FAIL_TRY: `Какая жалость!`,

  BUTTON_WELCOME: `Начать игру`,
  BUTTON_WIN: `Сыграть ещё раз`,
  BUTTON_FAIL: `Попробовать ещё раз`
};

const phrases = {
  timeIsUp: () => `Время вышло!<br>Вы не успели отгадать все мелодии`,
  noMoreAttempts: () =>
    `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`,
  win: ({place, playersCount, betterThan}) =>
    `Вы заняли ${place}-ое место из ${playersCount} игроков. Это&nbsp;лучше чем у&nbsp;${betterThan}%&nbsp;игроков`
};





const resultTime = {
  name: label.GAME,
  title: label.TITLE_FAIL_TIME,
  button: label.BUTTON_FAIL,
  content: phrases.timeIsUp(),
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
      ${questionsTemplate(levels$$1[6].questions)}
         
      </form>
    </section>
  </section>`;

const questionsTemplate = data => {
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

exports.artistLevel = artistLevel;

}((this.artistLevel = this.artistLevel || {})));

//# sourceMappingURL=artistLevel.js.map
