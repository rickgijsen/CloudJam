import Obstacles from './Obstacles'

export default class extends Obstacles {
  constructor ({x, y}) {
    super(x, y, 'spoon')
    this.anchor.setTo(0.5)
    this.scale.setTo(0.4, 0.4)

    this.x = x
    this.y = y

    this.fartModifier = -150;
  }
}
