import {
  getLevel,
  nextLevel,
  printResult,
  getScore,
  getAllLevelsTypes,
  scoreBoard,
  tick,
  levels as levelsData,
  resultWin as resultWinData,
  resultTry as resultTryData,
  MAX_ERRORS_COUNT,
  LEVELS_COUNT,
  TIME_FOR_GAME,
  getFastScore
} from "../data/game.data";

export default class GameModel {
  constructor(data = levelsData) {
    this.data = data;
  }

  // modify new object and return new state, react-style
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
    resultWinData.content = printResult(scoreBoard, this.state);
    console.log(resultWinData.content);
    resultWinData.score = getScore(this.state.answers);
    resultWinData.errors = this.getMistakes();
    resultWinData.time = TIME_FOR_GAME - this.state.time;
    console.log(resultWinData.time);
    resultWinData.fastScore = getFastScore(this.state.answers);
    console.log(resultWinData.fastScore);
  }
  failOnMistakes() {
    resultTryData.content = printResult(scoreBoard, this.state);
  }
}
