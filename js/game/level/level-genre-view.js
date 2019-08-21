import AbstractView from "../../view"
import { $$, $on, $trigger } from "../../util"

export default class LevelGenreView extends AbstractView {
  constructor(level) {
    super()
    this.level = level
  }

  get template() {
    const { title, questions } = this.level

    const questionsTemplate = data => {
      return data.reduce((string, it, index) => {
        const n = index++
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
</div>`
        return string + itemTemplate
      }, ``)
    }

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
    const answerButton = $$(`.genre-answer-send`, this.element)

    const checkboxes = [
      ...this.element.querySelectorAll(`.genre-answer input[type="checkbox"]`)
    ]

    checkboxes.forEach(checkbox => {
      $on(
        `change`,
        () => {
          if (checkboxes.some(it => it.checked)) {
            answerButton.removeAttribute(`disabled`)
          } else {
            answerButton.setAttribute(`disabled`, `disabled`)
          }
        },
        checkbox
      )
    })

    $on(`click`, evt => this.handlerAnswer(evt), answerButton)
  }

  handlerAnswer(evt) {
    evt.preventDefault()
    const answers = [...evt.target.form.elements.answer]
    $trigger(`answerGenre`, answers)
  }
}
