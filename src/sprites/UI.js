import Phaser from 'phaser';
import Sprite from '../services/sprite'
import Overlay from '../services/overlay'
import Text from '../services/Text'
import FartMeter from "./FartMeter";

export default class UI extends Phaser.Group {
  constructor (x, y, movingItems) {
    super(game)

    this.x = x;
    this.y = y;
    this.movingItems = movingItems;

    this.buildFartMeter();
    this.buildScore()

    this.game.toggleUI.add(() => {
      this.switchVisibility();
    })
  }

  buildFartMeter() {
    this.fartBar = new FartMeter(0, 0);
    this.add(this.fartBar);
  }

  buildScore() {
    this.scoreText = ''
    this.banner = new Text({
      text: this.scoreText,
      fontSize: 40,
      fill: '#000000',
      align: 'right',
      x: this.game.world.centerX + 120,
      y: 30
    })
    this.banner.padding.set(10, 16)
    this.banner.anchor.setTo(0.5, 0.5)
    this.add(this.banner)
  }

  update() {
    this.banner.text = this.movingItems.score;
    this.fartBar.update();
  }
  switchVisibility() {
    if(this.visible) {
      this.visible = false;
    } else {
      this.visible = true;
    }
  }
}
