import AbstractView from "../view";
import { $$, $on, $trigger } from "../util";

export default class ResultView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    const {
      name,
      button,
      title,
      content,
      isWin,
      score,
      errors,
      time,
      fastScore
    } = this.data;

    const minutes = parseInt(time / 60, 10);
    const seconds = time % 60;
    const winText = `
In ${minutes} : ${seconds}
<br>you got ${score} points (${fastScore} quick)
<br>made ${errors - 1} errors`;

    return `
<section class="main main--result">
  <section class="logo" title="${name}"><h1>${name}</h1></section>

  <h2 class="title">${title}</h2>
  <div class="main-stat">
    ${isWin ? winText : content}
  </div>
  ${isWin ? `<span class="main-comparison">${content}</span>` : ``}
  <span role="button" tabindex="0" class="main-replay">${button}</span>
</section>`.trim();
  }

  bind() {
    $on(`click`, () => $trigger(`replay`), $$(`.main-replay`, this.element));
  }
}
