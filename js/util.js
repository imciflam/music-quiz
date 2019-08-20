// create element
export const createElement = template => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;
  return outer.firstElementChild;
};

// make selection
export const $$ = (selector, scope = window.document) => {
  return scope.querySelector(selector);
};

const appElement = $$(`.app`);

// replacing screen
export const changeView = view => {
  console.log($$(`section.main`));
  appElement.replaceChild(view.element, $$(`section.main`));
};

// listen to event
export const $on = (eventName, callback, el = appElement) => {
  el.addEventListener(eventName, evt => {
    callback(evt);
  });
};

// generate event
export const $trigger = (eventName, data = null) => {
  let customEvent = new CustomEvent(eventName, { detail: data });
  appElement.dispatchEvent(customEvent);
};
