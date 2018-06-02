import Phaser from 'phaser'
import Sprite from '../services/sprite'
import Overlay from "../services/Overlay";

//@author: Aaron Ligthart
export default class extends Phaser.Group {
    constructor (x, y) {
        super(game)
        this.buildImage()
        this.buildController()
        this.x = x  - this.sprite.texture.width/2;
        this.y = y - this.sprite.texture.height/2;
        this.weight = 0;



  }
  buildImage() {
      this.sprite = new Sprite({

          asset: 'char_idle',
          anchor: 0.5
      })
      this.add(this.sprite)
      console.log(this.sprite)

      this.sprite.x = this.game.world.centerX,
      this.sprite.y = this.game.height-150
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
        console.log(this.sprite.texture.width)
      this.sprite.moveInTween = this.game.add.tween(this)
          .from({ width: -500 }, 500, Phaser.Easing.Bounce.InOut, false);
      this.sprite.moveInTween.start();
  }
}
