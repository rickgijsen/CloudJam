/* globals __DEV__ */
import Phaser from 'phaser'

import Character from '../sprites/Character'
import MovingItemList from '../sprites/MovingItemList'
import FartMeter from '../sprites/FartMeter'
import EndScreen from '../sprites/EndScreen'
import UI from '../sprites/UI'
import Burger from '../Food/Burger'
import Burrito from '../Food/Burrito'
import Lettuce from '../Food/Lettuce'
import Celery from '../Food/Celery'

//
// GameState - does nothing
//

// Every State has its own logic
// This class controls the logic

// Once this state starts, start state feed on Input
// when feed timer is done, start state play
// Once player dies, start state end
// Ad === profit?

export default class extends Phaser.State {
  init () { }
  preload () {
    this.game.openEndScreen = new Phaser.Signal()
    this.game.toggleUI = new Phaser.Signal()
  }

  create () {
    // banner.padding.set(10, 16)
    // banner.anchor.setTo(0.5)

    // this.mushroom = new Mushroom({
    //   game: this.game,
    //   x: this.world.centerX,
    //   y: this.world.centerY,
    //   asset: 'mushroom'
    // });

    // this.game.add.existing(this.mushroom)

    this.physics.startSystem(Phaser.Physics.ARCADE)

    this.movingItemList = new MovingItemList(0, 0)
    this.game.add.existing(this.movingItemList)

    this.ui = new UI(0, 0, this.movingItemList)
    this.game.add.existing(this.ui)

    this.character = new Character(0, 0, this.movingItemList, this.ui.fartBar)
    this.game.add.existing(this.character)

    this.endScreen = new EndScreen(0, 0)
    this.add.existing(this.endScreen)
  }

  update () {
    // check collision between squirrel and items
    let char = this.character
    let fartbar = this.ui.fartBar
    this.movingItemList.forEach(function (item) {
      if (game.physics.arcade.overlap(char, item)) {
        item.destroy()
        fartbar.addFarts(item.fartModifier)
      }
    })
  }

  render () {
    if (__DEV__) {
    }
  }
}
