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
<section class="main main--welcome welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play welcome__button"></button>
  <h2 class="title main-title"> </h2>
  <p class="text main-text"> </p>
</section>`.trim();
  }

  bind() {
    $on(`click`, () => $trigger(`start`), $$(`.welcome__button`, this.element));
  }

  onStart() {}
}

return WelcomeView;

}());

//# sourceMappingURL=welcome-view.js.map
