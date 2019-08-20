(function (exports) {
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
const changeView = view => {
  console.log($$(`section.main`));
  appElement.replaceChild(view.element, $$(`section.main`));
};

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

exports.createElement = createElement;
exports.$$ = $$;
exports.changeView = changeView;
exports.$on = $on;
exports.$trigger = $trigger;

}((this.util = this.util || {})));

//# sourceMappingURL=util.js.map
