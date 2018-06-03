import Phaser from 'phaser'
import Sprite from '../services/Sprite'
import Text from '../services/Text'

export default class MuteButton extends Phaser.Group {
  constructor (x, y) {
    super(game)

    this.x = x
    this.y = y

    this.buildMuteButton()
    this.buildMuteButtonText()
  }


  buildMuteButton () {
    this.button = new Sprite({
      asset: 'buttonSmall',
      x: this.game.world.width - 40,
      y: 40,
      anchorX: .5,
      anchorY: .5,
      inputEnabled: true
    })
    this.button.scale.setTo(0.4, 0.4)
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

    if (!this.game.sound.mute) {
      this.game.sound.mute = true
      this.icon.loadTexture('mute')
    } else {
      this.game.sound.mute = false
      this.icon.loadTexture('unmute')
    }
  }
}
