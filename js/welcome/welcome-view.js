import AbstractView from "../view";
import { $$, $on, $trigger } from "../util";

export default class WelcomeView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
<section class="main main--welcome welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play welcome__button"></button>
  <h2 class="title main-title"> </h2>
  <p class="text main-text"> </p>
</section>`.trim();
  }

  bind() {
    $on(`click`, () => $trigger(`start`), $$(`.welcome__button`, this.element));
  }

  onStart() {}
}
