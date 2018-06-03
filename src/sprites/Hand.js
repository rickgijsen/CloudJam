import Phaser from 'phaser'
import Sprite from '../services/sprite'
import Player from '../sprites/Player'
import Overlay from '../services/Overlay'

// @author: Aaron Ligthart
export default class extends Phaser.Group {
  constructor (x, y, player,open) {
    super(game)
      this.open = open
    this.game = game
      if(this.open=== true){
          this.buildImage('hand_open')
      }
      if(this.open=== false){
          this.buildImage('hand_closed')

      }


    // this.x = x  - this.sprite.texture.width/2
    // this.y = y - this.sprite.texture.height/2

    this.moved = false

    this.player = player

    this.timer = this.game.time.create(false)
    this.timeTillFadeout = 1 * 1000
  }

  buildImage (asset) {
    this.sprite = new Sprite({
      x: this.game.world.centerX + 200,
      y: 2000,

      asset: asset,
      anchorX: 0.5,
      anchorY: 0.5
    })
    this.add(this.sprite)
    console.log(this.sprite)
  }

  update () {
  }

  squish () {
    this.open = false
    this.sprite.scale.x = 1
    this.sprite.scale.y = 1

    game.soundManager.playSound(this.getRandomFart(Math.floor(Math.random() * 5)))

    this.sprite.moveInTween = this.game.add.tween(this.sprite.scale)
      .from({x: 0.5, y: 1.2}, 500, Phaser.Easing.Circular.Out, false)
    this.sprite.moveInTween.start()

    this.sprite.loadTexture('hand_closed')
    console.log('hands down you got a fatty of', this.player.weight)
    switch (this.player.fatLevel) {
      case 0:
        this.player.sprite.loadTexture('char_ns')
        console.log('normal')
        break
      case 1:
        this.player.sprite.loadTexture('char_ms')
        console.log('middle')

        break
      case 2:
        this.player.sprite.loadTexture('char_fs')
        console.log('fat')
        break
      default:
        this.player.sprite.loadTexture('char_ns')
        break
    }

    this.moveOutTween = this.game.add.tween(this.sprite)
      .to({x: this.game.world.centerX + 200, y: this.game.world.centerY + 1000}, 1000, Phaser.Easing.Default, true, 1500)
    this.movePlayerOutTween = this.game.add.tween(this.player.sprite)
      .to({x: this.game.world.centerX + 100, y: this.game.world.centerY + 1000}, 1000, Phaser.Easing.Default, true, 1500)
    this.moveOutTween.onComplete.add(() => { this.game.state.start('Game') }, this)
    this.moveOutTween.start()
    this.movePlayerOutTween.start()
  }
  onTimerComplete () {

  }
  rePosition (x,y) {



    this.moveInTween = this.game.add.tween(this.sprite)

      .to({x: x, y: y}, 1500, Phaser.Easing.Circular.Out, false)
    this.moveInTween.onComplete.add(() => { this.squish() }, this)
    this.moveInTween.start()
  }

  getRandomFart (fartNumber) {
    switch (fartNumber) {
      case 0:
        console.log('fart1')
        this.fartNumber = 0

        return 'fart01'
        break
      case 1:
        console.log('fart2')
        this.fartNumber = 0
        return 'fart02'
        break
      case 2:
        console.log('fart3')
        this.fartNumber = 0
        return 'fart03'
        break
      case 3:
        console.log('fart4')
        this.fartNumber = 0
        return 'fart04'
        break
      case 4:
        console.log('fart5')
        this.fartNumber = 0
        return 'fart05'
        break
    }
  }
}
