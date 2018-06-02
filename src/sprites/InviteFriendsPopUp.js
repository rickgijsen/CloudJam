import Phaser from 'phaser'
import Sprite from '../services/Sprite'
import Text from '../services/Text'

export default class InviteFriendsPopUp extends Phaser.Group {
  constructor (x, y) {
    super(game)
    this.visible = false

    this.x = x
    this.y = y

    this.buildInviteFriendsBackground()
    this.buildInviteFriendsButton()
    this.buildInviteFriendsButtonText()
    this.buildCloseButton()
    this.buildCloseButtonText()
    this.game.openInviteFriendsPopUp.add(() => {
      this.game.world.bringToTop(this)
      this.switchVisibility()
      console.log('POP-UP OPEN')
    })
  }

  buildInviteFriendsBackground () {
    this.background = new Sprite({
      asset: 'popUpBackground',
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      anchorX: 0.5,
      anchorY: 0.5
    })

    this.background.scale.setTo(0.6, 0.6)
    this.add(this.background)
  }

  buildInviteFriendsButton () {
    this.inviteFriendsButton = new Sprite({
      asset: 'button',
      x: this.game.world.centerX,
      y: 400,
      anchorX: 0.5,
      anchorY: 0.5,
      inputEnabled: true
    })
    this.inviteFriendsButton.scale.setTo(0.4, 0.4)
    this.add(this.inviteFriendsButton)

    this.inviteFriendsButton.events.onInputDown.add(() => {
      this.game.state.start('feed')
    }, this)
  }

  buildInviteFriendsButtonText () {
    this.inviteFriendsButtonText = new Text({
      text: 'Invite',
      anchorX: 0.5,
      anchorY: 0.5,
      center: true,
      fontSize: 36,
      color: '#2a2a2a'
    })

    this.inviteFriendsButton.addChild(this.inviteFriendsButtonText)

    this.title = new Text({
      text: 'Invite your friends!',
      x: this.game.world.centerX,
      y: 220,
      anchorX: 0.5,
      anchorY: 0.5,
      center: true,
      fontSize: 25,
      color: '#2a2a2a'
    })

    this.add(this.title)
  }

  buildCloseButton () {
    this.closeButton = new Sprite({
      asset: 'button',
      x: this.game.world.centerX,
      y: 450,
      anchorX: 0.5,
      anchorY: 0.5,
      inputEnabled: true
    })
    this.closeButton.scale.setTo(0.4, 0.4)
    this.add(this.closeButton)

    this.closeButton.events.onInputDown.add(() => {
      this.visible = false
    })
  }

  buildCloseButtonText () {
    this.closeButtonText = new Text({
      text: 'Close',
      anchorX: 0.5,
      anchorY: 0.5,
      center: true,
      fontSize: 36,
      color: '#2a2a2a'
    })

    this.closeButton.addChild(this.closeButtonText)
  }

  switchVisibility () {
    if (this.visible) {
      this.visible = false
    } else {
      this.visible = true
    }
  }
}
