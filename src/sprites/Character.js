import Phaser from 'phaser';

export default class extends Phaser.Group {
  constructor ({x, y}) {
    super(game)
    this.x = x;
    this.y = y;

    this.buildImage();
  }

  update () {
  }

  buildImage() {
    this.squirrelSprite = new Phaser.Sprite(this.game, this.x, this.y, 'squirrel');
    this.add(this.squirrelSprite);
  }
}
