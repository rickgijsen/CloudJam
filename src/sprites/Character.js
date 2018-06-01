import Phaser from 'phaser';
import Sprite from '../services/sprite'
import Overlay from '../services/overlay'

export default class Character extends Phaser.Group {
  constructor (x, y) {
    super(game)

    this.x = x;
    this.y = y;

    this.holdDownLeft = false;
    this.holdDownMiddle = false;
    this.holdDownRight = false;

    this.vSpeed = 10;
    this.hSpeed = 4;

    this.buildImage();
    this.buildController()
  }

  update () {
  }

  buildImage() {
    this.squirrelSprite = new Sprite({
      asset: 'squirrel',
      x: this.game.world.centerX,
      y: this.game.height - 80,
      anchorX: 0.5,
      anchorY: 0.5
    });
    this.squirrelSprite.scale.setTo(0.1, 0.1)

    this.add(this.squirrelSprite);
  }

  buildController() {
    this.clickAreaMiddle = new Overlay({
      x: 0 + this.game.width / 3,
      y: 0,
      alpha: 0
    });
    this.clickAreaMiddle.scale.setTo( (1 / 3) ,1)
    this.add(this.clickAreaMiddle);
    this.clickAreaMiddle.events.onInputDown.add(() => {this.holdDownMiddle = true}, this)
    this.clickAreaMiddle.events.onInputUp.add(() => {this.holdDownMiddle = false}, this)

    this.clickAreaLeft = new Overlay({
      x: 0,
      y: 0,
      alpha: 0
    });
    this.clickAreaLeft.scale.setTo( (1 / 3) ,1)
    this.add(this.clickAreaLeft);
    this.clickAreaLeft.events.onInputDown.add(() => {this.holdDownLeft = true}, this)
    this.clickAreaLeft.events.onInputUp.add(() => {this.holdDownLeft = false}, this)

    this.clickAreaRight = new Overlay({
      x: 0 + (this.game.width / 3) * 2,
      y: 0,
      alpha: 0,
    });
    this.clickAreaRight.scale.setTo( (1 / 3) ,1)
    this.add(this.clickAreaRight);
    this.clickAreaRight.events.onInputDown.add(() => {this.holdDownRight = true}, this)
    this.clickAreaRight.events.onInputUp.add(() => {this.holdDownRight = false}, this)
  }

  moveUp() {
    console.log('fart')
    this.squirrelSprite.y -= this.vSpeed
  }
  moveLeft() {
    console.log('left')
    this.squirrelSprite.x -= this.hSpeed
  }
  moveRight() {
    console.log('right')
    this.squirrelSprite.x += this.hSpeed
  }
  update() {
    if(this.holdDownLeft) {
      this.moveLeft()
    }
    if(this.holdDownMiddle) {
      this.moveUp()
    }
    if(this.holdDownRight) {
      this.moveRight()
    }
  }
}
