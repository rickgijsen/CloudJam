import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import SoundManager from '../services/SoundManager'

export default class extends Phaser.State {
  init () {
      this.game.soundManager = new SoundManager(this.game);
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
      this.load.image('char_idle','assets/images/char_idle.png')
      this.load.image('char_eat_01','assets/images/char_eat_01.png')
      this.load.image('char_eat_02','assets/images/char_eat_02.png')
      this.load.image('tapStart','assets/images/tapStart.png')
    this.load.image('squirrel', 'assets/images/squirrel.png')
    this.load.image('background', 'assets/images/final/BG.jpg')
    this.load.image('fartBar', 'assets/images/empty-bar.png')
    this.load.image('fart', 'assets/images/fart.png')
    this.load.image('button', 'assets/images/button.png')
    this.load.image('popUpBackground', 'assets/images/pop-up-background.png')
    this.load.image('burger', 'assets/images/burger.png')
      this.load.image('evil-burger', 'assets/images/evil-burger.png')
      this.load.image('hand_open', 'assets/images/hand_open.png')
      this.load.image('hand_closed', 'assets/images/hand_closed.png')

      //
      // load sounds
      //
      this.sfxList = [];
      this.sfxList.push({ name: 'fart01', dir: 'assets/sounds/fart01.wav', loop: false });
      this.sfxList.push({ name: 'fart02', dir: 'assets/sounds/fart02.wav', loop: false });
      this.sfxList.push({ name: 'fart03', dir: 'assets/sounds/fart03.wav', loop: false });
      this.sfxList.push({ name: 'fart04', dir: 'assets/sounds/fart04.mp3', loop: false });
      this.sfxList.push({ name: 'fart05', dir: 'assets/sounds/fart05.mp3', loop: false });

      this.loadSounds(this.sfxList);
  }

  create () {
    this.state.start('Feed')
  }

    loadSounds(array) {
        for (let i = 0; i < array.length; i += 1) {
            this.load.audio(array[i].name, array[i].dir);
            this.game.soundManager.addSound(array[i].name, array[i].loop, array[i].multi === null ? false : array[i].multi);
        }
    }
}
