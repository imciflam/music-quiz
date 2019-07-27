import { assert } from "chai";
import { QUESTIONS_COUNT, resultsCount } from "./game.data";

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
  }
];

describe(`Результаты игр`, () => {
  it(`игрок не ответил на ${QUESTIONS_COUNT} вопросов`, () => {
    assert.equal(-1, resultsCount(results[0]));
  });

  it(`игрок  ответил на ${QUESTIONS_COUNT} вопросов`, () => {
    assert.equal(10, resultsCount(results[1]));
  });

  it(`Игрок ответил правильно и не быстро на ${QUESTIONS_COUNT} вопросов, ни разу не ошибся`, () => {
    assert.equal(10, resultsCount(results[1]));
  });

  it(`Игрок ответил на не меньше, чем  ${QUESTIONS_COUNT} вопросов, ошибался`, () => {
    assert.notEqual(10, resultsCount(results[2]));
  });
});
