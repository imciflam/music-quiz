import AbstractView from '../../view';
import {$on, $trigger} from '../../util';

export default class LevelArtistView extends AbstractView {
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
