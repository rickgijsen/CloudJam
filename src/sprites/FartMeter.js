import Phaser from 'phaser';
import Sprite from '../services/sprite'
import Player from '../sprites/Player'

import Overlay from '../services/overlay'

export default class FartMeter extends Phaser.Group {
  constructor (x, y) {
    super(game)

    this.x = x;
    this.y = y;

    this.fullValue = 1000;
    this.filledValue =  this.game.fartBoostValue;

    this.fartCost = 1;

    this.buildBar();
  }

  buildBar() {
    this.barBottom = new Sprite({
      asset: 'fartBarBg',
      x: 75,
      y: 22,
      anchorX: 0,
      anchorY: 0
    });
    this.barBottom.scale.setTo(0.6, 0.6)
    this.add(this.barBottom);

    this.fill = new Sprite({
      asset: 'fartBarFill',
      x: 75,
      y: 20,
      anchorX: 0,
      anchorY: 0
    })
    this.fill.scale.setTo(0.6, 0.6)
    this.add(this.fill);

    this.bar = new Sprite({
      asset: 'fartBar',
      x: 10,
      y: 10,
      anchorX: 0,
      anchorY: 0
    });
    this.bar.scale.setTo(0.6, 0.6)
    this.add(this.bar);
  }

  setBarValue() {
    if(this.filledValue < 0) {
      this.filledValue = 0
    } else if(this.filledValue > this.fullValue) {
      this.filledValue = this.fullValue
    }

    let percentage = this.filledValue / this.fullValue;
    this.fill.scale.setTo(percentage * 0.7, .7);
  }

  update() {
    this.setBarValue()
  }
  addFarts(value) {
    this.filledValue += value;
  }
}
