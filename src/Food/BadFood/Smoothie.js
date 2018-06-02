import BadFood from './BadFood.js'

export default class extends BadFood {
  constructor ({x, y}) {
    super(x, y, 'smoothie')
    this.anchor.setTo(0.5)
    this.scale.setTo(0.5, 0.5)
    this.fartModifier = -150;
  }
}
