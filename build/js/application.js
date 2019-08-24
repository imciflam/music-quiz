var application = (function () {
'use strict';

// create an element
const createElement = template => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;
  return outer.firstElementChild
};

// select an element
const $$ = (selector, scope = window.document) => {
  return scope.querySelector(selector)
};

// get root element
const appElement = $$(`.app`);

// replace screen
const changeView = view => {
  appElement.replaceChild(view.element, $$(`section.main`));
};

// add event listener on some event
const $on = (eventName, callback, el = appElement) => {
  el.addEventListener(eventName, evt => {
    callback(evt);
  });
};
// create a custom event to be triggered on
const $trigger = (eventName, data = null) => {
  let customEvent = new CustomEvent(eventName, { detail: data });
  appElement.dispatchEvent(customEvent);
};

// base class
class AbstractView {
  get template() {
    throw new Error(`Provide template for view`);
  }

  render() {
    return createElement(this.template.trim());
  }
  bind() {} // notifies
  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind(); //bind to this
    }
    return this._element;
  }
}

class WelcomeView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    const { name, button, title, rules } = this.data;
    return `
<section class="main main--welcome">
  <section class="logo" title="${name}"><h1>${name}</h1></section>
  <button class="main-play">${button}</button>
  <h2 class="title main-title">${title}</h2>
  <p class="text main-text">${rules.reduce((str, it, index, arr) => {
    const linebreak = index < arr.length - 1 ? `<br>` : ``;
    it = it + linebreak;
    return str + it
  }, ``)}</p>
</section>`.trim()
  }

  // on button click, start game
  bind() {
    $on(`click`, () => $trigger(`start`), $$(`.main-play`, this.element));
  }

  onStart() {}
}

// todo: customize later
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
    title: `Choose Jazz tracks`,
    questions: [samples[0], samples[1], samples[2], samples[3]],
    answer: `1000`
  },
  {
    type: `Genre`,
    title: `Choose Rock tracks`,
    questions: [samples[0], samples[1], samples[2], samples[3]],
    answer: `0110`
  },
  {
    type: `Genre`,
    title: `Choose Country tracks`,
    questions: [samples[0], samples[1], samples[2], samples[3]],
    answer: `0010`
  },
  {
    type: `Genre`,
    title: `Choose R&B tracks`,
    questions: [samples[0], samples[1], samples[2], samples[3]],
    answer: `0001`
  },
  {
    type: `Genre`,
    title: `Choose Pop tracks`,
    questions: [samples[4], samples[1], samples[2], samples[3]],
    answer: `1000`
  },
  {
    type: `Genre`,
    title: `Choose Electronic tracks`,
    questions: [samples[0], samples[5], samples[2], samples[3]],
    answer: `0100`
  },
  {
    type: `Artist`,
    title: `Who performs this song?`,
    questions: [samples[0], samples[1], samples[2]],
    src: samples[0].src,
    answer: 0
  },
  {
    type: `Artist`,
    title: `Who performs this song?`,
    questions: [samples[1], samples[2], samples[3]],
    src: samples[2].src,
    answer: 1
  },
  {
    type: `Artist`,
    title: `Who performs this song?`,
    questions: [samples[3], samples[2], samples[1]],
    src: samples[1].src,
    answer: 2
  },
  {
    type: `Artist`,
    title: `Who performs this song?`,
    questions: [samples[0], samples[1], samples[2]],
    src: samples[1].src,
    answer: 1
  }
];

const LEVELS_COUNT = 10;
const FAST_ANSWER_PERIOD = 30;
const MAX_ERRORS_COUNT = 4;
const TIME_FOR_GAME = 60 * 5 + 1;

const label = {
  GAME: `Guess a melody`,

  TITLE_WIN: `You're a true music fan!`,
  TITLE_WELCOME: `Game rules`,
  TITLE_FAIL_TIME: `Alas..`,
  TITLE_FAIL_TRY: `Such a pity!`,

  BUTTON_WELCOME: `Start game`,
  BUTTON_WIN: `Play again`,
  BUTTON_FAIL: `Try again`
};

const phrases = {
  timeIsUp: () => `Time is up!<br>You didn't make it on time.`,
  noMoreAttempts: () =>
    `You have run out of attempts.<br>Better luck next time!`,
  win: ({ place, playersCount, betterThan }) =>
    `You've taken ${place} place out of ${playersCount} players. It's&nbsp;better than &nbsp;${betterThan}%&nbsp; other players' results`
};

const welcome = {
  name: label.GAME,
  title: label.TITLE_WELCOME,
  rules: [
    `Rules are simple&nbsp;— &nbsp;you have to answer all questions in 5 minites.`,
    `You can make 3 mistakes.`,
    `Good luck!`
  ],
  button: label.BUTTON_WELCOME
};

const resultTry = {
  name: label.GAME,
  title: label.TITLE_FAIL_TRY,
  button: label.BUTTON_FAIL,
  isWin: false
};

const resultTime = {
  name: label.GAME,
  title: label.TITLE_FAIL_TIME,
  button: label.BUTTON_FAIL,
  content: phrases.timeIsUp(),
  isWin: false
};

const resultWin = {
  name: label.GAME,
  title: label.TITLE_WIN,
  button: label.BUTTON_WIN,
  isWin: true
};

const scoreBoard = [];

const initialGame = {
  level: -1,
  remainingAttempts: MAX_ERRORS_COUNT,
  time: TIME_FOR_GAME,
  answers: []
};

// copy game object and reassign it
const tick = game => {
  game = Object.assign({}, game);
  game.time--;
  return game
};

const getLevel = (index, allLevels = levels) => allLevels[index];

const nextLevel = (state, allLevels = levels) => {
  const index = state.level + 1;
  if (!getLevel(index, allLevels)) {
    throw new RangeError(`Can't find level ${index}`)
  }
  state.level = index;
  return state
};



const getAllLevelsTypes = (allLevels = levels) => {
  return allLevels.map(level => level.type)
};

//copy game object and reassign it


const getScore = answers => {
  let score = -1;
  // if all questions were answered
  if (answers.length === LEVELS_COUNT) {
    score = answers.reduce((acc, it) => {
      let point = -2;
      if (it.isCorrect) {
        // if answer was fast
        point = it.timeSpent < FAST_ANSWER_PERIOD ? 2 : 1;
      }
      return acc + point
    }, 0);
  }
  return score
};

const getTimeSpent = answers => {
  let time = answers.reduce((acc, it) => {
    return acc + it.timeSpent
  }, 0);
  return time
};

// fetching scoreboard and creating array of objs from it, { position, score }
const getPosition = (statistics, score) => {
  const statisticsIndexed = statistics.map(
    (scoreFromStaticstics, position) => ({
      position,
      score: scoreFromStaticstics
    })
  );

  // push a new obj
  statisticsIndexed.push({
    position: null,
    score
  });

  // get new obj's position
  const position = statisticsIndexed
    .sort((a, b) => b.score - a.score)
    .reduce((acc, it, index) => {
      if (it.position === null) {
        acc = index;
      }
      return acc
    }, -1);

  if (position === -1) {
    throw new Error(`Can't define position in Scoreboard`)
  }
  return position
};

const printResult = (statistics, game) => {
  let endGameMessage = ``;
  const score = getScore(game.answers);
  const time = getTimeSpent(game.answers);

  //if time's not up && there's lives
  if (game.remainingAttempts > 0 && time < TIME_FOR_GAME) {
    const position = getPosition(statistics, score);
    statistics.push(score);
    statistics.sort((a, b) => b - a);

    const stats = {
      place: position + 1,
      playersCount: statistics.length,
      betterThan: Math.round(
        ((statistics.length - position - 1) * 100) / statistics.length
      )
    };
    endGameMessage = phrases.win(stats);
  } else {
    endGameMessage =
      time > TIME_FOR_GAME ? phrases.timeIsUp() : phrases.noMoreAttempts();
  }

  return endGameMessage
};

class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView(welcome);
  }

  init() {
    changeView(this.view);
  }
}

var welcomeScreen = new WelcomeScreen();

class GameModel {
  constructor(data = levels) {
    this.data = data;
  }

  // modify new object and return new state, react-style
  update(newState) {
    this.state = Object.assign({}, this.state, newState);
    return this.state
  }

  resetAnswers(state) {
    state.answers = [];
  }

  getCurrentLevel() {
    return getLevel(this.state.level, this.data)
  }

  nextLevel() {
    this.update(nextLevel(this.state, this.data));
  }

  tick() {
    this.update(tick(this.state));
  }

  getMistakes() {
    return MAX_ERRORS_COUNT - this.state.remainingAttempts
  }

  getLevelType() {
    return this.getCurrentLevel().type
  }

  getAllLevelsTypes() {
    return getAllLevelsTypes()
  }

  isLastLevel() {
    return this.state.level === LEVELS_COUNT - 1
  }

  win() {
    resultWin.content = printResult(scoreBoard, this.state);
    resultWin.score = getScore(this.state.answers);
    resultWin.errors = this.getMistakes();
  }
  failOnMistakes() {
    resultTry.content = printResult(scoreBoard, this.state);
  }
}

const mistakes = errors => {
  let mistakeElement = ``;
  if (errors > 0) {
    // create 1 note for each mistake and clump them together
    while (errors) {
      mistakeElement += `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;
      errors--;
    }
  }
  return mistakeElement
};

class HeaderView extends AbstractView {
  constructor(errors, time) {
    super();
    this.errors = errors;
    this.time = time;
  }

  get template() {
    const minutes = parseInt(this.time / 60, 10);
    const seconds = this.time - minutes * 60;
    const zero = value => (value < 10 ? `0` : ``); //show 0 if no left
    return `
<header>
  <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
    <circle
      cx="390" cy="390" r="370"
      class="timer-line"
      style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

    <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins">${zero(minutes)}${minutes}</span><!--
      --><span class="timer-value-dots">:</span><!--
      --><span class="timer-value-secs">${zero(seconds)}${seconds}</span>
    </div>
  </svg>
  <div class="main-mistakes">
    ${mistakes(this.errors)}
  </div>
</header>`
  }
}

class LevelGenreView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    const { title, questions } = this.level;

    const questionsTemplate = data => {
      return data.reduce((string, it, index) => {
        const n = index++;
        const itemTemplate = `
<div class="genre-answer">
  <div class="player-wrapper">
    <div class="player">
      <audio src="${it.src}"></audio>
      <button class="player-control player-control--play"></button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>
  </div>
  <input type="checkbox" name="answer" value="answer-${n}" id="a-${n}">
  <label class="genre-answer-check" for="a-${n}"></label>
</div>`;
        return string + itemTemplate
      }, ``)
    };

    return `
<section class="main main--level main--level-genre">
  <div class="main-wrap">
    <h2 class="title">${title}</h2>
    <form class="genre">

      ${questionsTemplate(questions)}

      <button class="genre-answer-send" type="submit" disabled>Answer</button>
    </form>
  </div>
</section>`.trim()
  }

  bind() {
    const answerButton = $$(`.genre-answer-send`, this.element);

    const checkboxes = [
      ...this.element.querySelectorAll(`.genre-answer input[type="checkbox"]`)
    ];

    checkboxes.forEach(checkbox => {
      $on(
        `change`,
        () => {
          if (checkboxes.some(it => it.checked)) {
            // if at least 1 checkbox checked, unblock button
            answerButton.removeAttribute(`disabled`);
          } else {
            answerButton.setAttribute(`disabled`, `disabled`); // maybe add alert later?
          }
        },
        checkbox
      );
    });

    $on(`click`, evt => this.handlerAnswer(evt), answerButton);
  }

  handlerAnswer(evt) {
    evt.preventDefault();
    const answers = [...evt.target.form.elements.answer];
    $trigger(`answerGenre`, answers); // new event
  }
}

class LevelArtistView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    const { title, questions, src } = this.level;

    const questionsTemplate = data => {
      // for each element in data - template
      return data.reduce((string, it, index) => {
        const n = index++;
        const itemTemplate = `
<div class="main-answer-wrapper">
  <input class="main-answer-r" type="radio" id="answer-${n}" name="answer" value="val-${n}"/>
  <label class="main-answer" for="answer-${n}">
    <img class="main-answer-preview" src="${it.image}"
        alt="${it.artist}" width="134" height="134">
    ${it.artist}
  </label>
</div>`.trim();
        return string + itemTemplate
      }, ``)
    };
    // autoplay, so audio plays automatically
    return `
<section class="main main--level main--level-genre">
  <div class="main-wrap">
    <h2 class="title main-title">${title}</h2>
    <div class="player-wrapper">
      <div class="player">
        <audio src="${src}" loop autoplay></audio>
        <button class="player-control player-control--pause"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>
    <form class="main-list">

      ${questionsTemplate(questions)}

    </form>
  </div>
</section>`.trim()
  }

  bind() {
    const buttons = [...this.element.querySelectorAll(`.main-answer-r`)];
    buttons.forEach(button => {
      $on(
        `change`, // change event fired off
        () => {
          const answer = button.form.elements.answer.value;
          $trigger(`answerArtist`, answer); // new event created
        },
        button
      );
    });
  }
}

const audio = {
  BUTTON: `player-control`,
  PLAY: `player-control--pause`,
  PAUSE: `player-control--play`
};

class GameView extends AbstractView {
  constructor(model) {
    super();
    this.model = model;
  }

  get template() {
    return `<section class="main"></section>`
  }

  bind() {
    return super.bind()
  }

  bindAudioHandler() {
    [...this.level.element.querySelectorAll(`.${audio.BUTTON}`)].forEach(
      button => {
        $on(`click`, evt => this.audioHandler(evt), button);
      }
    );
  }

  get view() {
    return {
      Genre(level) {
        return new LevelGenreView(level)
      },
      Artist(level) {
        return new LevelArtistView(level)
      }
    }
  }

  updateLevel(type) {
    this.level = this.view[type](this.model.getCurrentLevel());
    this.bindAudioHandler();
    changeView(this.level);
    this.updateHeader();
  }

  updateHeader() {
    const header = new HeaderView(
      this.model.getMistakes(),
      this.model.state.time
    );
    const headerElement = $$(`section.main > header`); // for old structure
    if (headerElement !== null) {
      headerElement.remove();
    }
    $$(`section.main`).prepend(header.element);
  }

  audioHandler(evt) {
    if (evt && evt.target) {
      evt.preventDefault();
      const el = evt.target;
      if (el.classList.contains(audio.PAUSE)) {
        // play
        [...this.level.element.querySelectorAll(`.${audio.PLAY}`)].forEach(
          button => {
            button.classList.remove(audio.PLAY);
            button.classList.add(audio.PAUSE);
            button.previousElementSibling.pause();
          }
        );
        el.classList.remove(audio.PAUSE);
        el.classList.add(audio.PLAY);
        el.previousElementSibling.play();
      } else {
        // pause
        el.classList.remove(audio.PLAY);
        el.classList.add(audio.PAUSE);
        el.previousElementSibling.pause();
      }
    }
  }
}

class GameScreen {
  constructor(data = levels) {
    this.model = new GameModel(data);
    this.view = new GameView(this.model);
    $on(`answerGenre`, evt => this.answerGenreHandler(evt));
    $on(`answerArtist`, evt => this.answerArtistHandler(evt));
  }

  init(state = initialGame) {
    this.model.resetAnswers(state);
    this.model.update(state);
    this.model.nextLevel();
    this.changeLevel(this.model.getLevelType());
  }

  setAnswer(answer) {
    const answerObj = {
      isCorrect: answer === levels[this.model.state.level].answer,
      timeSpent: 20
    };
    const answers = this.model.state.answers;
    answers.push(answerObj);
    let remainingAttempts = this.model.state.remainingAttempts;
    if (!answerObj.isCorrect) {
      remainingAttempts--;
    }

    this.model.update({
      answers,
      remainingAttempts
    });
  }

  setGame() {
    if (
      this.model.isLastLevel() &&
      this.model.getMistakes() < MAX_ERRORS_COUNT
    ) {
      // if last level + enough lives left
      this.model.win();
      // Application.win();
      Application.showResult(`WIN`);
    } else if (this.model.getMistakes() >= MAX_ERRORS_COUNT) {
      // too many mistakes
      this.model.failOnMistakes();
      // Application.failOnMistakes();
      Application.showResult(`TRY`);
    } else {
      this.model.nextLevel();
      this.changeLevel(this.model.getLevelType());
    }
  }

  changeLevel(type) {
    this.view.updateLevel(type);
  }

  tick() {
    this.model.tick();
    this.view.updateHeader();

    if (this.model.state.time <= 0) {
      // Application.failNoMoreTime();
      Application.showResult(`TIME`);
    } else {
      this.timer = setTimeout(() => this.tick(), 1000);
    }
  }

  stopTimer() {
    clearTimeout(this.timer);
  }

  answerGenreHandler(evt) {
    const answers = evt.detail;
    let answerMask = ``;
    for (let answer of answers) {
      answerMask += answer.checked ? 1 : 0;
    }
    this.setAnswer(answerMask);
    this.setGame();
  }

  answerArtistHandler(evt) {
    const answer = +evt.detail.split(`-`)[1];
    this.setAnswer(answer);
    this.setGame();
  }
}

class ResultView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    const { name, button, title, content, isWin, score, errors } = this.data;
    const winText = `
In&nbsp;3&nbsp;m и 25&nbsp;s
<br>you&nbsp;got ${score} points (8 quick)
<br>made ${errors} errors`;

    return `
<section class="main main--result">
  <section class="logo" title="${name}"><h1>${name}</h1></section>

  <h2 class="title">${title}</h2>
  <div class="main-stat">
    ${isWin ? winText : content}
  </div>
  ${isWin ? `<span class="main-comparison">${content}</span>` : ``}
  <span role="button" tabindex="0" class="main-replay">${button}</span>
</section>`.trim()
  }

  bind() {
    $on(`click`, () => $trigger(`replay`), $$(`.main-replay`, this.element));
  }
}

class ResultScreen {
  constructor(data) {
    this.view = new ResultView(data);
  }

  init() {
    changeView(this.view);
  }
}

const resultData = {
  TRY: resultTry,
  TIME: resultTime,
  WIN: resultWin
};

class Application {
  static init(data) {
    welcomeScreen.init();
    Application.game = new GameScreen(data);
    $on(`start`, Application.startGame);
    $on(`replay`, Application.startGame);
  }

  static startGame(evt, state = initialGame) {
    Application.game.init(state);
    Application.game.tick();
  }

  static showResult(type) {
    Application.game.stopTimer();
    const resultScreen = new ResultScreen(resultData[type]);
    resultScreen.init();
  }
}

Application.init(levels);

return Application;

}());

//# sourceMappingURL=application.js.map
