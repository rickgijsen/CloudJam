/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Hand from '../sprites/Hand'
import StartText from '../sprites/StartText'

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    this.countDownTimeMs = 1 * 1000;
    this.timer = this.game.time.create(false);



    // Add the feed sprites here
      this.player = new Player({
          x: 0,
          y: 0
          });
      this.game.add.existing(this.player);
      this.hand = new Hand({
        x: 0, y: 0
      })
      this.game.add.existing(this.hand);
    // Create the feedme countdown timer
    this.timer.add(this.countDownTimeMs, this.onTimerComplete, this);
    console.log("Starting FeedMe stage: countdown = " + this.countDownTimeMs);
    this.timer.start();
  }

  // FeedMe timer has completed
  onTimerComplete() {
    console.log("FeedMe stage has finished");

      this.hand.rePosition()
      if(this.hand.moved){
        this.hand.squish()

      }
    //this.game.state.start("Play");
  }

  update() {
  }

  render() { }
}