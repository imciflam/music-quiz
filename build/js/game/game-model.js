var gameModel = (function () {
'use strict';

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

const LEVELS_COUNT = 10;
const FAST_ANSWER_PERIOD = 30;
const MAX_ERRORS_COUNT = 4;
const TIME_FOR_GAME = 60 * 5 + 1; // 5 minutes + 1 second

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



const tick = (game) => {
  game = Object.assign({}, game);
  game.time--;
  return game;
};

const getLevel = (index, allLevels = levels) => allLevels[index];

const nextLevel = (state, allLevels = levels) => {
  const index = state.level + 1;
  if (!getLevel(index, allLevels)) {
    throw new RangeError(`Can't find level ${index}`);
  }
  state.level = index;
  return state;
};



const getAllLevelsTypes = (allLevels = levels) => {
  return allLevels.map((level) => level.type);
};



const getScore = (answers) => {
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

const printResult = (statistics, game) => {
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

class GameModel {
  constructor(data = levels) {
    this.data = data;
  }

  update(newState) {
    this.state = Object.assign({}, this.state, newState);
    return this.state;
  }

  resetAnswers(state) {
    state.answers = [];
  }

  getCurrentLevel() {
    return getLevel(this.state.level, this.data);
  }

  nextLevel() {
    this.update(nextLevel(this.state, this.data));
  }

  tick() {
    this.update(tick(this.state));
  }

  getMistakes() {
    return MAX_ERRORS_COUNT - this.state.remainingAttempts;
  }

  getLevelType() {
    return this.getCurrentLevel().type;
  }

  getAllLevelsTypes() {
    return getAllLevelsTypes();
  }

  isLastLevel() {
    return this.state.level === LEVELS_COUNT - 1;
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

return GameModel;

}());

//# sourceMappingURL=game-model.js.map
