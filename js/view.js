import { createElement } from "./util";

export default class AbstractView {
  get template() {
    throw new Error(`Define template for view`);
  }

  render() {
    return createElement(this.template.trim());
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind(); //bind to this
    }
    return this._element;
  }
}
