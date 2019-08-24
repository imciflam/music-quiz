var levelArtistView = (function () {
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

class LevelArtistView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    const { title, questions, src } = this.level;

    const questionsTemplate = data => {
      // for each element in data - template
      return data.reduce((string, it, index) => {
        const n = index++;
        const itemTemplate = `
<div class="main-answer-wrapper">
  <input class="main-answer-r" type="radio" id="answer-${n}" name="answer" value="val-${n}"/>
  <label class="main-answer" for="answer-${n}">
    <img class="main-answer-preview" src="${it.image}"
        alt="${it.artist}" width="134" height="134">
    ${it.artist}
  </label>
</div>`.trim();
        return string + itemTemplate
      }, ``)
    };
    // autoplay, so audio plays automatically
    return `
<section class="main main--level main--level-genre">
  <div class="main-wrap">
    <h2 class="title main-title">${title}</h2>
    <div class="player-wrapper">
      <div class="player">
        <audio src="${src}" loop autoplay></audio>
        <button class="player-control player-control--pause"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>
    <form class="main-list">

      ${questionsTemplate(questions)}

    </form>
  </div>
</section>`.trim()
  }

  bind() {
    const buttons = [...this.element.querySelectorAll(`.main-answer-r`)];
    buttons.forEach(button => {
      $on(
        `change`, // change event fired off
        () => {
          const answer = button.form.elements.answer.value;
          $trigger(`answerArtist`, answer); // new event created
        },
        button
      );
    });
  }
}

return LevelArtistView;

}());

//# sourceMappingURL=level-artist-view.js.map
