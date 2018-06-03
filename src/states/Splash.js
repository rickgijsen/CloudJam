import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import SoundManager from '../services/SoundManager'

export default class extends Phaser.State {
  init () {
    this.game.soundManager = new SoundManager(this.game)
  }

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/mushroom2.png')
    this.load.image('char_nu', 'assets/images/normal_unsqueezed.png')
    this.load.image('char_ns', 'assets/images/normal_squeezed.png')
    this.load.image('char_mu', 'assets/images/medium_unsqueezed.png')
      this.load.image('char_ms', 'assets/images/medium_squeezed.png')
      this.load.image('char_fu', 'assets/images/fat_unsqueezed.png')
      this.load.image('char_fs', 'assets/images/fat_squeezed.png')
    this.load.image('tapStart', 'assets/images/tapStart.png')
    this.load.image('squirrel', 'assets/images/squirrel.png')
    this.load.image('fart', 'assets/images/fart.png')
    this.load.image('hand_open', 'assets/images/hand_open.png')
    this.load.image('hand_closed', 'assets/images/hand_closed.png')
      this.load.image('hand_fingers', 'assets/images/hand_closedFingers.png')

    //
    // load sounds
    //
    this.sfxList = []
    this.sfxList.push({ name: 'fart01', dir: 'assets/sounds/fart01.wav', loop: false })
    this.sfxList.push({ name: 'fart02', dir: 'assets/sounds/fart02.wav', loop: false })
    this.sfxList.push({ name: 'fart03', dir: 'assets/sounds/fart03.wav', loop: false })
    this.sfxList.push({ name: 'fart04', dir: 'assets/sounds/fart04.mp3', loop: false })
    this.sfxList.push({ name: 'fart05', dir: 'assets/sounds/fart05.mp3', loop: false })

    this.loadSounds(this.sfxList)

    this.load.image('squirrel0', 'assets/images/final/thin_squirrel.png')
    this.load.image('squirrel1', 'assets/images/final/squirrel_middle.png')
    this.load.image('squirrel2', 'assets/images/final/fat_Squirrel.png')
    this.load.image('background', 'assets/images/final/BG.jpg')
    this.load.image('fartBar', 'assets/images/final/fart_icon_meter.png')
    this.load.image('fartBarBg', 'assets/images/final/fart_icon_bg.png')
    this.load.image('fartBarFill', 'assets/images/final/fart_icon_bar_full.png')
    this.load.image('fart', 'assets/images/fart.png')
    this.load.image('button', 'assets/images/button.png')
    this.load.image('popUpBackground', 'assets/images/pop-up-background.png')
    this.load.image('burger', 'assets/images/burger.png')
    this.load.image('evil-burger', 'assets/images/evil-burger.png')

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
    this.load.image('celery', 'assets/images/final/celery.png')
    this.load.image('apple', 'assets/images/final/apple.png')
    this.load.image('carrot', 'assets/images/final/carrot.png')
    this.load.image('lettuce', 'assets/images/final/lettuce.png')
    this.load.image('smoothie', 'assets/images/final/healthy_smoothie.png')
    this.load.image('soda', 'assets/images/final/soda.png')
  }

  create () {
    this.state.start('Feed')
  }

  loadSounds (array) {
    for (let i = 0; i < array.length; i += 1) {
      this.load.audio(array[i].name, array[i].dir)
      this.game.soundManager.addSound(array[i].name, array[i].loop, array[i].multi === null ? false : array[i].multi)
    }
  }
}
