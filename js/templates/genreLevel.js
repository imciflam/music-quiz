import { htmlToElement } from "../elementCreator";
import { header } from "./header";
import { levels } from "../data/game.data";

const gameGenreScreen = (levels, remainingAttempts) => `
<section class="game game--genre">
${header(remainingAttempts)}
    <section class="game__screen">
      <h2 class="game__title">Выберите инди-рок треки</h2>
      <form class="game__tracks"> 
        
      ${questionsTemplate(levels)}
 

        <button class="game__submit button" type="submit"  >Ответить</button>
      </form>
    </section>
  </section>`;

const questionsTemplate = levels => {
  return levels.reduce((string, it, index) => {
    const n = index++;
    const itemTemplate = `
   
    <div class="track">
    <button class="track__button track__button--play" type="button"></button>
    <div class="track__status">
      <audio></audio>
    </div>
    <div class="game__answer">
      <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1"  id="answer-4">
      <label class="game__check " for="answer-4">Отметить</label>
    </div>
  </div>`;

    return string + itemTemplate;
  }, ``);
};

export const genreLevel = htmlToElement(gameGenreScreen(levels, 1));
