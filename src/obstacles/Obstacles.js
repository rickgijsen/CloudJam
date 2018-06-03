import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (x, y, asset ) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.scale.setTo(0.7, 0.7);

    game.physics.arcade.enable(this, game.physics.arcade)

    this.x = x
    this.y = y
  }
}
