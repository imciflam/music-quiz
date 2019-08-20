export const createElement = (template) => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;
  return outer.firstElementChild;
};

export const $$ = (selector, scope = window.document) => {
  return scope.querySelector(selector);
};

const appElement = $$(`.app`);

export const changeView = (view) => {
  appElement.replaceChild(view.element, $$(`section.main`));
};


export const $on = (eventName, callback, el = appElement) => {
  el.addEventListener(eventName, (evt) => {
    callback(evt);
  });
};

export const $trigger = (eventName, data = null) => {
  let customEvent = new CustomEvent(eventName, {detail: data});
  appElement.dispatchEvent(customEvent);
};

