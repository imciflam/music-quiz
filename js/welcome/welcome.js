import { changeView } from "../util";
import WelcomeView from "./welcome-view";

class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    changeView(this.view);
  }
}

export default new WelcomeScreen();
