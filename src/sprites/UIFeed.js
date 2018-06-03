import Phaser from 'phaser';
import Sprite from '../services/sprite'
import Overlay from '../services/overlay'
import Text from '../services/Text'
import FartMeter from "./FartMeter";
import MuteButton from "./MuteButton";

export default class UIFeed extends Phaser.Group {
  constructor (x, y, player, feed) {
    super(game)

    this.player = player
    this.feed = feed
    this.x = x;
    this.y = y;
    this.buildFartMeter();
    this.buildMute()
    this.buildText()

    this.game.toggleUIFeed.add(() => {
      this.switchVisibility();
    })
    this.game.addFarts.add((amount) => {
      this.fartBar.addFarts(amount)
    })
    this.game.gameStart.add(() => {
      this.changeUI()
    })
  }

  buildFartMeter() {
    this.fartBar = new FartMeter(0, 0);
    this.add(this.fartBar);
  }

  buildMute() {
    this.muteButton = new MuteButton(0, 0)
    this.add(this.muteButton)
  }

  buildText() {
    this.startText = new Text({
      text: 'Tap to feed!',
      anchorX: 0.5,
      anchorY: 0.5,
      x: this.game.world.centerX,
      y: this.game.world.centerY - 150,
      center: true,
      fontSize: 15,
      color: '#000000',
      stroke: '#FFFFFF',
      strokeThickness: 3
    });

    this.add(this.startText);
    this.slowScaleTween = this.game.add.tween(this.startText.scale)
      .to({ x: 1.1, y: 1.1 }, 1000, Phaser.Easing.Elastic.Out, false)
      .to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, false)
      .loop(true);
    this.fastScaleTween = this.game.add.tween(this.startText.scale)
      .to({ x: 1.1, y: 1.1 }, 100, Phaser.Easing.Elastic.Out, false)
      .to({ x: 1, y: 1 }, 100, Phaser.Easing.Elastic.Out, false)
      .loop(true);
    this.slowScaleTween.start();

    this.counterText = new Text({
      text: '10',
      anchorX: 0.5,
      anchorY: 0.5,
      x: this.game.world.centerX,
      y: this.game.world.centerY - 150,
      center: true,
      fontSize: 50,
      color: '#000000',
      stroke: '#FFFFFF',
      strokeThickness: 3
    });
    this.counterText.visible = false;
    this.add(this.counterText)
  }
  changeUI() {
    this.slowScaleTween.stop();
    this.fastScaleTween.start();
    this.counterText.visible = true;
    this.muteButton.visible = false;
    this.fartBar.scale.setTo(1.3, 1.3)

    this.moveTween = this.game.add.tween(this.startText)
      .to({y: this.game.world.centerY - 210 }, 1000, Phaser.Easing.Elastic.Out, false)
    this.moveTween.start();

    this.bobbleTween = this.game.add.tween(this.fartBar)
      .to({ y: this.fartBar.y + 5 }, 80, Phaser.Easing.Default, false)
      .to({ y: this.fartBar.y -5 }, 80, Phaser.Easing.Default, false)
      .loop(true)
    this.bobbleTween.start();
  }

  update() {
    this.fartBar.update();
    this.counterText.text = this.feed.timerLength - Math.floor(this.feed.timer.seconds)
  }
  switchVisibility() {
    if(this.visible) {
      this.visible = false;
    } else {
      this.visible = true;
    }
  }
}
