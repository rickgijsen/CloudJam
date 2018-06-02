/* globals __DEV__ */
import Phaser from 'phaser'

import Character from '../sprites/Character'
import MovingItemList from '../sprites/MovingItemList'
import FartMeter from "../sprites/FartMeter";

import Fork from '../Obstacles/Fork'
import Glass from '../Obstacles/Glass'
import Plate from '../Obstacles/Plate'
import Spoon from '../Obstacles/Spoon'

export default class extends Phaser.State {
  init () { }
  preload () { }

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

    this.physics.startSystem(Phaser.Physics.ARCADE)

    this.movingItemList = new MovingItemList(0,0);
    this.game.add.existing(this.movingItemList);

    this.fartBar = new FartMeter(0, 0);
    this.game.add.existing(this.fartBar);

    this.character = new Character(0, 0, this.movingItemList, this.fartBar);
    this.game.add.existing(this.character);


  }

  update() {
      // check collision between squirrel and items
      let char = this.character;
      let fartbar = this.fartBar
      this.movingItemList.forEach(function (item) {
          if (game.physics.arcade.overlap(char, item)) {
              item.destroy();
              fartbar.addFarts(item.fartModifier);
          }
      })

      this.fork = new Fork({
          x: game.width / 4,
          y: game.height / 2
      })

      this.glass = new Glass({
          x: game.width / 1.5,
          y: game.height / 2
      })

      this.plate = new Plate({
          x: game.width / 4,
          y: game.height / 4
      })

      this.spoon = new Spoon({
          x: game.width / 1.5,
          y: game.height / 3
      })

      this.game.add.existing(this.fork)
      this.game.add.existing(this.glass)
      this.game.add.existing(this.plate)
      this.game.add.existing(this.spoon)
  }

  render () {
    if (__DEV__) {

    }
  }
}
