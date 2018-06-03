import Phaser from 'phaser';
import Sprite from '../services/sprite'
import Overlay from '../services/overlay'
import Text from '../services/Text'

export default class EndScreen extends Phaser.Group {
  constructor (x, y) {
    super(game)
    this.visible = false;

    this.x = x;
    this.y = y;

    this.overlay = new Overlay({
      x: -1000,
      y: -1000,
      alpha: 0.7,
    })
    this.overlay.scale.setTo(4, 4)
    this.add(this.overlay)

    this.game.openEndScreen.add((score) => {
      this.scoreText.text = `Score: \n${Math.floor(score / 10) / 100}m`
      this.switchVisibility();
      this.game.toggleUI.dispatch();
    });
    this.buildBackground();
    this.buildButtons();
    this.buildText()
  }

  buildBackground() {
    this.background = new Sprite({
      asset: 'popUpBackground',
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      anchorX: 0.5,
      anchorY: 0.5
    });
    this.background.scale.setTo(.5, .5)
    this.add(this.background);
  }

  buildButtons() {
    this.restartButton = new Sprite({
      asset: 'button',
      x: this.game.world.centerX,
      y: this.game.world.centerY + 200,
      anchorX: 0.5,
      anchorY: 0.5,
      inputEnabled: true
    });
    this.restartButton.scale.setTo(0.5, 0.5)
    this.add(this.restartButton);

    this.restartButton.events.onInputDown.add(() => {
      this.game.state.start('Game')
    }, this)
  }
  buildText() {
    this.buttonText = new Text({
      text: 'Restart',
      anchorX: 0.5,
      anchorY: 0.5,
      center: true,
      fontSize: 30,
      color: '#000000',
      stroke: '#FFFFFF',
      strokeThickness: 3
    });

    this.restartButton.addChild(this.buttonText);

    this.title = new Text({
      text: 'GAME OVER',
      x: this.game.world.centerX,
      y: this.game.world.centerY - 165,
      anchorX: 0.5,
      anchorY: 0.5,
      center: true,
      fontSize: 20,
      color: '#000000',
      stroke: '#FFFFFF',
      strokeThickness: 3
    });

    this.add(this.title);

    this.scoreText = new Text({
      text: ``,
      x: this.game.world.centerX,
      y: this.game.world.centerY + 90,
      anchorX: 0.5,
      center: true,
      fontSize: 18,
      color: '#000000',
      stroke: '#FFFFFF',
      strokeThickness: 3
    });

    this.add(this.scoreText);
  }

  switchVisibility() {
    if(this.visible) {
      this.visible = false;
    } else {
      this.visible = true;
      this.fadeInTween = this.game.add.tween(this.overlay)
        .from({ alpha: 0 }, 200, Phaser.Easing.Default, false);
      this.fadeInTween.start();
      this.moveInTween = this.game.add.tween(this)
        .from({ y: -800 }, 800, Phaser.Easing.Elastic.Out, false);
      this.moveInTween.start();
    }
  }
}
