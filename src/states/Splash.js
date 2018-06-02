import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/mushroom2.png')
<<<<<<< HEAD
      this.load.image('char_idle','assets/images/char_idle.png')
      this.load.image('char_eat_01','assets/images/char_eat_01.png')
      this.load.image('char_eat_02','assets/images/char_eat_02.png')
      this.load.image('tapStart','assets/images/tapStart.png')
=======
    this.load.image('squirrel', 'assets/images/squirrel.png')
    this.load.image('background', 'assets/images/long.jpg')
    this.load.image('fartBar', 'assets/images/empty-bar.png')
    this.load.image('fart', 'assets/images/fart.png')
>>>>>>> origin/feature/fart-meter
  }

  create () {
    this.state.start('Game')
  }
}
