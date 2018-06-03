import Phaser from 'phaser'
import Sprite from '../services/Sprite'
import Text from '../services/Text'

export default class MuteButton extends Phaser.Group {
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
    })
  }

  buildMuteButton () {
    this.button = new Sprite({
      asset: 'buttonSmall',
      x: this.game.world.width - 50,
      y: 50,
      anchorX: .5,
      anchorY: .5,
      inputEnabled: true
    })
    this.button.scale.setTo(0.5, 0.5)
    this.add(this.button)

    this.button.events.onInputDown.add(() => {
      this.muteAndUnmute()
    })
  }

  buildMuteButtonText () {
    this.icon = new Sprite({
      asset: 'unmute',
      x: 0,
      y: 0,
      anchorX: .5,
      anchorY: .5,
      inputEnabled: true
    })
    this.icon.scale.setTo(.15, .15)
    this.button.addChild(this.icon)
    this.icon.events.onInputDown.add(() => {
      this.muteAndUnmute()
    })
  }

  muteAndUnmute () {
    console.log('click')

    if (!this.game.sound.mute) {
      this.game.sound.mute = true
      console.log('muted')
      this.icon.loadTexture('mute')
    } else {
      this.game.sound.mute = false
      console.log('unmuted')
      this.icon.loadTexture('unmute')
    }
  }
}
