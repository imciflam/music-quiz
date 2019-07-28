var adaptLoadedData = (function () {
'use strict';

var adaptLoadedData = (data) => {
  const levels = data.map((it) => {
    const level = {
      type: it.type[0].toUpperCase() + it.type.slice(1),
      title: it.question
    };

    switch (it.type) {
      case `artist`:
        level.src = it.src;
        level.questions = it.answers.map((item, index) => {
          const question = {
            artist: item.title,
            image: item.image.url
          };
          if (item.isCorrect) {
            level.answer = index;
          }
          return question;
        });
        break;
      case `genre`:
        level.answer = ``;
        level.questions = it.answers.map((item) => {
          const question = {
            src: item.src
          };
          level.answer += item.genre === it.genre ? `1` : `0`;
          return question;
        });
        break;
      default:
        throw new TypeError(`Unknown question type: ${it.type}`);
    }
    return level;
  });
  return levels;
};

return adaptLoadedData;

}());

//# sourceMappingURL=adapt-loaded-data.js.map
