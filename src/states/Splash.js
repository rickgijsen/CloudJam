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
    this.load.image('squirrel0', 'assets/images/final/thin_squirrel.png')
    this.load.image('squirrel1', 'assets/images/final/squirrel_middle.png')
    this.load.image('squirrel2', 'assets/images/final/fat_Squirrel.png')
    this.load.image('background', 'assets/images/final/BG.jpg')
    this.load.image('fartBar', 'assets/images/final/fart_icon_meter.png')
    this.load.image('fartBarBg', 'assets/images/final/fart_icon_bg.png')
    this.load.image('fartBarFill', 'assets/images/final/fart_icon_bar full.png')
    this.load.image('fart', 'assets/images/fart.png')
    this.load.image('button', 'assets/images/button.png')
    this.load.image('popUpBackground', 'assets/images/pop-up-background.png')
    this.load.image('burger', 'assets/images/burger.png')
      this.load.image('evil-burger', 'assets/images/evil-burger.png')
  }

  create () {
    this.state.start('Game')
  }
}
