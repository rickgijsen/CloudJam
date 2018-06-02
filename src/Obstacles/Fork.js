import Obstacles from './Obstacles'

export default class extends Obstacles {
  constructor ({x, y}) {
    super(x, y, 'fork')
    this.anchor.setTo(0.5)
    this.scale.setTo(0.3, 0.3)

    this.x = x
    this.y = y

    this.fartModifier = -1000;
    this.angle -= 45;
  }
}
