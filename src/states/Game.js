/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import StartText from '../sprites/StartText'

export default class extends Phaser.State {
  init() { }
  preload() { }


  create() {
    const bannerText = 'Phaser + ES6 + Webpack'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false
    })

    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)

      this.player = new Player(0, 0)

      this.startText = new StartText({
          game: this.game,
          x: this.world.centerX,
          y: 150,
          asset:'tapStart'

      })


      this.game.add.existing(this.player)
      this.game.add.existing(this.startText)




  }

  render() {
    if (__DEV__) {
     // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
