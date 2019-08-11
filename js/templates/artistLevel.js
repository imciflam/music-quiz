import { htmlToElement } from "../elementCreator";
import { header } from "./header";
import { levels } from "../data/game.data";

const gameArtistScreen = (levels, remainingAttempts) => `
<section class="game game--artist">
${header(remainingAttempts)}
    <section class="game__screen">
      <h2 class="game__title">${levels[6].title}</h2>
      <div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        <audio loop autoplay src="${levels[6].src}"></audio>
      </div>

      <form class="game__artist">
      ${questionsTemplate(levels[6].questions)}
         
      </form>
    </section>
  </section>`;

const questionsTemplate = data => {
  console.log(data);
  return data.reduce((string, it, index) => {
    const n = index++;
    const itemTemplate = `
      <div class="artist">
        <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-${n}" id="answer-${n}">
        <label class="artist__name" for="answer-${n}">
          <img class="artist__picture" src="${it.image}" alt="${it.artist}">
          ${it.artist}
        </label>
      </div> `;

    return string + itemTemplate;
  }, ``);
};

export const artistLevel = htmlToElement(gameArtistScreen(levels, 1));
