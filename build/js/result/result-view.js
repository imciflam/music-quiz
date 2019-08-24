var resultView = (function () {
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
    throw new Error(`Provide template for view`);
  }

  render() {
    return createElement(this.template.trim());
  }
  bind() {} // notifies
  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind(); //bind to this
    }
    return this._element;
  }
}

class ResultView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    const { name, button, title, content, isWin, score, errors } = this.data;
    const winText = `
In&nbsp;3&nbsp;m и 25&nbsp;s
<br>you&nbsp;got ${score} points (8 quick)
<br>made ${errors} errors`;

    return `
<section class="main main--result">
  <section class="logo" title="${name}"><h1>${name}</h1></section>

  <h2 class="title">${title}</h2>
  <div class="main-stat">
    ${isWin ? winText : content}
  </div>
  ${isWin ? `<span class="main-comparison">${content}</span>` : ``}
  <span role="button" tabindex="0" class="main-replay">${button}</span>
</section>`.trim()
  }

  bind() {
    $on(`click`, () => $trigger(`replay`), $$(`.main-replay`, this.element));
  }
}

return ResultView;

}());

//# sourceMappingURL=result-view.js.map
