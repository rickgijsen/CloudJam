import Phaser from 'phaser';
import Sprite from '../services/sprite'
import Overlay from '../services/overlay'

export default class FartMeter extends Phaser.Group {
  constructor (x, y) {
    super(game)

    this.x = x;
    this.y = y;

    this.fullValue = 1000;
    this.filledValue = 800;

    this.fartCost = 5;

    this.buildBar();
  }

  buildBar() {
    this.bar = new Sprite({
      asset: 'fartBar',
      x: 10,
      y: 10,
      anchorX: 0,
      anchorY: 0
    });
    this.bar.scale.setTo(0.2, 0.2)
    this.add(this.bar);

    this.fill = new Overlay({
      color: '#358c3c',
      x: 20,
      y: 20,
      alpha: 1,
      width: 185,
      height: 10
    })
    this.add(this.fill);
  }

  setBarValue() {
    let percentage = this.filledValue / this.fullValue;
    this.fill.scale.setTo(percentage, 1);
  }

  update() {
    this.setBarValue()
  }
  addFarts(value) {
    this.filledValue += value;
  }
}
