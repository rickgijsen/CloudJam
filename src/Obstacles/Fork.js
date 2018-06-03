import Obstacles from './Obstacles'

export default class extends Obstacles {
  constructor ({x, y}) {
    super(x, y, 'fork')
    this.anchor.setTo(0.5)

    this.x = x
    this.y = y

    this.isObstacle = true;
    this.angle -= 45;
  }
}
