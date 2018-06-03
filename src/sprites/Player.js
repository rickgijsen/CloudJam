import Phaser from 'phaser'
import Sprite from '../services/sprite'
import Overlay from '../services/Overlay'
import Burrito from '../Food/GoodFood/Burrito'

// @author: Aaron Ligthart
export default class extends Phaser.Group {
  constructor (x, y) {
    super(game)

    this.game = game
    this.buildImage()
    this.buildController()
    // this.x = x  - this.sprite.texture.width/2
    // this.y = y - this.sprite.texture.height/2
    this.weight = 0
    this.weightperStep = 10
    this.fartSound = game.add.audio('fart01')
    this.fartNumber = 0

    this.fatLevel = 0
  }

  buildImage () {
    this.sprite = new Sprite({
      x: this.game.world.centerX,
      y: this.game.height - 50,
      asset: 'char_nu',
      anchorX: 0.5,
      anchorY: 1
    })
    this.add(this.sprite)
    console.log(this.sprite)
  }

  buildController () {
    this.clickAreaMiddle = new Overlay({
      x: this.game.width / 4,
      y: this.game.width / 4,
      alpha: 0
    })
    this.clickAreaMiddle.width = this.game.width
    this.add(this.clickAreaMiddle)
    this.clickAreaMiddle.events.onInputDown.add(() => {
      console.log('clicked'), this.squish(), this.dropFood()
    }, this)
  }
  updateWeight () {
    this.weight += this.weightperStep
    console.log(this.weight)
    if (this.weight === 0) {
      this.sprite.loadTexture('char_nu')
      this.fatLevel = 0
    }
    if (this.weight > 330 && this.weight < 650) {
      this.sprite.loadTexture('char_mu')
      this.fatLevel = 1
    }
    if (this.weight >= 660 && this.weight < 1000) {
      this.sprite.loadTexture('char_fu')
      this.fatLevel = 2
    }
  }
  update () {

  }

  squish () {
    //  console.log(this.sprite.scale)
    this.updateWeight()
    this.sprite.scale.x = 1
    this.sprite.scale.y = 1
    game.soundManager.playSound(this.getRandomFart(Math.floor(Math.random() * 5)))
    this.sprite.moveInTween = this.game.add.tween(this.sprite.scale)
      .from({x: 0.5, y: 1.2}, 500, Phaser.Easing.Circular.Out, false)

    this.sprite.moveInTween.start()
  }

  dropFood () {
    let burrito = new Sprite({
      asset: 'burrito',
      x: this.game.world.centerX / 1.2,
      y: this.game.world.centerY,
      anchorX: 0.5,
      anchorY: 0.5
    })
    burrito.scale.setTo(0.5, 0.5)
    console.log('BURRITO SPAWNED')
    this.add(burrito)
    this.moveInTween = this.game.add.tween(burrito)
      .from({ y: 0 }, 500, Phaser.Easing.Default, false, 0)
    this.moveInTween.onComplete.add(() => {
      burrito.destroy()
    })
    this.moveInTween.start()
    this.game.world.bringToTop(burrito)
    console.log('FOOD DROPPED')
  }

  getRandomFart (fartNumber) {
    switch (fartNumber) {
      case 0:
        //  console.log("fart1")
        this.fartNumber = 0

        return 'fart01'
        break
      case 1:
        //  console.log("fart2")
        this.fartNumber = 1

        return 'fart02'
        break
      case 2:
        //  console.log("fart3")
        this.fartNumber = 0
        return 'fart03'
        break
      case 3:
        //   console.log("fart4")
        this.fartNumber = 0
        return 'fart04'
        break
      case 4:
        // console.log("fart5")
        this.fartNumber = 0
        return 'fart05'
        break
    }
  }
}
