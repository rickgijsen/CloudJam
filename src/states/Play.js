/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() { console.log("creating play"); }

  update() {

  }

  onPlayerDies() {
    console.log("Obesimon went to a better place...");
    this.game.state.start("End");
  }
  render() { }
}