import AbstractView from '../../view';

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

export default class HeaderView extends AbstractView {
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

