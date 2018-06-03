import Phaser from 'phaser';
import Sprite from '../services/sprite'
import Overlay from '../services/overlay'
import Text from '../services/Text'
import FartMeter from "./FartMeter";
import MuteButton from "./MuteButton";

export default class UIFeed extends Phaser.Group {
  constructor (x, y, movingItems) {
    super(game)

    this.x = x;
    this.y = y;
    this.movingItems = movingItems;

    this.buildFartMeter();
    this.buildMute()

    this.game.toggleUIFeed.add(() => {
      this.switchVisibility();
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

  update() {
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
