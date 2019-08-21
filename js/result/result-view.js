import AbstractView from "../view"
import { $$, $on, $trigger } from "../util"

export default class ResultView extends AbstractView {
  constructor(data) {
    super()
    this.data = data
  }

  get template() {
    const { name, button, title, content, isWin, score, errors } = this.data
    const winText = `
In&nbsp;3&nbsp;m и 25&nbsp;s
<br>you&nbsp;got ${score} points (8 quick)
<br>made ${errors} errors`

    return `
<section class="main main--result">
  <section class="logo" title="${name}"><h1>${name}</h1></section>

  <h2 class="title">${title}</h2>
  <div class="main-stat">
    ${isWin ? winText : content}
  </div>
  ${isWin ? `<span class="main-comparison">${content}</span>` : ``}
  <span role="button" tabindex="0" class="main-replay">${button}</span>
</section>`.trim()
  }

  bind() {
    $on(`click`, () => $trigger(`replay`), $$(`.main-replay`, this.element))
  }
}
