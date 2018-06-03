import Phaser from 'phaser'
import Sprite from '../services/sprite'
import Overlay from '../services/Overlay'

// @author: Aaron Ligthart
export default class extends Phaser.Group {
  constructor (x, y,open) {
    super(game)
      this.open = open
    this.game = game
      this.buildImage ()
      if(this.open === true){
          this.alpha = 0

      }
      if(this.open=== false){

          this.alpha = 1
      }


    this.moved = false
  }

  buildImage () {
    this.sprite = new Sprite({
      x: this.game.world.centerX + 200,
      y: 2000,
      asset: 'hand_fingers',
      anchorX: 0.5,
      anchorY: 0.5,
      alpha: 0
    })

    this.add(this.sprite)
    console.log(this.sprite)
  }

  update () {
  }

  squish () {
      this.alpha = 1
    this.sprite.scale.x = 1
    this.sprite.scale.y = 1

    this.sprite.moveInTween = this.game.add.tween(this.sprite.scale)
      .from({x: 0.5, y: 1.2}, 500, Phaser.Easing.Circular.Out, false)
    this.sprite.moveInTween.start()
    this.sprite.alpha = 1

    this.moveOutTween = this.game.add.tween(this.sprite)
      .to({x: this.game.world.centerX + 200, y: this.game.world.centerY + 1000}, 1100, Phaser.Easing.Elastic.Out, true, 1500)

    this.moveOutTween.start()
  }

  rePosition (x,y) {
    // this.position.x = this.game.world.centerX
    // this.position.y = this.game.world.centerY

    this.moveInTween = this.game.add.tween(this.sprite)

      .to({x: x, y: y}, 1500, Phaser.Easing.default, false)
    this.moveInTween.onComplete.add(() => { this.squish() }, this)
    this.moveInTween.start()
  }
}
