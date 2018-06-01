/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    this.countDownTimeMs = 10 * 1000;
    this.timer = this.game.time.create(false);

    // Create the feedme countdown timer
    this.timer.add(this.countDownTimeMs, this.onTimerComplete, this);
    console.log("Starting FeedMe stage: countdown = " + this.countDownTimeMs);
    this.timer.start();
  }

  // FeedMe timer has completed
  onTimerComplete() {
    console.log("FeedMe stage has finished");
    this.game.state.start("Play");
  }

  update() {
    //console.log("updating feed");
  }

  render() { }
}