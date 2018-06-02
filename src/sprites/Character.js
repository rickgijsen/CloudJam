import Phaser from 'phaser';
import Sprite from '../services/sprite'
import Overlay from '../services/overlay'

export default class Character extends Phaser.Group {
  constructor (x, y,  movingItems, fartBar) {
    super(game)

    this.x = x;
    this.y = y;
    this.fartBar = fartBar;

    this.fatLevel = 0;

    this.holdDownLeft = false;
    this.holdDownMiddle = false;
    this.holdDownRight = false;

    this.gameOver = false;
    this.doOnce = true;

    this.vForce = 30;
    this.vForceMax = 30;
    this.hForce = 0;
    this.decelerationSpeed = .2;
    this.horizontalMovingSpeed = 5;
    this.accelerationSpeed = 2;

    this.buildImage();
    this.buildController()
    this.createShakeTween()
    this.squirrelStartY = this.squirrelSprite.y;

    this.movingObject = movingItems;
    this.startPosY = this.movingObject.y;
  }


  buildImage() {
    this.squirrelSprite = new Sprite({
      asset: `squirrel${this.fatLevel}`,
      x: this.game.world.centerX,
      y: this.game.height - 100,
      anchorX: 0.5,
      anchorY: 0.5
    });

    game.physics.arcade.enable(this.squirrelSprite, Phaser.Physics.ARCADE)
    this.squirrelSprite.scale.setTo(0.7, 0.7)

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
    if(this.fartBar.filledValue > 0) {
      this.accelerate()
    } else {
      this.decelerate(this.decelerationSpeed)
      return;
    }
    if(this.fartBar.filledValue > 0) {
      this.fartBar.filledValue -= this.fartBar.fartCost;
    }
    this.createFart()
  }
  moveLeft() {
    this.hForce = -this.horizontalMovingSpeed;
  }
  moveRight() {
    this.hForce = this.horizontalMovingSpeed;
  }
  update() {
    console.log(this.movingObject.background.x)
    if(this.gameOver) {
      this.vForce = 0;
      this.movingObject.changeY(this.vForce);
      return;
    }
    // this.movingObject.y -= this.vForce;
    // this.movingObject.x +=  this.hForce;
    this.movingObject.changeY(this.vForce);
    this.movingObject.changeX(-this.hForce);

    if(this.holdDownLeft) {
      this.squirrelSprite.angle = -10;
      this.moveLeft()
    }else {
      if(!this.holdDownRight) {
        this.hForce = 0;
        this.squirrelSprite.angle = 0;
      }
    }
    if(this.holdDownMiddle) {
      this.moveUp()
    } else {
      this.doOnce = true;
      this.shakeTween.pause()
      this.squirrelSprite.y = this.squirrelStartY;
      this.decelerate(this.decelerationSpeed)
    }
    if(this.holdDownRight) {
      this.squirrelSprite.angle = 10;
      this.moveRight()
    } else {
      if(!this.holdDownLeft) {
        this.hForce = 0;
        this.squirrelSprite.angle = 0;
      }
    }
  }
  accelerate() {
    if(this.doOnce) {
      this.accelerateAnim()
      this.moveTween = this.game.add.tween(this.squirrelSprite)
        .to({ y: this.squirrelSprite.y - 10}, 100, Phaser.Easing.Bounce.Out, false)
      this.moveTween.start()
    }
    if(this.vForce < this.vForceMax) {
      this.vForce += this.accelerationSpeed;
    }
  }
  decelerate(decelerationSpeed) {
    if(this.vForce > 0) {
      this.vForce -= decelerationSpeed;
    } else {
      this.vForce = 0;
      this.gameOver = true;
      this.game.openEndScreen.dispatch(this.movingObject.score);
    }
  }
  createFart() {
    let random = Math.floor(Math.random() * (4 - -4) ) + -4;
    let fart = new Sprite({
      asset: 'fart',
      x: this.game.world.centerX + random,
      y: this.game.height - 80,
      anchorX: 0.5,
      anchorY: 0.5,
    })
    fart.alpha = 0.2
    fart.scale.setTo(0.6, 0.6)
    this.add(fart)
    this.bringToTop(this.squirrelSprite)
    this.fartTween = this.game.add.tween(fart)
      .to({ y: fart.y + 200}, 300, Phaser.Easing.Exponential.In, false);
    this.fartTween.start()
    this.fartGrowTween = this.game.add.tween(fart.scale)
      .from({ y: 0.2, x: 0.2}, 300, Phaser.Easing.Exponential.In, false);
    this.fartGrowTween.start()
    this.fartGrowTween.onComplete.add(() => {fart.destroy(true)}, this);
  }
  accelerateAnim() {
    this.doOnce = false;
    this.shakeTween.start();
    this.shakeTween.resume();
  }

  createShakeTween() {
    this.shakeTween = this.game.add.tween(this.squirrelSprite)
      .to({ x: this.squirrelSprite.x + 1}, 10, Phaser.Easing.Bounce.Out, false)
      .to({ x: this.squirrelSprite.x - 2 }, 20, Phaser.Easing.Bounce.Out, false)
      .to({ x: this.squirrelSprite.x + 1}, 10, Phaser.Easing.Bounce.Out, false)
      .loop(true)
  }
}
