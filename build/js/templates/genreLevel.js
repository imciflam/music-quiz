(function (exports) {
'use strict';

function htmlToElement(html) {
  const div = document.createElement(`div`);
  html = html.trim(); // remove whitespaces
  div.innerHTML = html;
  return div.firstChild;
}

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



















const levels = [
  // {
  //   type: `artist`,
  //   levelName: `Who is performing this song?`,
  //   options: [`Пелагея`, `Краснознаменная дивизия имени моей бабушки`, `Lorde`],
  //   answer: 2
  // },
  // {
  //   type: `artist`,
  //   levelName: `Who is performing this song?`,
  //   options: [`Пелагея`, `Краснознаменная дивизия имени моей бабушки`, `Lorde`],
  //   answer: 2
  // },
  // {
  //   type: `artist`,
  //   levelName: `Who is performing this song?`,
  //   options: [`Пелагея`, `Краснознаменная дивизия имени моей бабушки`, `Lorde`],
  //   answer: 2
  // },
  // {
  //   type: `artist`,
  //   levelName: `Who is performing this song?`,
  //   options: [`Пелагея`, `Краснознаменная дивизия имени моей бабушки`, `Lorde`],
  //   answer: 2
  // },
  // {
  //   type: `artist`,
  //   levelName: `Who is performing this song?`,
  //   options: [`Пелагея`, `Краснознаменная дивизия имени моей бабушки`, `Lorde`],
  //   answer: 2
  // },
  // {
  //   type: `Genre`,
  //   title: `Choose rock tracks`,
  //   questions: [
  //     {
  //       url: `url1`
  //     },
  //     {
  //       url: `url2`
  //     }
  //   ],
  //   answer: `01`
  // },
  {
    type: `Genre`,
    title: `Choose rock tracks`,
    questions: [
      {
        url: `url1`
      },
      {
        url: `url2`
      }
    ],
    answer: `01`
  },
  {
    type: `Genre`,
    title: `Choose rock tracks`,
    questions: [
      {
        url: `url1`
      },
      {
        url: `url2`
      }
    ],
    answer: `01`
  },
  {
    type: `Genre`,
    title: `Choose rock tracks`,
    questions: [
      {
        url: `url1`
      },
      {
        url: `url2`
      }
    ],
    answer: `01`
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
      <h2 class="game__title">Выберите инди-рок треки</h2>
      <form class="game__tracks"> 
        
      ${questionsTemplate(levels$$1)}
 

        <button class="game__submit button" type="submit"  >Ответить</button>
      </form>
    </section>
  </section>`;

const questionsTemplate = levels$$1 => {
  return levels$$1.reduce((string, it, index) => {
    const n = index++;
    const itemTemplate = `
   
    <div class="track">
    <button class="track__button track__button--play" type="button"></button>
    <div class="track__status">
      <audio></audio>
    </div>
    <div class="game__answer">
      <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1"  id="answer-4">
      <label class="game__check " for="answer-4">Отметить</label>
    </div>
  </div>`;

    return string + itemTemplate;
  }, ``);
};

const genreLevel = htmlToElement(gameGenreScreen(levels, 1));

exports.genreLevel = genreLevel;

}((this.genreLevel = this.genreLevel || {})));

//# sourceMappingURL=genreLevel.js.map
