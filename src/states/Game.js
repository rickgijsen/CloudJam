/* globals __DEV__ */
import Phaser from 'phaser'
import Character from '../sprites/Character'
import MovingItemList from '../sprites/MovingItemList'
import FartMeter from "../sprites/FartMeter";

//
// GameState - does nothing
//

// Every State has its own logic
// This class controls the logic

// Once this state starts, start state feed on Input
// when feed timer is done, start state play
// Once player dies, start state end
// Ad === profit?

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    // banner.padding.set(10, 16)
    // banner.anchor.setTo(0.5)

    // this.mushroom = new Mushroom({
    //   game: this.game,
    //   x: this.world.centerX,
    //   y: this.world.centerY,
    //   asset: 'mushroom'
    // });

    // this.game.add.existing(this.mushroom)

    this.movingItemList = new MovingItemList(0,0);
    this.game.add.existing(this.movingItemList);

    this.fartBar = new FartMeter(0, 0);
    this.game.add.existing(this.fartBar);

    this.character = new Character(0, 0, this.movingItemList, this.fartBar);
    this.game.add.existing(this.character);

    this.bannerText = ''
    this.banner = this.add.text(this.world.centerX + 120, 30, this.bannerText, {
      font: '50px Bangers',
      fill: '#000000',
      align: 'right'
    })
    this.banner.padding.set(10, 16)
    this.banner.anchor.setTo(0.5, 0.5)
    this.add.existing(this.banner)
  }

  render() {
    this.banner.text = Math.floor(this.movingItemList.score);
    if (__DEV__) {
        game.debug.text('enemies: ' + this.movingItemList.length, 16, 48);
    }
  }
}
