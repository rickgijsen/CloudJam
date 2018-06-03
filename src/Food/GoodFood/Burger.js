import GoodFood from './GoodFood.js'

export default class extends GoodFood {
  constructor ({x, y}) {
    super(x, y, 'burger')
    this.anchor.setTo(0.5)
    this.scale.setTo(0.4, 0.4)
    this.fartModifier = 50;
  }
}
