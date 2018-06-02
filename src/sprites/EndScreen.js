import Phaser from 'phaser';
import Sprite from '../services/Sprite'
import Overlay from '../services/overlay'
import Text from '../services/Text'

export default class EndScreen extends Phaser.Group {
  constructor (x, y) {
    super(game)
    this.visible = false;

    this.x = x;
    this.y = y;

    this.game.openEndScreen.add((score) => {
      this.scoreText.text = `${Math.floor(score / 10) / 100}m`
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
    this.background.scale.setTo(.6, .6)
    this.add(this.background);
  }

  buildButtons() {
    this.restartButton = new Sprite({
      asset: 'button',
      x: this.game.world.centerX,
      y: 450,
      anchorX: 0.5,
      anchorY: 0.5,
      inputEnabled: true
    });
    this.restartButton.scale.setTo(0.5, 0.5)
    this.add(this.restartButton);

    this.restartButton.events.onInputDown.add(() => {
      this.game.state.start('Feed')
    }, this)
  }
  buildText() {
    this.buttonText = new Text({
      text: 'Restart',
      anchorX: 0.5,
      anchorY: 0.5,
      center: true,
      fontSize: 36,
      color: '#2a2a2a',
    });

    this.restartButton.addChild(this.buttonText);

    this.title = new Text({
      text: 'GAME OVER',
      x: this.game.world.centerX,
      y: 220,
      anchorX: 0.5,
      anchorY: 0.5,
      center: true,
      fontSize: 36,
      color: '#2a2a2a',
    });

    this.add(this.title);

    this.scoreText = new Text({
      text: ``,
      x: this.game.world.centerX,
      y: 280,
      anchorX: 0.5,
      center: true,
      fontSize: 36,
      color: '#2a2a2a',
    });

    this.add(this.scoreText);
  }

  switchVisibility() {
    if(this.visible) {
      this.visible = false;
    } else {
      this.visible = true;
    }
  }
}
