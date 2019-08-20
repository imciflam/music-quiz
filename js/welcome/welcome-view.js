import AbstractView from '../view';
import {$$, $on, $trigger} from '../util';

export default class WelcomeView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    const {name, button, title, rules} = this.data;
    return `
<section class="main main--welcome">
  <section class="logo" title="${name}"><h1>${name}</h1></section>
  <button class="main-play">${button}</button>
  <h2 class="title main-title">${title}</h2>
  <p class="text main-text">${rules
      .reduce((str, it, index, arr) => {
        const linebreak = (index < arr.length - 1) ? `<br>` : ``;
        it = it + linebreak;
        return str + it;
      }, ``)}</p>
</section>`.trim();
  }

  bind() {
    $on(
        `click`,
        () => $trigger(`start`),
        $$(`.main-play`, this.element)
    );
  }

  onStart() {
  }
}

