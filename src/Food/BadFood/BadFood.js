import Phaser from 'phaser'
import GoodFood from '../GoodFood/GoodFood'

export default class extends Phaser.Sprite {
  constructor (x, y, asset) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.scale.setTo(0.6, 0.6)

    game.physics.arcade.enable(this, Phaser.Physics.ARCADE)

    this.x = x
    this.y = y
  }
}
