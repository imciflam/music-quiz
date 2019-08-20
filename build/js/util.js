(function (exports) {
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

const changeView = (view) => {
  appElement.replaceChild(view.element, $$(`section.main`));
};


const $on = (eventName, callback, el = appElement) => {
  el.addEventListener(eventName, (evt) => {
    callback(evt);
  });
};

const $trigger = (eventName, data = null) => {
  let customEvent = new CustomEvent(eventName, {detail: data});
  appElement.dispatchEvent(customEvent);
};

exports.createElement = createElement;
exports.$$ = $$;
exports.changeView = changeView;
exports.$on = $on;
exports.$trigger = $trigger;

}((this.util = this.util || {})));

//# sourceMappingURL=util.js.map
