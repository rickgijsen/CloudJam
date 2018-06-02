import Phaser from 'phaser'
import Sprite from '../services/sprite'
import Overlay from "../services/Overlay";

//@author: Aaron Ligthart
export default class extends Phaser.Group {
    constructor (x, y) {
        super(game)

        this.game = game
        this.buildImage()
        this.buildController()
        // this.x = x  - this.sprite.texture.width/2
        // this.y = y - this.sprite.texture.height/2
        this.weight = 0
        this.fartSound = game.add.audio('fart01');



  }
  buildImage() {
      this.sprite = new Sprite({
            x: this.game.world.centerX,
          y: this.game.height-50,
          asset: 'char_idle',
          anchorX: 0.5,
          anchorY: 1,
      })
      this.add(this.sprite)
      console.log(this.sprite)

  }

  buildController() {
      this.clickAreaMiddle = new Overlay({
          x: this.game.width/4,
          y: this.game.width/4,
          alpha: 0
      });
      this.clickAreaMiddle.width = this.game.width
      this.add(this.clickAreaMiddle);
      this.clickAreaMiddle.events.onInputDown.add(() => { console.log("clicked"),this.weight++,this.squish()}, this)


  }
  update () {
      if(this.weight === 0) {
          this.sprite.loadTexture('char_idle')
      }
      if(this.weight >0 && this.weight < 10) {
          this.sprite.loadTexture('char_eat_01')
      }
      if(this.weight >=10 && this.weight < 1110) {
          this.sprite.loadTexture('char_eat_02')
      }
  }

  squish() {
        console.log(this.sprite.scale)
      this.sprite.scale.x = 1
      this.sprite.scale.y = 1
      game.soundManager.playSound(this.getRandomFart(Math.floor(Math.random() * 5)))
      this.sprite.moveInTween = this.game.add.tween(this.sprite.scale)
          .from({ x: .5, y:1.2}, 500, Phaser.Easing.Circular.Out, false)



      this.sprite.moveInTween.start();
  }

getRandomFart(fartNumber){
    switch (fartNumber){
        case 0:
            console.log("fart1")
            return "fart01"
            break;
        case 1:
            console.log("fart2")
            return "fart02"
            break;
        case 2:
            console.log("fart3")
            return "fart03"
            break;
        case 3: console.log("fart4")
            return "fart04"
            break;
        case 4: console.log("fart5")
            return "fart05"
            break;
    }
  }
}
