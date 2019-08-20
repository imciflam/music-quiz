export const games = [
  {
    answers: [
      {isCorrect: true, timeSpent: 40},
      {isCorrect: true, timeSpent: 20},
      {isCorrect: false, timeSpent: 400},
    ],
    remainingAttempts: 3,
    points: -1
  },
  {
    answers: [
      {isCorrect: true, timeSpent: 30},
      {isCorrect: true, timeSpent: 30},
      {isCorrect: true, timeSpent: 30},
      {isCorrect: true, timeSpent: 30},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 35},
      {isCorrect: true, timeSpent: 35},
      {isCorrect: true, timeSpent: 30},
      {isCorrect: true, timeSpent: 30}
    ],
    remainingAttempts: 4,
    points: 12
  },
  {
    answers: [
      {isCorrect: true, timeSpent: 60},
      {isCorrect: true, timeSpent: 60},
      {isCorrect: true, timeSpent: 60},
      {isCorrect: true, timeSpent: 60},
      {isCorrect: true, timeSpent: 60},
      {isCorrect: true, timeSpent: 40},
      {isCorrect: false, timeSpent: 50},
      {isCorrect: true, timeSpent: 40},
      {isCorrect: true, timeSpent: 40},
      {isCorrect: false, timeSpent: 40}
    ],
    remainingAttempts: 2,
    points: 4
  },
  {
    answers: [
      {isCorrect: false, timeSpent: 10},
      {isCorrect: false, timeSpent: 10},
      {isCorrect: false, timeSpent: 10},
      {isCorrect: false, timeSpent: 10}
    ],
    remainingAttempts: 0,
    points: -1
  },
  {
    answers: [],
    remainingAttempts: 4,
    points: -1
  }
];

export const statisctics = [20, 8, 4];

export const gamesToTestInScoreboard = [
  {
    answers: [
      {isCorrect: true, timeSpent: 40},
      {isCorrect: false, timeSpent: 20},
      {isCorrect: false, timeSpent: 400},
    ],
    remainingAttempts: 2,
    result: `Время вышло!<br>Вы не успели отгадать все мелодии`
  },
  {
    answers: [
      {isCorrect: true, timeSpent: 100},
      {isCorrect: false, timeSpent: 10},
      {isCorrect: false, timeSpent: 10},
      {isCorrect: false, timeSpent: 10},
      {isCorrect: false, timeSpent: 10}
    ],
    remainingAttempts: 0,
    result: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`
  },
  {
    answers: [
      {isCorrect: true, timeSpent: 20},
      {isCorrect: true, timeSpent: 20},
      {isCorrect: true, timeSpent: 20},
      {isCorrect: true, timeSpent: 20},
      {isCorrect: true, timeSpent: 20},
      {isCorrect: true, timeSpent: 20},
      {isCorrect: true, timeSpent: 20},
      {isCorrect: true, timeSpent: 20},
      {isCorrect: true, timeSpent: 20},
      {isCorrect: true, timeSpent: 20}
    ],
    remainingAttempts: 4,
    result: `Вы заняли 2-ое место из 4 игроков. Это&nbsp;лучше чем у&nbsp;50%&nbsp;игроков`
  },
  {
    answers: [
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100}
    ],
    remainingAttempts: 4,
    result: `Вы заняли 3-ое место из 5 игроков. Это&nbsp;лучше чем у&nbsp;40%&nbsp;игроков`
  },
  {
    answers: [
      {isCorrect: true, timeSpent: 30},
      {isCorrect: true, timeSpent: 30},
      {isCorrect: true, timeSpent: 30},
      {isCorrect: true, timeSpent: 30},
      {isCorrect: true, timeSpent: 30},
      {isCorrect: true, timeSpent: 30},
      {isCorrect: true, timeSpent: 30},
      {isCorrect: false, timeSpent: 10},
      {isCorrect: false, timeSpent: 10},
      {isCorrect: false, timeSpent: 10}
    ],
    remainingAttempts: 1,
    result: `Вы заняли 6-ое место из 6 игроков. Это&nbsp;лучше чем у&nbsp;0%&nbsp;игроков`
  },
  {
    answers: [
      {isCorrect: true, timeSpent: 30},
      {isCorrect: true, timeSpent: 30},
      {isCorrect: true, timeSpent: 30},
      {isCorrect: true, timeSpent: 30},
      {isCorrect: true, timeSpent: 30},
      {isCorrect: true, timeSpent: 30},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: false, timeSpent: 10},
      {isCorrect: false, timeSpent: 10}
    ],
    remainingAttempts: 2,
    result: `Вы заняли 5-ое место из 7 игроков. Это&nbsp;лучше чем у&nbsp;29%&nbsp;игроков`
  },
];
