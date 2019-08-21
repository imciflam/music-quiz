var welcomeView = (function () {
'use strict';

const createElement = (template) => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;
  return outer.firstElementChild;
};

const $$ = (selector, scope = window.document) => {
  return scope.querySelector(selector);
};

const appElement = $$(`.app`);




const $on = (eventName, callback, el = appElement) => {
  el.addEventListener(eventName, (evt) => {
    callback(evt);
  });
};

const $trigger = (eventName, data = null) => {
  let customEvent = new CustomEvent(eventName, {detail: data});
  appElement.dispatchEvent(customEvent);
};

class AbstractView {
  get template() {
    throw new Error(`Define template for view`)
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
    const {name, button, title, rules} = this.data;
    return `
<section class="main main--welcome">
  <section class="logo" title="${name}"><h1>${name}</h1></section>
  <button class="main-play">${button}</button>
  <h2 class="title main-title">${title}</h2>
  <p class="text main-text">${rules
      .reduce((str, it, index, arr) => {
        const linebreak = (index < arr.length - 1) ? `<br>` : ``;
        it = it + linebreak;
        return str + it;
      }, ``)}</p>
</section>`.trim();
  }

  bind() {
    $on(
        `click`,
        () => $trigger(`start`),
        $$(`.main-play`, this.element)
    );
  }

  onStart() {
  }
}

return WelcomeView;

}());

//# sourceMappingURL=welcome-view.js.map
