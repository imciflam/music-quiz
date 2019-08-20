var view = (function () {
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

return AbstractView;

}());

//# sourceMappingURL=view.js.map
