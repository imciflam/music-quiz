export default class Timer {
  static get time() {
    return Timer._time;
  }

  static set time(value) {
    Timer._time = value;
  }

  static tick() {
    Timer.time++;
    Timer.timeout = setTimeout(() => Timer.tick(), 1000);
  }

  static start() {
    Timer.tick();
  }

  static stop() {
    clearTimeout(Timer.timeout);
  }

  static reset() {
    Timer.time = -1;
  }
}
