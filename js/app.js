import welcomeScreen from "./welcome/welcome";
import { genreLevel } from "./templates/genreLevel";
import { artistLevel } from "./templates/artistLevel";
import resultSuccessScreen from "./resultSuccessScreen";
import failTriesScreen from "./failTriesScreen";
import Loader from "./dataLoader";

export default class App {
  constructor() {
    this.main = document.querySelector(`.app`);
    this.main.addEventListener("DOMContentLoaded", this.ready());
  }
  ready() {
    welcomeScreen.init();
    const welcomeButton = document.querySelector(`.welcome__button`);
    welcomeButton.addEventListener(`click`, () => {
      this.slider(1);

      //static, so call class method
      Loader.getLevels().then(data => {
        console.log(data);
      });
    });
  }
  returner() {
    const returnButton = document.querySelector(`.game__back`);
    returnButton.addEventListener(`click`, () => {
      this.slider(0);
    });
  }
}
