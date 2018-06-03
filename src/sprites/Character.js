import Phaser from 'phaser';
import Sprite from '../services/sprite'
import Overlay from '../services/overlay'

export default class Character extends Phaser.Group {
  constructor (x, y,  movingItems, fartBar) {
    super(game)

    this.x = x;
    this.y = y;
    this.fartBar = fartBar;

    this.fatLevel = 2;

    this.holdDownLeft = false;
    this.holdDownMiddle = false;
    this.holdDownRight = false;
    this.keepPlayingSound = false;
    this.soundCanTurnOff = false;

    this.gameOver = false;
    this.doOnce = true;

    this.vForce = 7 ; //start boost
    this.vForceMax = 2;
    this.vForceMaxStart = this.vForceMax;
    this.hForce = 0;
    this.decelerationSpeed = .03;
    this.horizontalMovingSpeed = 6;
    this.accelerationSpeed = 3;
    this.maxMoveDistance = 150;
    this.extraBoostSpeed = 5

    this.buildImage();
    this.buildController()
    this.createShakeTween()
    this.squirrelStartY = this.squirrelSprite.y;

    this.movingObject = movingItems;
    this.startPosY = this.movingObject.y;
    this.xDistanceMoved = 0;
    this.canMoveLeft = true;
    this.canMoveRight = true;
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
    this.squirrelSprite.scale.setTo(0.4, 0.4)

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
    this.clickAreaMiddle.events.onInputUp.add(() => {
        this.holdDownMiddle = false
        if(this.soundCanTurnOff == true) {
            game.soundManager.stopSound('fartBoost')
            this.soundCanTurnOff = false;
            this.keepPlayingSound = false;
        }
    }, this)

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
    if(this.xDistanceMoved > -this.maxMoveDistance) {
      this.squirrelSprite.angle = -20;
      this.hForce = -this.horizontalMovingSpeed;
      this.xDistanceMoved -= this.horizontalMovingSpeed;
    } else {
      this.hForce = 0
    }
  }
  moveRight() {
    if(this.xDistanceMoved< this.maxMoveDistance) {
      this.squirrelSprite.angle = 20;
      this.hForce = this.horizontalMovingSpeed;
      this.xDistanceMoved += this.horizontalMovingSpeed;
    } else {
      this.hForce = 0
    }
  }
  update() {
    if(this.gameOver) {
      this.vForce = 0;
      this.hForce = 0;
      this.movingObject.changeY(this.vForce);
      this.movingObject.changeX(this.hForce);
      return;
    }

    this.movingObject.changeY(this.vForce);
    this.movingObject.changeX(-this.hForce);

    if(this.holdDownLeft) {
      this.moveLeft()
    }else {
      if(!this.holdDownRight) {
        this.hForce = 0;
        this.squirrelSprite.angle = 0;
      }
    }
    if(this.holdDownMiddle) {
      this.moveUp()
      this.vForceMax = this.vForceMaxStart + this.extraBoostSpeed;
    } else {
      this.vForceMax = this.vForceMaxStart;
      this.doOnce = true;
      this.shakeTween.pause()
      this.squirrelSprite.y = this.squirrelStartY;
      this.decelerate(this.decelerationSpeed)
    }
    if(this.holdDownRight) {
      this.moveRight()
    } else {
      if(!this.holdDownLeft) {
        this.hForce = 0;
        this.squirrelSprite.angle = 0;
      }
    }

    if(this.fartBar.filledValue> (this.fartBar.fullValue / 3) * 2) {
      this.fatLevel = 2;
      this.squirrelSprite.loadTexture(`squirrel${this.fatLevel}`);
    } else if(this.fartBar.filledValue> (this.fartBar.fullValue / 3)) {
      this.fatLevel = 1;
      this.squirrelSprite.loadTexture(`squirrel${this.fatLevel}`);
    } else {
      this.fatLevel = 0;
      this.squirrelSprite.loadTexture(`squirrel${this.fatLevel}`);
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
      this.hForce = 0;
      this.gameOver = true;
      this.game.openEndScreen.dispatch(this.movingObject.score);
    }
  }
  createFart() {
    if(this.keepPlayingSound == false) {
        this.keepPlayingSound = game.soundManager.playSound('fartBoost', true)
        this.soundCanTurnOff = true;
    }

    let randomPos = Math.round(Math.random()) * 2 - 1;
    let randomSize = Math.floor(Math.random() * 3 )+ 1;
    let fart = new Sprite({
      asset: 'fart',
      x: this.game.world.centerX + randomPos,
      y: this.game.height - 80,
      anchorX: 0.5,
      anchorY: 0.5,
    })
    fart.alpha = 0.4
    fart.scale.setTo(0.6 * randomSize, 0.6 * randomSize)
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
