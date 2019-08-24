var view = (function () {
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

// create a custom event to be triggered on

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

return AbstractView;

}());

//# sourceMappingURL=view.js.map
