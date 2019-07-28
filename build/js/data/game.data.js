(function (exports) {
'use strict';

const QUESTIONS_COUNT = 10;

const PRICE_OF_ERROR = 2;
const MAX_ERRORS_COUNT = 3;
const sum = arr => arr.reduce((acc, item) => acc + item);
const penalty = livesLeft => (MAX_ERRORS_COUNT - livesLeft) * PRICE_OF_ERROR;

const resultsCount = ({ attempt, livesLeft }) => {
  let result = -1;

  if (attempt.length === QUESTIONS_COUNT) {
    result = sum(attempt) - penalty(livesLeft);
  }
  return result;
};

exports.QUESTIONS_COUNT = QUESTIONS_COUNT;
exports.resultsCount = resultsCount;

}((this.gameData = this.gameData || {})));

//# sourceMappingURL=game.data.js.map
