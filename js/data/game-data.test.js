import assert from "assert";

import {
  LEVELS_COUNT,
  MAX_ERRORS_COUNT,
  getScore,
  printResult
} from "./game.data";
import Timer from "./timer";
import { games, statistics, gamesToTestInScoreboard } from "./game-data.mock";

const text = testData => `
  Игрок отвечал на ${
    testData.answers.length
  } вопрос(ов|а) из ${LEVELS_COUNT} вопросов.
  Сделал ${MAX_ERRORS_COUNT - testData.remainingAttempts} ошиб(ки|ок|ку).
  ${
    testData.points === -1
      ? `и проиграл`
      : `и набрал ${testData.points} балл(ов|а)`
  }
`;

describe(`Результаты игр`, () => {
  describe(`Функция подсчёта набранных баллов игрока`, () => {
    for (let game of games) {
      makeTest(game);
    }
    function makeTest(game) {
      it(text(game), () => {
        assert.equal(game.points, getScore(game.answers));
      });
    }
  });

  describe(`Функция вывода результата игрока`, () => {
    for (let game of gamesToTestInScoreboard) {
      makeTest(game);
    }
    function makeTest(game) {
      it(game.result, () => {
        assert.equal(game.result, printResult(statistics, game));
      });
    }
  });
});

describe(`Таймер`, () => {
  beforeEach(done => {
    Timer.stop();
    Timer.reset();
    done();
  });
  afterEach(() => {
    Timer.stop();
    Timer.reset();
  });

  it(`сброшен`, () => {
    assert.strictEqual(-1, Timer.time);
  });

  it(`стартовал`, () => {
    Timer.start();
    assert.strictEqual(0, Timer.time);
  });
});

describe(`Таймер`, function() {
  before(done => {
    Timer.stop();
    Timer.reset();
    Timer.start();

    Timer.tick();
    Timer.tick();
    Timer.tick();

    done();
  });

  it(`отсчитал три секунды`, () => {
    assert.strictEqual(3, Timer.time);
  });

  after(() => {
    Timer.stop();
    Timer.reset();
  });
});
