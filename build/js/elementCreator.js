(function (exports) {
'use strict';

function htmlToElement(html) {
  const div = document.createElement(`div`);
  html = html.trim(); // remove whitespaces
  div.innerHTML = html;
  return div.firstChild;
}

exports.htmlToElement = htmlToElement;

}((this.elementCreator = this.elementCreator || {})));

//# sourceMappingURL=elementCreator.js.map
