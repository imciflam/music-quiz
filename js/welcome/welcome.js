import {changeView} from '../util';
import WelcomeView from './welcome-view';
import {
  welcome as data
} from '../data/game.data';

class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView(data);
  }

  init() {
    changeView(this.view);
  }
}

export default new WelcomeScreen();
