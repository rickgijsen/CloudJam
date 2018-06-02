import Phaser from 'phaser'
import Sprite from '../services/Sprite'
import Text from '../services/Text'

export default class InviteFriendsPopUp extends Phaser.Group {
  constructor (x, y) {
    super(game)
    this.visible = false

    this.x = x
    this.y = y

    this.buildMuteButton()
    this.buildMuteButtonText()
    this.game.muteButton.add(() => {
      this.game.world.bringToTop(this)
      this.visible = true
      console.log('MUTE READY')
    })
  }

  buildMuteButton () {
    this.button = new Sprite({
      asset: 'button',
      x: this.game.world.width,
      y: this.game.world.height,
      anchorX: 1,
      anchorY: 1,
      inputEnabled: true
    })
    this.button.scale.setTo(0.3, 0.3)
    this.add(this.button)

    this.button.events.onInputDown.add(() => {
      this.muteAndUnmute()
      console.log('MUTED')
    })
  }

  buildMuteButtonText () {
    this.buttonText = new Text({
      text: 'Mute',
      anchorX: 2.1,
      anchorY: 1.3,
      center: true,
      fontSize: 55,
      color: '#2a2a2a'
    })

    this.button.addChild(this.buttonText)
  }

  muteAndUnmute () {

    if (!this.game.sound.mute) {
      this.game.sound.mute = true
    } else {
      this.game.sound.mute = false
    }
  }
}
