import Obstacles from './Obstacles'

export default class extends Obstacles {
  constructor ({x, y}) {
    super(x, y, 'aseprite')
    this.anchor.setTo(0.5)
    this.scale.setTo(0.5, 0.5)

    this.x = x
    this.y = y
  }

  update () {
  }
}
