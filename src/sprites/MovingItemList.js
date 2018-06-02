import Phaser from 'phaser'
import Sprite from '../services/Sprite'

export default class extends Phaser.Group {
  constructor (x, y, velocityX, velocityY) {
    super(game)

    this.x = x
    this.y = y

    this.velocityX = 0
    this.velocityY = 2
    this.combinedVelocity = 0
    this.spawnDistance = 500
    this.score = 0;

    this.second = 60
    this.standerdTime = this.second * 3
    this.timer = 0

    this.background = new Sprite({
      asset: 'background',
      x: 0,
      y: this.game.world.height,
      anchorX: 0,
      anchorY: 1
    })
    this.add(this.background)
  }

  update () {
    this.combinedVelocity += this.velocityY;
    this.score += this.velocityY;
    let xModifier = this.velocityX
    let yModifier = this.velocityY
    this.forEach(function (item) {
      item.position.y += yModifier
      item.position.x += xModifier

      if (item.position.y > screen.height && item.key != 'background') {
        console.log(item)
        item.destroy()
      }
    })

    console.log(this.combinedVelocity + ' spawndis: ' + this.spawnDistance)
    if (this.combinedVelocity > this.spawnDistance) {
      this.spawnItems()
      this.combinedVelocity = 0
    }
  }

  changeX (newX) {
    this.velocityX = newX
  }

  changeY (newY) {
    this.velocityY = newY
  }

  spawnItems () {
    let amountOfItems = Math.floor(Math.random() * 5) + 1
    for (var i = 0; i < amountOfItems; i++) {
      let position = Math.floor(Math.random() * (screen.width + 1))
      this.items = new Sprite({
        asset: 'mushroom',
        x: position,
        y: 0,
        anchorX: 0.5,
        anchorY: 0.5
      })
      this.add(this.items)
    }
  }
}
