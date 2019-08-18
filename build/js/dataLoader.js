var dataLoader = (function () {
'use strict';

const URL = `https://es.dump.academy/guess-melody`;

class Loader {
  static getLevels() {
    return fetch(`${URL}/questions`)
      .then(response => {
        if (response.ok) {
          console.log(response);
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Request ${URL}/questions failed.`);
        }
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      })
      .then(data => {
        return data;
      });
  }
}

return Loader;

}());

//# sourceMappingURL=dataLoader.js.map
