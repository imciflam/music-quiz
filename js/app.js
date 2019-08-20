import welcomeScreen from "./welcome/welcome";
import GameScreen from "./game/game";
import {
  resultTry as tryData,
  resultTime as timeData,
  resultWin as winData,
  levels as levelsData,
  initialGame
} from "./data/game.data";
import { $on } from "./util";

export default class App {
  // constructor() {
  //   this.main = document.querySelector(`.app`);
  //   this.main.addEventListener("DOMContentLoaded", this.ready());
  // }
  static init(data) {
    welcomeScreen.init();
    App.game = new GameScreen(data);
    $on(`start`, App.startGame);
    $on(`replay`, App.startGame);
    // welcomeButton.addEventListener(`click`, () => {
    //  //static, so call class method
    //  Loader.getLevels().then(data => {
    //    console.log(data);
    //  });
    // });
  }

  static startGame(evt, state = initialGame) {
    App.game.init(state);
    App.game.tick();
  }

  returner() {
    const returnButton = document.querySelector(`.game__back`);
    returnButton.addEventListener(`click`, () => {
      this.slider(0);
    });
  }
}

App.init(levelsData);
