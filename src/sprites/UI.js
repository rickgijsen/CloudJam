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
    this.banner = new Text({
      text: '',
      fontSize: 20,
      color: '#000000',
      align: 'right',
      x: this.game.width - 45,
      y: 45,
      stroke: '#FFFFFF',
      strokeThickness: 3
    })
    this.banner.padding.set(10, 16)
    this.banner.anchor.setTo(0.5, 0.5)
    this.add(this.banner)
  }

  update() {
    this.banner.text = `${Math.floor(this.movingItems.score / 10) / 100}m`;
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
