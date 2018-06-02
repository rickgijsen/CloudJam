import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (x, y, asset) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)

    game.physics.arcade.enable(this, Phaser.Physics.ARCADE)

    this.x = x
    this.y = y

    this.velocityX = 0
    this.velocityY = 0
  }

  update () {
  }
}
