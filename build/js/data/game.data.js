(function (exports) {
'use strict';

const LEVELS_COUNT = 10;
const FAST_ANSWER_PERIOD = 30;
const MAX_ERRORS_COUNT = 4;
const TIME_FOR_GAME = 60 * 5 + 1; // 5 minutes + 1 second

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

const welcome = {
  name: Label.GAME,
  title: Label.TITLE_WELCOME,
  rules: [
    `Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.`,
    `Ошибиться можно 3 раза.`,
    `Удачи!`
  ],
  button: Label.BUTTON_WELCOME
};

const resultTry = {
  name: Label.GAME,
  title: Label.TITLE_FAIL_TRY,
  button: Label.BUTTON_FAIL,
  isWin: false
};

const resultTime = {
  name: Label.GAME,
  title: Label.TITLE_FAIL_TIME,
  button: Label.BUTTON_FAIL,
  content: phrase.timeIsUp(),
  isWin: false
};

const resultWin = {
  name: Label.GAME,
  title: Label.TITLE_WIN,
  button: Label.BUTTON_WIN,
  isWin: true
};

const initialGame = {
  level: -1,
  remainingAttempts: MAX_ERRORS_COUNT,
  time: TIME_FOR_GAME,
  answers: []
};

const tick = game => {
  game = Object.assign({}, game);
  game.time--;
  return game;
};

const getLevel = (index, allLevels) => allLevels[index];

const showNextLevel = (state, allLevels) => {
  const index = state.level + 1;
  if (!getLevel(index, allLevels)) {
    throw new RangeError(`Can't find level ${index}`);
  }
  state.level = index;
  return state;
};

const startGame = () => {
  showNextLevel();
};

const getScore = answers => {
  let score = -1;
  //if all answers were submitted
  if (answers.length === LEVELS_COUNT) {
    score = answers.reduce((acc, it) => {
      let point = -2;
      if (it.isCorrect) {
        //if faster than 30 s then +2 points
        point = it.timeSpent < FAST_ANSWER_PERIOD ? 2 : 1;
      }
      return acc + point;
    }, 0);
  }
  return score;
};

const getFastScore = answers => {
  const slowScore = answers.filter(
    it => it.isCorrect && it.timeSpent >= FAST_ANSWER_PERIOD
  ).length;
  return getScore(answers) - slowScore;
};

const getTimeSpent = answers => {
  let time = answers.reduce((acc, it) => {
    return acc + it.timeSpent;
  }, 0);
  return time;
};

const getPosition = (scoreBoard, score) => {
  // создаём из таблицы результатов, массив объектов: { position, score }
  const statisticsIndexed = scoreBoard.map(
    (scoreFromStaticstics, position) => ({
      position,
      score: scoreFromStaticstics
    })
  );

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

const printResult = (scoreBoard = [], game) => {
  let endGameMessage = ``;
  const score = getScore(game.answers);
  const time = getTimeSpent(game.answers);

  if (game.remainingAttempts > 0 && time < TIME_FOR_GAME) {
    // выйгрыш
    const position = getPosition(scoreBoard, score);
    scoreBoard.push(score);
    scoreBoard.sort((a, b) => b - a);

    resultWin.place = position + 1;
    resultWin.playersCount = scoreBoard.length;
    resultWin.betterThan = Math.round(
      ((scoreBoard.length - position - 1) * 100) / scoreBoard.length
    );

    endGameMessage = phrase.win(resultWin);
  } else {
    // проигрыш
    endGameMessage =
      time > TIME_FOR_GAME ? phrase.timeIsUp() : phrase.noMoreAttempts();
  }

  return endGameMessage;
};

exports.LEVELS_COUNT = LEVELS_COUNT;
exports.FAST_ANSWER_PERIOD = FAST_ANSWER_PERIOD;
exports.MAX_ERRORS_COUNT = MAX_ERRORS_COUNT;
exports.TIME_FOR_GAME = TIME_FOR_GAME;
exports.phrase = phrase;
exports.welcome = welcome;
exports.resultTry = resultTry;
exports.resultTime = resultTime;
exports.resultWin = resultWin;
exports.initialGame = initialGame;
exports.tick = tick;
exports.getLevel = getLevel;
exports.showNextLevel = showNextLevel;
exports.startGame = startGame;
exports.getScore = getScore;
exports.getFastScore = getFastScore;
exports.printResult = printResult;

}((this.gameData = this.gameData || {})));

//# sourceMappingURL=game.data.js.map
