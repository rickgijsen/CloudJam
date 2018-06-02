/* globals __DEV__ */
import Phaser from 'phaser'
import Burger from '../Food/GoodFood/Burger'
import Burrito from '../Food/GoodFood/Burrito'
import Beans from '../Food/GoodFood/Beans'
import Pizza from '../Food/GoodFood/Pizza'
import Lettuce from '../Food/BadFood/Lettuce'
import Celery from '../Food/BadFood/Celery'
import Smoothie from '../Food/BadFood/Smoothie'
import Lemons from '../Food/BadFood/Lemons'

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    const bannerText = 'Phaser + ES6 + Webpack'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false
    })

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

    this.beans = new Beans({
      x: game.width / 3,
      y: game.height / 3
    })

    this.pizza = new Pizza({
      x: game.width / 1.8,
      y: game.height / 2.3
    })

    this.lettuce = new Lettuce({
      x: game.width / 4,
      y: game.height / 4
    })

    this.celery = new Celery({
      x: game.width / 1.5,
      y: game.width / 3
    })

    this.smoothie = new Smoothie({
      x: game.width / 3.1,
      y: game.width / 2.8
    })

    this.lemons = new Lemons({
      x: game.width / 5,
      y: game.height / 4.1
    })

    this.game.add.existing(this.burger)
    this.game.add.existing(this.burrito)
    this.game.add.existing(this.beans)
    this.game.add.existing(this.pizza)
    this.game.add.existing(this.lettuce)
    this.game.add.existing(this.celery)
    this.game.add.existing(this.smoothie)
    this.game.add.existing(this.lemons)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.burger, 32, 32)
      this.game.debug.spriteInfo(this.burrito, 32, 32)
      this.game.debug.spriteInfo(this.beans, 32, 32)
      this.game.debug.spriteInfo(this.pizza, 32, 32)
      this.game.debug.spriteInfo(this.lettuce, 32, 32)
      this.game.debug.spriteInfo(this.celery, 32, 32)
      this.game.debug.spriteInfo(this.smoothie, 32, 32)
      this.game.debug.spriteInfo(this.lemons, 32, 32)
    }
  }
}
