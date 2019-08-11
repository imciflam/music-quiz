import { htmlToElement } from "../elementCreator";
import { header } from "./header";
import { levels } from "../data/game.data";

const gameGenreScreen = (levels, remainingAttempts) => `
<section class="game game--genre">
${header(remainingAttempts)}
    <section class="game__screen">
      <h2 class="game__title">${levels[0].title}</h2>
      <form class="game__tracks">
      ${questionsTemplate(levels[0].questions)}
        <button class="game__submit button" type="submit"  >Ответить</button>
      </form>
    </section>
  </section>`;

const questionsTemplate = levels => {
  return levels.reduce((string, it, index) => {
    console.log(it);
    const n = index++;
    const itemTemplate = `
    <div class="track">
          <button class="track__button track__button--play" type="button"></button>
          <div class="track__status">            
          <audio src="${it.src}"></audio>
          </div>
          <div class="game__answer">
            <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-${n}" id="answer-${n}">
            <label class="game__check" for="answer-${n}">Отметить</label>
          </div>
        </div>`;

    return string + itemTemplate;
  }, ``);
};

export const genreLevel = htmlToElement(gameGenreScreen(levels, 1));
