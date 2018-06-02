import BadFood from './BadFood.js'

export default class extends BadFood {
  constructor ({x, y}) {
    super(x, y, 'apple')
    this.anchor.setTo(0.5)
    this.scale.setTo(.9, .9)

     this.fartModifier = -100;
  }
}
