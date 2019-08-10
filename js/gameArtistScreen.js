import { htmlToElement } from "./elementCreator";
import { header } from "./templates/header";
//  Игра на выбор исполнителя
const gameArtistScreen = htmlToElement(`
<section class="game game--artist">
${header()}
    <section class="game__screen">
      <h2 class="game__title">Кто исполняет эту песню?</h2>
      <div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        <audio></audio>
      </div>

      <form class="game__artist">
        <div class="artist">
          <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-1" id="answer-1">
          <label class="artist__name" for="answer-1">
            <img class="artist__picture" src="http://placehold.it/134x134" alt="Пелагея">
            Пелагея
          </label>
        </div>

        <div class="artist">
          <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-2" id="answer-2">
          <label class="artist__name" for="answer-2">
            <img class="artist__picture" src="http://placehold.it/134x134" alt="Пелагея">
            Краснознаменная дивизия имени моей бабушки
          </label>
        </div>

        <div class="artist">
          <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-3" id="answer-3">
          <label class="artist__name" for="answer-3">
            <img class="artist__picture" src="http://placehold.it/134x134" alt="Пелагея">
            Lorde
          </label>
        </div>
      </form>
    </section>
  </section>`);

export default gameArtistScreen;
