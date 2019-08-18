const URL = `https://es.dump.academy/guess-melody`;

export default class Loader {
  getLevels() {
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
