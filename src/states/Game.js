/* globals __DEV__ */
import Phaser from 'phaser'
<<<<<<< HEAD
import Player from '../sprites/Player'
import StartText from '../sprites/StartText'
=======
import Character from '../sprites/Character'
import MovingItemList from '../sprites/MovingItemList'
import FartMeter from "../sprites/FartMeter";

//
// GameState - does nothing
//

// Every State has its own logic
// This class controls the logic

// Once this state starts, start state feed on Input
// when feed timer is done, start state play
// Once player dies, start state end
// Ad === profit?
>>>>>>> origin/feature/fart-meter

export default class extends Phaser.State {
  init() { }
  preload() { }


  create() {
<<<<<<< HEAD
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




=======
    // const bannerText = 'Phaser + ES6 + Webpack'
    // let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
    //   font: '40px Bangers',
    //   fill: '#77BFA3',
    //   smoothed: false
    // })

    // banner.padding.set(10, 16)
    // banner.anchor.setTo(0.5)

    // this.mushroom = new Mushroom({
    //   game: this.game,
    //   x: this.world.centerX,
    //   y: this.world.centerY,
    //   asset: 'mushroom'
    // });

    // this.game.add.existing(this.mushroom)

    this.movingItemList = new MovingItemList(0,0);
    this.game.add.existing(this.movingItemList);

    this.fartBar = new FartMeter(0, 0);
    this.game.add.existing(this.fartBar);

    this.character = new Character(0, 0, this.movingItemList, this.fartBar);
    this.game.add.existing(this.character);
>>>>>>> origin/feature/fart-meter
  }

  render() {
    if (__DEV__) {
<<<<<<< HEAD
     // this.game.debug.spriteInfo(this.mushroom, 32, 32)
=======
        game.debug.text('enemies: ' + this.movingItemList.length, 16, 48);
>>>>>>> origin/feature/fart-meter
    }
  }
}
