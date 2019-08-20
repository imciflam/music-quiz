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
    throw new Error(`Define template for view`);
  }

  render() {
    return createElement(this.template.trim());
  }

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
