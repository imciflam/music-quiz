const assert = window.chai.assert;

describe(`check level changer`, () => {
  const newLevel = changeLevel(1);
  assert.equal(newLevel, 1);
});
