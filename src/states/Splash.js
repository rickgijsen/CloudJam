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
    this.load.image('squirrel', 'assets/images/squirrel.png')
    this.load.image('background', 'assets/images/final/BG.jpg')
    this.load.image('burrito', 'assets/images/final/burrito.png')
    this.load.image('pizza', 'assets/images/final/pizza.png')
    this.load.image('plate', 'assets/images/final/plate1.png')
    this.load.image('spoon', 'assets/images/final/spoon_bottom.png')
    this.load.image('fork', 'assets/images/final/fork.png')
    this.load.image('beans', 'assets/images/final/beans.png')
    this.load.image('glass', 'assets/images/final/glass_top.png')
    this.load.image('fartBar', 'assets/images/empty-bar.png')
    this.load.image('fart', 'assets/images/fart.png')
    this.load.image('button', 'assets/images/button.png')
    this.load.image('popUpBackground', 'assets/images/pop-up-background.png')
    this.load.image('burger', 'assets/images/final/burgers.png')


  }

  create () {
    this.state.start('Game')
  }
}
