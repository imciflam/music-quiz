export function htmlToElement(html) {
  var div = document.createElement("div");
  html = html.trim(); // remove whitespaces
  div.innerHTML = html;
  return div.firstChild;
}
