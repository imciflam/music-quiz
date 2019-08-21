// create an element
export const createElement = template => {
  const outer = document.createElement(`div`)
  outer.innerHTML = template
  return outer.firstElementChild
}

// select an element
export const $$ = (selector, scope = window.document) => {
  return scope.querySelector(selector)
}

// get root element
const appElement = $$(`.app`)

// replace screen
export const changeView = view => {
  appElement.replaceChild(view.element, $$(`section.main`))
}

// add event listener on some event
export const $on = (eventName, callback, el = appElement) => {
  el.addEventListener(eventName, evt => {
    callback(evt)
  })
}
// create a custom event to be triggered on
export const $trigger = (eventName, data = null) => {
  let customEvent = new CustomEvent(eventName, { detail: data })
  appElement.dispatchEvent(customEvent)
}
