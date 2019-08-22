var welcome = (function () {
'use strict';

// create an element
const createElement = template => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;
  return outer.firstElementChild
};

// select an element
const $$ = (selector, scope = window.document) => {
  return scope.querySelector(selector)
};

// get root element
const appElement = $$(`.app`);

// replace screen
const changeView = view => {
  appElement.replaceChild(view.element, $$(`section.main`));
};

// add event listener on some event
const $on = (eventName, callback, el = appElement) => {
  el.addEventListener(eventName, evt => {
    callback(evt);
  });
};
// create a custom event to be triggered on
const $trigger = (eventName, data = null) => {
  let customEvent = new CustomEvent(eventName, { detail: data });
  appElement.dispatchEvent(customEvent);
};

// base class
class AbstractView {
  get template() {
    throw new Error(`Provide template for view`)
  }

  render() {
    return createElement(this.template.trim())
  }
  bind() {}
  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind(); //bind to this
    }
    return this._element
  }
}

class WelcomeView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    const { name, button, title, rules } = this.data;
    return `
<section class="main main--welcome">
  <section class="logo" title="${name}"><h1>${name}</h1></section>
  <button class="main-play">${button}</button>
  <h2 class="title main-title">${title}</h2>
  <p class="text main-text">${rules.reduce((str, it, index, arr) => {
    const linebreak = index < arr.length - 1 ? `<br>` : ``;
    it = it + linebreak;
    return str + it
  }, ``)}</p>
</section>`.trim()
  }

  // on button click, start game
  bind() {
    $on(`click`, () => $trigger(`start`), $$(`.main-play`, this.element));
  }

  onStart() {}
}

// todo: customize later







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

const welcome$1 = {
  name: label.GAME,
  title: label.TITLE_WELCOME,
  rules: [
    `Rules are simple&nbsp;— &nbsp;you have to answer all questions in 5 minites.`,
    `You can make 3 mistakes.`,
    `Good luck!`
  ],
  button: label.BUTTON_WELCOME
};



const resultTime = {
  name: label.GAME,
  title: label.TITLE_FAIL_TIME,
  button: label.BUTTON_FAIL,
  content: phrases.timeIsUp(),
  isWin: false
};







// copy game object and reassign it










//copy game object and reassign it

class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView(welcome$1);
  }

  init() {
    changeView(this.view);
  }
}

var welcome$$1 = new WelcomeScreen();

return welcome$$1;

}());

//# sourceMappingURL=welcome.js.map
