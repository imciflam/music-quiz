import { changeView } from "../util";
import ResultView from "./result-view";

export default class ResultScreen {
  constructor(data) {
    console.log(data);
    this.view = new ResultView(data);
  }

  init() {
    changeView(this.view);
  }
}
