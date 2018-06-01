/* globals __DEV__ */
import Phaser from 'phaser'
import Character from '../sprites/Character'
import MovingItemList from '../sprites/MovingItemList'

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    // const bannerText = 'Phaser + ES6 + Webpack'
    // let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
    //   font: '40px Bangers',
    //   fill: '#77BFA3',
    //   smoothed: false
    // })

    // banner.padding.set(10, 16)
    // banner.anchor.setTo(0.5)

    // this.mushroom = new Mushroom({
    //   game: this.game,
    //   x: this.world.centerX,
    //   y: this.world.centerY,
    //   asset: 'mushroom'
    // });

    // this.game.add.existing(this.mushroom)

    this.character = new Character(0, 0);
    this.game.add.existing(this.character);

    this.MovingItemList = new MovingItemList(0,0);
    this.game.add.existing(this.MovingItemList);
  }

  render() {
    if (__DEV__) {
        game.debug.text('enemies: ' + this.MovingItemList.length, 16, 48);
    }
  }
}
