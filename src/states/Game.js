/* globals __DEV__ */
import Phaser from 'phaser'

import Character from '../sprites/Character'
import MovingItemList from '../sprites/MovingItemList'
import FartMeter from "../sprites/FartMeter";
import Burger from '../Food/Burger'
import Burrito from '../Food/Burrito'
import Lettuce from '../Food/Lettuce'
import Celery from '../Food/Celery'


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
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.movingItemList = new MovingItemList(0,0);
    this.game.add.existing(this.movingItemList);


    this.fartBar = new FartMeter(0, 0);
    this.game.add.existing(this.fartBar);

    this.character = new Character(0, 0, this.movingItemList, this.fartBar);
      this.game.physics.arcade.enable(this.character);
    this.game.add.existing(this.character);

    this.physics.startSystem(Phaser.Physics.ARCADE)

    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)

    this.burger = new Burger({
      x: game.width / 4,
      y: game.height / 2
    })

    this.burrito = new Burrito({
      x: game.width / 1.5,
      y: game.height / 2
    })

    this.lettuce = new Lettuce({
      x: game.width / 4,
      y: game.height / 4
    })

    this.celery = new Celery({
      x: game.width / 1.5,
      y: game.width / 3
    })

    this.game.add.existing(this.burger)
    this.game.add.existing(this.burrito)
    this.game.add.existing(this.lettuce)
    this.game.add.existing(this.celery)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.burger, 32, 32)
      this.game.debug.spriteInfo(this.burger, 32, 32)
      this.game.debug.spriteInfo(this.lettuce, 32, 32)
      this.game.debug.spriteInfo(this.celery, 32, 32)
    }
  }
}
