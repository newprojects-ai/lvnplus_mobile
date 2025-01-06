export class TestTimer {
  private startTime: Date;
  private timeLimit: number; // in minutes
  private timerId?: NodeJS.Timeout;
  private onTick: (timeLeft: number) => void;
  private onComplete: () => void;

  constructor(
    timeLimit: number,
    onTick: (timeLeft: number) => void,
    onComplete: () => void,
  ) {
    this.startTime = new Date();
    this.timeLimit = timeLimit;
    this.onTick = onTick;
    this.onComplete = onComplete;
  }

  start() {
    this.startTime = new Date();
    this.tick();
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  private tick() {
    const now = new Date();
    const elapsed = (now.getTime() - this.startTime.getTime()) / 1000; // in seconds
    const timeLeft = Math.max(0, this.timeLimit * 60 - elapsed); // convert minutes to seconds

    if (timeLeft <= 0) {
      this.stop();
      this.onComplete();
    } else {
      this.onTick(timeLeft);
    }
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }

  getTimeLeft(): number {
    const now = new Date();
    const elapsed = (now.getTime() - this.startTime.getTime()) / 1000;
    return Math.max(0, this.timeLimit * 60 - elapsed);
  }
}
