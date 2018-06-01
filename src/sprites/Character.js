import Phaser from 'phaser';
import Sprite from '../services/sprite'
import Overlay from '../services/overlay'

export default class Character extends Phaser.Group {
  constructor (x, y,  movingItems) {
    super(game)

    this.x = x;
    this.y = y;

    this.holdDownLeft = false;
    this.holdDownMiddle = false;
    this.holdDownRight = false;


    this.vForce = 0;
    this.vForceMax = 10;
    this.hForce = 0;
    this.decelerationSpeed = .5;

    this.buildImage();
    this.buildController()

    this.movingObject = movingItems;
    this.startPosY = this.movingObject.y;
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
    this.accelerate()
  }
  moveLeft() {
    console.log('left')
    this.hForce = -3;
  }
  moveRight() {
    console.log('right')
    this.hForce = 3;
  }
  update() {
    console.log(this.vForce)
    // this.movingObject.y -= this.vForce;
    // this.movingObject.x +=  this.hForce;
    this.movingObject.changeY(this.vForce);
    this.movingObject.changeX(-this.hForce);

    if(this.holdDownLeft) {
      this.moveLeft()
    }else {
      if(!this.holdDownRight) {
        this.hForce = 0;
      }
    }
    if(this.holdDownMiddle) {
      this.moveUp()
    } else {
      this.decelerate(this.decelerationSpeed)
    }
    if(this.holdDownRight) {
      this.moveRight()
    } else {
      if(!this.holdDownLeft) {
        this.hForce = 0;
      }
    }
  }
  accelerate() {
    if(this.vForce < this.vForceMax) {
      this.vForce += 1;
    }
  }
  decelerate(decelerationSpeed) {
    if(this.vForce > 0) {
      this.vForce -= decelerationSpeed;
    } else {
      this.vForce = 0;
    }
  }
}
