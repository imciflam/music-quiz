import { assert } from "chai";
import { QUESTIONS_COUNT, resultsCount, printResult } from "./game.data";

const results = [
  {
    attempt: [1, 2, -2],
    livesLeft: 1
  },
  {
    attempt: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    livesLeft: 3
  },
  {
    attempt: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    livesLeft: 1
  },
  {
    attempt: [3, 1, 1, 1, 1, 1, 3, 1, 1, 1],
    livesLeft: 3
  }
];

describe(`Результаты игр`, () => {
  it(`игрок не ответил на ${QUESTIONS_COUNT} вопросов`, () => {
    assert.equal(-1, resultsCount(results[0]));
  });

  it(`игрок  ответил на ${QUESTIONS_COUNT} вопросов`, () => {
    assert.equal(10, resultsCount(results[1]));
  });

  it(`Игрок ответил на не меньше, чем  ${QUESTIONS_COUNT} вопросов, ошибался`, () => {
    assert.notEqual(10, resultsCount(results[2]));
  });

  it(`игрок  ответил на ${QUESTIONS_COUNT} вопросов, подсчитать очки`, () => {
    assert.equal(14, resultsCount(results[3]));
  });
});

const gamesToPlaceInScoreboard = [
  {
    answers: [
      { isCorrect: true, timeSpent: 40 },
      { isCorrect: false, timeSpent: 20 },
      { isCorrect: false, timeSpent: 10 }
    ],
    rest: 3,
    result: `Время вышло! Вы не успели отгадать все мелодии`
  },
  {
    answers: [
      { isCorrect: true, timeSpent: 100 },
      { isCorrect: false, timeSpent: 10 },
      { isCorrect: false, timeSpent: 10 },
      { isCorrect: false, timeSpent: 10 },
      { isCorrect: false, timeSpent: 10 }
    ],
    rest: 0,
    result: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`
  }
];

describe(`Результаты игр`, () => {
  describe(`Функция вывода результата игрока`, () => {
    for (let game of gamesToPlaceInScoreboard) {
      makeTest(game);
    }
    function makeTest(game) {
      it(game.result, () => {
        assert.equal(game.result, printResult(gamesToPlaceInScoreboard, game));
      });
    }
  });
});
