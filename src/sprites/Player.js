import Phaser from 'phaser'

//@author: Aaron Ligthart
export default class extends Phaser.Sprite {


  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
      this.weight = 60;


  }

  update () {
      if(this.weight === 0) {
          this.asset = 'char_idle'
      }
      if(this.weight > 50) {

      }
      if(this.weight === 100) {
          this.asset = 'char_eat_02'
      }

  }
}
