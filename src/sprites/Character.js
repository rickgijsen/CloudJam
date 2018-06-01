import Phaser from 'phaser';
import Sprite from '../services/sprite'

export default class Character extends Phaser.Group {
  constructor (x, y) {
    super(game)

    this.x = x;
    this.y = y;

    this.buildImage();
  }

  update () {
  }

  buildImage() {
    this.squirrelSprite = new Sprite({
      asset: 'squirrel',
      x: 0,
      y: 0,
      anchorX: 0.5,
      anchorY: 0.5
    });
    this.squirrelSprite.scale.setTo(0.1, 0.1)

    this.add(this.squirrelSprite);
    console.log(this.squirrelSprite)
  }
}
