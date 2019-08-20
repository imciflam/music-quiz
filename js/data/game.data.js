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

export const levels = [
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

export const LEVELS_COUNT = 10;
export const FAST_ANSWER_PERIOD = 30;
export const MAX_ERRORS_COUNT = 4;
export const TIME_FOR_GAME = 60 * 5 + 1; // 5 minutes + 1 second

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

export const welcome = {
  name: label.GAME,
  title: label.TITLE_WELCOME,
  rules: [
    `Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.`,
    `Ошибиться можно 3 раза.`,
    `Удачи!`
  ],
  button: label.BUTTON_WELCOME
};

export const resultTry = {
  name: label.GAME,
  title: label.TITLE_FAIL_TRY,
  button: label.BUTTON_FAIL,
  isWin: false
};

export const resultTime = {
  name: label.GAME,
  title: label.TITLE_FAIL_TIME,
  button: label.BUTTON_FAIL,
  content: phrases.timeIsUp(),
  isWin: false
};

export const resultWin = {
  name: label.GAME,
  title: label.TITLE_WIN,
  button: label.BUTTON_WIN,
  isWin: true
};

export const scoreBoard = [];

export const initialGame = {
  level: -1,
  remainingAttempts: MAX_ERRORS_COUNT,
  time: TIME_FOR_GAME,
  answers: []
};

export const tick = (game) => {
  game = Object.assign({}, game);
  game.time--;
  return game;
};

export const getLevel = (index, allLevels = levels) => allLevels[index];

export const nextLevel = (state, allLevels = levels) => {
  const index = state.level + 1;
  if (!getLevel(index, allLevels)) {
    throw new RangeError(`Can't find level ${index}`);
  }
  state.level = index;
  return state;
};

export const startGame = () => {
  nextLevel();
};

export const getAllLevelsTypes = (allLevels = levels) => {
  return allLevels.map((level) => level.type);
};

export const setLives = (game, lives) => {
  if (lives < 0) {
    throw new RangeError(`Can't set negative lives`);
  }
  game = Object.assign({}, game);
  game.lives = lives;
  return game;
};

export const getScore = (answers) => {
  let score = -1;

  if (answers.length === LEVELS_COUNT) {
    score = answers.reduce((acc, it) => {
      let point = -2;
      if (it.isCorrect) {
        point = (it.timeSpent < FAST_ANSWER_PERIOD) ? 2 : 1;
      }
      return acc + point;
    }, 0);
  }
  return score;
};

const getTimeSpent = (answers) => {
  let time = answers.reduce((acc, it) => {
    return acc + it.timeSpent;
  }, 0);
  return time;
};

const getPosition = (statistics, score) => {
  // создаём из таблицы результатов, массив объектов: { position, score }
  const statisticsIndexed = statistics
      .map((scoreFromStaticstics, position) => ({
        position,
        score: scoreFromStaticstics
      }));

  // кладём в таблицу результат новой игры
  statisticsIndexed.push({
    position: null,
    score
  });

  // получаем позицию новой игры в таблице результатов
  const position = statisticsIndexed
      .sort((a, b) => b.score - a.score)
      .reduce((acc, it, index) => {
        if (it.position === null) {
          acc = index;
        }
        return acc;
      }, -1);

  if (position === -1) {
    throw new Error(`Can't define position in Scoreboard`);
  }
  return position;
};

export const printResult = (statistics, game) => {
  let endGameMessage = ``;
  const score = getScore(game.answers);
  const time = getTimeSpent(game.answers);

  if (game.remainingAttempts > 0 && time < TIME_FOR_GAME) {
    // выйгрыш
    const position = getPosition(statistics, score);
    statistics.push(score);
    statistics.sort((a, b) => b - a);

    const stats = {
      place: position + 1,
      playersCount: statistics.length,
      betterThan: Math.round((statistics.length - position - 1) * 100 / statistics.length)
    };
    endGameMessage = phrases.win(stats);

  } else {
    // проигрыш
    endGameMessage = (time > TIME_FOR_GAME) ? phrases.timeIsUp() : phrases.noMoreAttempts();
  }

  return endGameMessage;
};

export class Timer {
  constructor(time) {
    this.time = time;
  }

  get isFinished() {
    return this.time < 1;
  }

  get time() {
    return this._time;
  }

  set time(value) {
    this._time = value;
  }

  tick() {
    this.time--;
  }
}
