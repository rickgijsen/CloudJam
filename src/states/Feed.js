/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Hand from '../sprites/Hand'
import Finger from '../sprites/Finger'
import fartMeter from '../sprites/FartMeter'
import StartText from '../sprites/StartText'

import Sprite from '../services/Sprite'
import Character from "../sprites/Character";
import FartMeter from "../sprites/FartMeter";
import MovingItemList from "../sprites/MovingItemList";
import BackgroundFeed from "../sprites/BackgroundFeed";
import UIFeed from "../sprites/UIFeed";
import InviteFriendsPopUp from "../sprites/InviteFriendsPopUp";

export default class extends Phaser.State {
  init () { }
  preload () {
    this.game.toggleUIFeed = new Phaser.Signal();
    this.game.openInviteFriendsPopUp = new Phaser.Signal();
  }

  create() {
    this.countDownTimeMs = 5 * 1000;
    this.timer = this.game.time.create(false);

    this.background = new BackgroundFeed()
    this.game.add.existing(this.background)
    this.ui = new UIFeed(0, 0)
    this.add.existing(this.ui)
    this.friendInvitePopUp = new InviteFriendsPopUp(0, 0)
    this.add.existing(this.friendInvitePopUp)


    // Add the feed sprites here

      this.finger = new Finger(0, 0)
      this.player = new Player({
          x: 0,
          y: 0
          });
        this.game.add.existing(this.finger)
      this.game.add.existing(this.player);
      this.hand = new Hand(0, 0, this.player)
      this.game.add.existing(this.hand);
    // Create the feedme countdown timer
    this.timer.add(this.countDownTimeMs, this.onTimerComplete, this)
    console.log('Starting FeedMe stage: countdown = ' + this.countDownTimeMs)
    this.timer.start()

    this.game.openInviteFriendsPopUp.dispatch()
  }

  // FeedMe timer has completed
  onTimerComplete() {
    console.log("FeedMe stage has finished");
    this.game.toggleUIFeed.dispatch()
        this.finger.rePosition()
      this.hand.rePosition()
      if(this.hand.moved){
        this.hand.squish()
          if (this.player.weight === 0) {
              this.sprite.loadTexture('char_idle')
          }
          if (this.player.weight > 330 && this.player.weight < 650) {
              this.sprite.loadTexture('char_eat_01')
          }
          if (this.player.weight >= 660 && this.player.weight < 1000) {
              this.sprite.loadTexture('char_eat_02')
          }

      }
   // this.game.state.start("Game");
  }

  update () {
  }

  render () { }
}
