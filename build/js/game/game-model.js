var gameModel = (function () {
'use strict';

// todo: customize later
const samples = [
  {
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    artist: `Riot`,
    name: `	Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
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
    title: `Choose Jazz tracks`,
    questions: [samples[0], samples[1], samples[2], samples[3]],
    answer: `1000`
  },
  {
    type: `Genre`,
    title: `Choose Rock tracks`,
    questions: [samples[0], samples[1], samples[2], samples[3]],
    answer: `0110`
  },
  {
    type: `Genre`,
    title: `Choose Country tracks`,
    questions: [samples[0], samples[1], samples[2], samples[3]],
    answer: `0010`
  },
  {
    type: `Genre`,
    title: `Choose R&B tracks`,
    questions: [samples[0], samples[1], samples[2], samples[3]],
    answer: `0001`
  },
  {
    type: `Genre`,
    title: `Choose Pop tracks`,
    questions: [samples[4], samples[1], samples[2], samples[3]],
    answer: `1000`
  },
  {
    type: `Genre`,
    title: `Choose Electronic tracks`,
    questions: [samples[0], samples[5], samples[2], samples[3]],
    answer: `0100`
  },
  {
    type: `Artist`,
    title: `Who performs this song?`,
    questions: [samples[0], samples[1], samples[2]],
    src: samples[0].src,
    answer: 0
  },
  {
    type: `Artist`,
    title: `Who performs this song?`,
    questions: [samples[1], samples[2], samples[3]],
    src: samples[2].src,
    answer: 1
  },
  {
    type: `Artist`,
    title: `Who performs this song?`,
    questions: [samples[3], samples[2], samples[1]],
    src: samples[1].src,
    answer: 2
  },
  {
    type: `Artist`,
    title: `Who performs this song?`,
    questions: [samples[0], samples[1], samples[2]],
    src: samples[1].src,
    answer: 1
  }
];

const LEVELS_COUNT = 10;
const FAST_ANSWER_PERIOD = 30;
const MAX_ERRORS_COUNT = 4;
const TIME_FOR_GAME = 60 * 5 + 1;

const label = {
  GAME: `Guess a melody`,

  TITLE_WIN: `You're a true music fan!`,
  TITLE_WELCOME: `Game rules`,
  TITLE_FAIL_TIME: `Alas..`,
  TITLE_FAIL_TRY: `Such a pity!`,

  BUTTON_WELCOME: `Start game`,
  BUTTON_WIN: `Play again`,
  BUTTON_FAIL: `Try again`
};

const phrases = {
  timeIsUp: () => `Time is up!<br>You didn't make it on time.`,
  noMoreAttempts: () =>
    `You have run out of attempts.<br>Better luck next time!`,
  win: ({ place, playersCount, betterThan }) =>
    `You've taken ${place} place out of ${playersCount} players. It's&nbsp;better than &nbsp;${betterThan}%&nbsp; other players' results`
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



// copy game object and reassign it
const tick = game => {
  game = Object.assign({}, game);
  game.time--;
  return game
};

const getLevel = (index, allLevels = levels) => allLevels[index];

const nextLevel = (state, allLevels = levels) => {
  const index = state.level + 1;
  if (!getLevel(index, allLevels)) {
    throw new RangeError(`Can't find level ${index}`)
  }
  state.level = index;
  return state
};



const getAllLevelsTypes = (allLevels = levels) => {
  return allLevels.map(level => level.type)
};

//copy game object and reassign it


const getScore = answers => {
  let score = -1;
  // if all questions were answered
  if (answers.length === LEVELS_COUNT) {
    score = answers.reduce((acc, it) => {
      let point = -2;
      if (it.isCorrect) {
        // if answer was fast
        point = it.timeSpent < FAST_ANSWER_PERIOD ? 2 : 1;
      }
      return acc + point
    }, 0);
  }
  return score
};

const getTimeSpent = answers => {
  let time = answers.reduce((acc, it) => {
    return acc + it.timeSpent
  }, 0);
  return time
};

// fetching scoreboard and creating array of objs from it, { position, score }
const getPosition = (statistics, score) => {
  const statisticsIndexed = statistics.map(
    (scoreFromStaticstics, position) => ({
      position,
      score: scoreFromStaticstics
    })
  );

  // push a new obj
  statisticsIndexed.push({
    position: null,
    score
  });

  // get new obj's position
  const position = statisticsIndexed
    .sort((a, b) => b.score - a.score)
    .reduce((acc, it, index) => {
      if (it.position === null) {
        acc = index;
      }
      return acc
    }, -1);

  if (position === -1) {
    throw new Error(`Can't define position in Scoreboard`)
  }
  return position
};

const printResult = (statistics, game) => {
  let endGameMessage = ``;
  const score = getScore(game.answers);
  const time = getTimeSpent(game.answers);

  //if time's not up && there's lives
  if (game.remainingAttempts > 0 && time < TIME_FOR_GAME) {
    const position = getPosition(statistics, score);
    statistics.push(score);
    statistics.sort((a, b) => b - a);

    const stats = {
      place: position + 1,
      playersCount: statistics.length,
      betterThan: Math.round(
        ((statistics.length - position - 1) * 100) / statistics.length
      )
    };
    endGameMessage = phrases.win(stats);
  } else {
    endGameMessage =
      time > TIME_FOR_GAME ? phrases.timeIsUp() : phrases.noMoreAttempts();
  }

  return endGameMessage
};

class GameModel {
  constructor(data = levels) {
    this.data = data;
  }

  // modify new object and return new state, react-style
  update(newState) {
    this.state = Object.assign({}, this.state, newState);
    return this.state
  }

  resetAnswers(state) {
    state.answers = [];
  }

  getCurrentLevel() {
    return getLevel(this.state.level, this.data)
  }

  nextLevel() {
    this.update(nextLevel(this.state, this.data));
  }

  tick() {
    this.update(tick(this.state));
  }

  getMistakes() {
    return MAX_ERRORS_COUNT - this.state.remainingAttempts
  }

  getLevelType() {
    return this.getCurrentLevel().type
  }

  getAllLevelsTypes() {
    return getAllLevelsTypes()
  }

  isLastLevel() {
    return this.state.level === LEVELS_COUNT - 1
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