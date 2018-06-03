import GoodFood from './GoodFood.js'

export default class extends GoodFood {
  constructor ({x, y}) {
    super(x, y, 'soda')
    this.anchor.setTo(0.6)
    this.fartModifier = 150;
  }
}
