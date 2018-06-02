import GoodFood from './GoodFood.js'

export default class extends GoodFood {
  constructor ({x, y}) {
    super(x, y, 'beans')
    this.anchor.setTo(0.5)
    this.scale.setTo(0.5, 0.5)
    this.fartModifier = 100;
  }
}
