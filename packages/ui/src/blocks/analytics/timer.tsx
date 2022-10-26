const THIRTY_SECONDS = 30_000;

export class Timer {
  listeners: Array<() => void>;
  intervalId: number;

  constructor() {
    this.listeners = [];
    this.intervalId = window.setInterval(this.dispatchTick, THIRTY_SECONDS);
  }

  onTick = (listener: () => void) => {
    this.listeners.push(listener);
  };

  dispatchTick = () => {
    for (const listener of this.listeners) {
      listener();
    }
  };
}
