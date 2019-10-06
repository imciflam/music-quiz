import Application from "../application";
const URL = `https://es.dump.academy/pixel-hunter`;
const NAME_ID = `vita`;
const CHUNK_SIZE = 4;
let AUDIO_LOAD_TIMEOUT = 5000; // 5 sec initial timeframe to load one chunk

let timeout;
let notLoadedUrls = [];
let loadedAudioQuantity = 0;

export default class Loader {
  static getLevels() {
    return fetch(`${URL}/questions`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Data not found -  ${URL}`);
        }
        throw new Error(
          `Unknown error: ${response.status} ${response.statusText}`
        );
      })
      .then(data => {
        return data;
      });
  }

  static loadChunk(urls) {
    return Promise.all(
      urls.map(url => {
        return new Promise((resolve, reject) => {
          const audio = new Audio();
          audio.addEventListener(`canplaythrough`, () => resolve(url), false);
          audio.src = url;
          timeout = setTimeout(() => reject(url), AUDIO_LOAD_TIMEOUT);
          loadedAudioQuantity++;
          Application.updateProgress(loadedAudioQuantity - CHUNK_SIZE);
        });
      })
    );
  }

  static loadBundle(bundles) {
    let chain = Promise.resolve();

    bundles.forEach(chunk => {
      chain = chain
        .then(() => {
          clearTimeout(timeout);
          return Loader.loadChunk(chunk);
        })
        .catch(url => {
          notLoadedUrls.push(url);
        });
    });

    return chain;
  }

  static createBundle(urls) {
    return urls.reduce((acc, it, index) => {
      const bundleIndex = parseInt(index / CHUNK_SIZE, 10);
      if (typeof acc[bundleIndex] === `undefined`) {
        acc[bundleIndex] = [];
      }
      acc[bundleIndex][index % CHUNK_SIZE] = it;
      return acc;
    }, []);
  }

  static cacheAudio(urls, cb) {
    const bundle = Loader.createBundle(urls);
    Loader.loadBundle(bundle).then(() => {
      if (notLoadedUrls.length > 0) {
        AUDIO_LOAD_TIMEOUT *= 2;
        Loader.cacheAudio(notLoadedUrls, cb);
        notLoadedUrls = [];
      } else {
        Application.updateProgress(loadedAudioQuantity + CHUNK_SIZE);
        cb();
      }
    });
  }

  static getResults() {
    return fetch(`${URL}/stats/${NAME_ID}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          return [];
        }
        throw new Error(
          `Unknown error: ${response.status} ${response.statusText}`
        );
      })
      .then(data => {
        let stats = [];
        for (let it of data) {
          if (it.stats) {
            stats.push(it.stats);
          }
        }
        return stats;
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  static postResults(data) {
    const requestSettings = {
      body: JSON.stringify({
        time: +new Date(),
        stats: data
      }),
      headers: {
        "Content-Type": `application/json`
      },
      method: `POST`
    };
    return fetch(`${URL}/stats/${NAME_ID}`, requestSettings);
  }
}
