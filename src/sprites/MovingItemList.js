import Phaser from 'phaser'
import Sprite from '../services/Sprite'
import Burger from '../Food/GoodFood/Burger'
import Lettuce from '../Food/BadFood/Lettuce'
import Celery from '../Food/BadFood/Celery'
import Apple from '../Food/BadFood/Apple'
import Burrito from '../Food/GoodFood/Burrito'
import Pizza from '../Food/GoodFood/Pizza'
import Fork from '../Obstacles/Fork'
import Glass from '../Obstacles/Glass'
import Plate from '../Obstacles/Plate'
import Spoon from '../Obstacles/Spoon'
import Beans from '../Food/GoodFood/Beans'
import Smoothie from '../Food/BadFood/Smoothie'
import Carrot from '../Food/BadFood/Carrot'
import Soda from '../Food/GoodFood/Soda'

export default class extends Phaser.Group {
  constructor (x, y, velocityX, velocityY) {
    super(game)

    this.x = x
    this.y = y

    this.score = 0
    this.velocityX = 0
    this.velocityY = 2
    this.combinedVelocity = 0
    this.spawnDistance = 1000

    // spawn the background
    this.background = new Sprite({
      asset: 'background',
      x: this.game.world.centerX,
      y: this.game.world.height,
      anchorX: 0.5,
      anchorY: 1
    })
    this.background.scale.setTo(.5, .5)
    this.add(this.background)

    this.background2 = new Sprite({
      asset: 'background',
      x: this.game.world.centerX,
      y: this.game.world.height - this.background.height + 1,
      anchorX: 0.5,
      anchorY: 1
    })
    this.background2.scale.setTo(.5, .5)
    this.add(this.background2)
  }

  update () {
    // update the distance traveled
    this.combinedVelocity += this.velocityY
    this.score += Math.floor(this.velocityY)
    let xModifier = this.velocityX
    let yModifier = this.velocityY

    // update the items
    let worldHeight = this.game.world.height
    let backgroundHeight = this.background.height

    this.forEach(function (item) {
      item.position.y += yModifier
      item.position.x += xModifier

      // destroy the item if it leaves the screen
      if (item.position.y > screen.height && item.key != 'background') {
        // destroy the item out of bounds
        item.destroy()
      } else if (item.position.y > worldHeight + backgroundHeight) {
        let temp = item.position.y - (worldHeight + backgroundHeight)
        item.position.y = worldHeight - backgroundHeight + temp
      }
    })

    if (this.combinedVelocity > this.spawnDistance) {
      this.spawnItems()
      this.combinedVelocity = 0
      this.randomDistance = Math.floor(Math.random() * 500) + 500
      this.spawnDistance = this.randomDistance
    }
  }

  changeX (newX) {
    this.velocityX = newX
  }

  changeY (newY) {
    this.velocityY = newY
  }

  spawnItems () {
    var position = Math.floor(Math.random() * (screen.width - 300 + 1) + 300)
    var chooseFood = Math.floor(Math.random() * (3))
    switch (chooseFood) {
      case 0:
        this.spawnGoodFood(position)
        break
      case 1:
        this.spawnBadFood(position)
        break
      case 2:
        this.spawnObstacles(position)
        break
    }
    this.add(this.items)
  }

  spawnGoodFood (position) {
    var chooseFood = Math.floor(Math.random() * (5))
    switch (chooseFood) {
      case 0:
        this.items = new Burger({
          x: position,
          y: 0
        })
        break
      case 1:
        this.items = new Burrito({
          x: position,
          y: 0
        })
        break
      case 2:
        this.items = new Beans({
          x: position,
          y: 0
        })
        break
      case 3:
        this.items = new Pizza({
          x: position,
          y: 0
        })
        break
      case 4:
        this.items = new Soda({
          x: position,
          y: 0
        })
        break
    }
  }

  spawnBadFood (position) {
    var chooseFood = Math.floor(Math.random() * (5))
    switch (chooseFood) {
      case 0:
        this.items = new Lettuce({
          x: position,
          y: 0
        })
        break
      case 1:
        this.items = new Celery({
          x: position,
          y: 0
        })
        break
      case 2:
        this.items = new Apple({
          x: position,
          y: 0
        })
        break
      case 3:
        this.items = new Smoothie({
          x: position,
          y: 0
        })
        break
      case 4:
        this.items = new Carrot({
          x: position,
          y: 0
        })
        break
    }
  }

  spawnObstacles (position) {
    var chooseFood = Math.floor(Math.random() * (4))
    switch (chooseFood) {
      case 0:
        this.items = new Fork({
          x: position,
          y: 0
        })
        break
      case 1:
        this.items = new Glass({
          x: position,
          y: 0
        })
        break
      case 2:
        this.items = new Plate({
          x: position,
          y: 0
        })
        break
      case 3:
        this.items = new Spoon({
          x: position,
          y: 0
        })
        break
    }
  }
}
