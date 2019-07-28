const QUESTIONS_COUNT = 10;
const FAST_ANSWER_PERIOD = 30;
const statistics = [];
const PRICE_OF_ERROR = 2;
const MAX_ERRORS_COUNT = 3;

const phrases = {
  timeIsUp: () => `Время вышло! Вы не успели отгадать все мелодии`,
  noMoreAttempts: () =>
    `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
  win: ({ place, playersCount, betterThan }) =>
    `Вы заняли ${place}-ое место из ${playersCount} игроков. Это лучше чем у ${betterThan} игроков`
};

const sum = arr => arr.reduce((acc, item) => acc + item);
const penalty = livesLeft => (MAX_ERRORS_COUNT - livesLeft) * PRICE_OF_ERROR;

export const resultsCount = ({ attempt, livesLeft }) => {
  let result = -1;

  if (attempt.length === QUESTIONS_COUNT) {
    result = sum(attempt) - penalty(livesLeft);
  }
  return result;
};

const getScore = ({ answers }) => {
  let score = -1;

  if (answers.length === QUESTIONS_COUNT) {
    score = answers
      .map(it => {
        let points = -2;
        if (it.isCorrect) {
          if (it.timeSpent < FAST_ANSWER_PERIOD) {
            points = 2;
          } else {
            points = 1;
          }
        }
        return points;
      })
      .reduce((acc, it) => acc + it);
  }
  return score;
};

const printResult = (games, game) => {
  const score = getScore(game);
  if (score < 0) {
    if (game.rest > 0) {
      return phrases.timeIsUp();
    } else {
      return phrases.noMoreAttempts();
    }
  }

  const gameId = +new Date();
  statistics.push({ score, gameId });
  const index = statistics
    .sort((a, b) => b - a)
    .filter((it, i) => (it.gameId === gameId ? i : null));

  if (index === null) {
    throw new Error(`Алгоритм сломалсо`);
  }
  const stats = {
    playersCount: statistics.length,
    place: index + 1,
    betterThan: ((stats.playersCount - stats.place) * 100) / stats.playersCount
  };
  return phrases.win(stats);
};

export { MAX_ERRORS_COUNT, getScore, printResult, QUESTIONS_COUNT };
