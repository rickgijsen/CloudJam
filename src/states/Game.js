/* globals __DEV__ */
import Phaser from 'phaser'
import Burger from '../Food/Burger'
import Burrito from '../Food/Burrito'
import Lettuce from '../Food/Lettuce'
import Celery from '../Food/Celery'

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

  update () {
    game.physics.arcade.collide(this.burger, this.burrito, this.doCollide, null, this)
  }

  doCollide () {
    console.log('collide')
    this.burger.x *= -1
    this.burrito.x *= -1
  }
}
