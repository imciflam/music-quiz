(function (exports) {
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

exports.createElement = createElement;
exports.$$ = $$;
exports.changeView = changeView;
exports.$on = $on;
exports.$trigger = $trigger;

}((this.util = this.util || {})));

//# sourceMappingURL=util.js.map
