/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() { console.log("creating play"); }

  update() {

  }

  onPlayerDies() {
    this.game.state.start("End");
  }
  render() { }
}