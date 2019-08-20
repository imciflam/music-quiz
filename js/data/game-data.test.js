import assert from 'assert';
import {
  LEVELS_COUNT,
  MAX_ERRORS_COUNT,
  getScore,
  printResult,
  Timer
} from './game.data';
import {
  games,
  statisctics,
  gamesToTestInScoreboard
} from './game-data.mock';

const text = (testData) => `
  Игрок отвечал на ${testData.answers.length} вопрос(ов|а) из ${LEVELS_COUNT} вопросов.
  Сделал ${MAX_ERRORS_COUNT - testData.remainingAttempts} ошиб(ки|ок|ку).
  ${testData.points === -1
    ? `и проиграл`
    : `и набрал ${testData.points} балл(ов|а)`}
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
        assert.equal(game.result,
            printResult(statisctics, game));
      });
    }
  });
});

const TIME = 4;
const timer = new Timer(TIME);

describe(`Таймер в 5 щелчков`, () => {
  for (let t of [4, 3, 2, 1, 0]) {
    makeTest(t);
  }
  function makeTest(t) {
    it(`Щелчок №${TIME + 1 - t}: `, () => {
      assert.equal(t, timer.time);
      if (t > 0) {
        assert(!timer.isFinished);
      }
      if (t === 0) {
        assert(timer.isFinished);
      }
      timer.tick();
    });
  }
});

