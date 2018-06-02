import BadFood from './BadFood.js'

export default class extends BadFood {
  constructor ({x, y}) {
    super(x, y, 'evil-burger')
    this.anchor.setTo(0.5)
    this.scale.setTo(0.1, 0.1);
    this.fartModifier = -100;
  }
}
