var welcomeView = (function () {
'use strict';

// create element
const createElement = template => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;
  return outer.firstElementChild;
};

// make selection
const $$ = (selector, scope = window.document) => {
  return scope.querySelector(selector);
};

const appElement = $$(`.app`);

// replacing screen


// listen to event
const $on = (eventName, callback, el = appElement) => {
  el.addEventListener(eventName, evt => {
    callback(evt);
  });
};

// generate event
const $trigger = (eventName, data = null) => {
  let customEvent = new CustomEvent(eventName, { detail: data });
  appElement.dispatchEvent(customEvent);
};

class AbstractView {

  get template() {
    throw new Error(`You have to define template for view`);
  }

  render() {
    return createElement(this.template.trim());
  }

  bind() {

  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

}

class WelcomeView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
<section class="welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="welcome__button"><span class="visually-hidden">Начать игру</span></button>
  <h2 class="welcome__rules-title">Правила игры</h2>
    <p class="welcome__text">Правила просты:</p>
    <ul class="welcome__rules-list">
      <li>За 5 минут нужно ответить на все вопросы.</li>
      <li>Можно допустить 3 ошибки.</li>
    </ul>
    <p class="welcome__text">Удачи!</p>`.trim();
  }

  bind() {
    $on(`click`, () => $trigger(`start`), $$(`.welcome__button`, this.element));
  }

  onStart() {}
}

return WelcomeView;

}());

//# sourceMappingURL=welcome-view.js.map
