var gameView = (function () {
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

class AbstractView {
  get template() {
    throw new Error(`Define template for view`)
  }

  render() {
    return createElement(this.template.trim())
  }
  bind() {}
  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind(); //bind to this
    }
    return this._element
  }
}

const mistakes = (errors) => {
  let mistakeElement = ``;
  if (errors > 0) {
    while (errors) {
      mistakeElement += `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;
      errors--;
    }
  }
  return mistakeElement;
};

class HeaderView extends AbstractView {
  constructor(errors, time) {
    super();
    this.errors = errors;
    this.time = time;
  }

  get template() {
    const minutes = parseInt(this.time / 60, 10);
    const seconds = this.time - minutes * 60;
    const zero = (value) => (value < 10) ? `0` : ``;
    return `
<header>
  <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
    <circle
      cx="390" cy="390" r="370"
      class="timer-line"
      style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

    <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins">${zero(minutes)}${minutes}</span><!--
      --><span class="timer-value-dots">:</span><!--
      --><span class="timer-value-secs">${zero(seconds)}${seconds}</span>
    </div>
  </svg>
  <div class="main-mistakes">
    ${mistakes(this.errors)}
  </div>
</header>`;
  }
}

class LevelGenreView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    const { title, questions } = this.level;

    const questionsTemplate = data => {
      return data.reduce((string, it, index) => {
        const n = index++;
        const itemTemplate = `
<div class="genre-answer">
  <div class="player-wrapper">
    <div class="player">
      <audio src="${it.src}"></audio>
      <button class="player-control player-control--play"></button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>
  </div>
  <input type="checkbox" name="answer" value="answer-${n}" id="a-${n}">
  <label class="genre-answer-check" for="a-${n}"></label>
</div>`;
        return string + itemTemplate
      }, ``)
    };

    return `
<section class="main main--level main--level-genre">
  <div class="main-wrap">
    <h2 class="title">${title}</h2>
    <form class="genre">

      ${questionsTemplate(questions)}

      <button class="genre-answer-send" type="submit" disabled>Answer</button>
    </form>
  </div>
</section>`.trim()
  }

  bind() {
    const answerButton = $$(`.genre-answer-send`, this.element);

    const checkboxes = [
      ...this.element.querySelectorAll(`.genre-answer input[type="checkbox"]`)
    ];

    checkboxes.forEach(checkbox => {
      $on(
        `change`,
        () => {
          if (checkboxes.some(it => it.checked)) {
            answerButton.removeAttribute(`disabled`);
          } else {
            answerButton.setAttribute(`disabled`, `disabled`);
          }
        },
        checkbox
      );
    });

    $on(`click`, evt => this.handlerAnswer(evt), answerButton);
  }

  handlerAnswer(evt) {
    evt.preventDefault();
    const answers = [...evt.target.form.elements.answer];
    $trigger(`answerGenre`, answers);
  }
}

class LevelArtistView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    const {title, questions, src} = this.level;

    const questionsTemplate = (data) => {
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
        return string + itemTemplate;
      }, ``);
    };

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
</section>`.trim();
  }

  bind() {
    const buttons = [...this.element.querySelectorAll(`.main-answer-r`)];
    buttons.forEach((button) => {
      $on(`change`, () => {
        const answer = button.form.elements.answer.value;
        $trigger(`answerArtist`, answer);
      }, button);
    });
  }
}

const audio = {
  BUTTON: `player-control`,
  PLAY: `player-control--pause`,
  PAUSE: `player-control--play`
};

class GameView extends AbstractView {
  constructor(model) {
    super();
    this.model = model;
  }

  get template() {
    return `<section class="main"></section>`;
  }

  bind() {
    return super.bind();
  }

  bindAudioHandler() {
    [...this.level.element.querySelectorAll(`.${audio.BUTTON}`)].forEach((button) => {
      $on(`click`, (evt) => this.audioHandler(evt), button);
    });
  }

  get view() {
    return {
      Genre(level) {
        return new LevelGenreView(level);
      },
      Artist(level) {
        return new LevelArtistView(level);
      }
    };
  }

  updateLevel(type) {
    this.level = this.view[type](this.model.getCurrentLevel());
    this.bindAudioHandler();
    changeView(this.level);
    this.updateHeader();
  }

  updateHeader() {
    const header = new HeaderView(this.model.getMistakes(), this.model.state.time);
    const headerElement = $$(`section.main > header`);
    if (headerElement !== null) {
      headerElement.remove();
    }
    $$(`section.main`).prepend(header.element);
  }

  audioHandler(evt) {
    if (evt && evt.target) {
      evt.preventDefault();
      const el = evt.target;
      if (el.classList.contains(audio.PAUSE)) {
        // play
        [...this.level.element.querySelectorAll(`.${audio.PLAY}`)].forEach((button) => {
          button.classList.remove(audio.PLAY);
          button.classList.add(audio.PAUSE);
          button.previousElementSibling.pause();
        });
        el.classList.remove(audio.PAUSE);
        el.classList.add(audio.PLAY);
        el.previousElementSibling.play();
      } else {
        // pause
        el.classList.remove(audio.PLAY);
        el.classList.add(audio.PAUSE);
        el.previousElementSibling.pause();
      }
    }
  }

}

return GameView;

}());

//# sourceMappingURL=game-view.js.map
