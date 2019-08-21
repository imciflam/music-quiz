import { createElement } from "./util"

// base class
export default class AbstractView {
  get template() {
    throw new Error(`Provide template for view`)
  }

  render() {
    return createElement(this.template.trim())
  }
  bind() {}
  get element() {
    if (!this._element) {
      this._element = this.render()
      this.bind() //bind to this
    }
    return this._element
  }
}
