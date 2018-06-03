import Phaser from 'phaser'
import Sprite from '../services/Sprite'
import Text from '../services/Text'
import Overlay from '../services/Overlay'

export default class InviteFriendsPopUp extends Phaser.Group {
  constructor (x, y) {
    super(game)
    this.visible = false

    this.x = x
    this.y = y

    this.overlay = new Overlay({
      x: -1000,
      y: -1000,
      alpha: 0.7,
    })
    this.overlay.scale.setTo(4, 4)
    this.add(this.overlay)
    this.buildInviteFriendsBackground()
    this.buildInviteFriendsButton()
    this.buildInviteFriendsButtonText()
    this.buildCloseButton()
    this.game.openInviteFriendsPopUp.add(() => {
      this.game.world.bringToTop(this)
      this.switchVisibility()
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

    this.background.scale.setTo(0.7, 0.7)
    this.add(this.background)
  }

  buildInviteFriendsButton () {
    this.inviteFriendsButton = new Sprite({
      asset: 'button',
      x: this.game.world.centerX,
      y: this.game.world.centerY + 270,
      anchorX: 0.5,
      anchorY: 0.5,
      inputEnabled: true
    })
    this.inviteFriendsButton.scale.setTo(0.7, 0.7)
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
      fontSize: 30,
      color: '#000000',
      stroke: '#FFFFFF',
      strokeThickness: 3
    })

    this.inviteFriendsButton.addChild(this.inviteFriendsButtonText)

    this.title = new Text({
      text: 'Invite your\nfriends!',
      x: this.game.world.centerX,
      y: this.game.world.centerY - 240,
      anchorX: 0.5,
      anchorY: 0.5,
      center: true,
      fontSize: 20,
      color: '#000000',
      stroke: '#FFFFFF',
      strokeThickness: 3
    })

    this.add(this.title)
  }

  buildCloseButton () {
    this.closeButton = new Sprite({
      asset: 'buttonClose',
      x: this.game.width - 50,
      // y: this.game.world.centerY - 165,
      y: 50,
      anchorX: 0.5,
      anchorY: 0.5,
      inputEnabled: true
    })
    this.closeButton.scale.setTo(0.5, 0.5)
    this.add(this.closeButton)

    this.closeButton.events.onInputDown.add(() => {
      this.visible = false
    })
  }

  switchVisibility () {
    if (this.visible) {
      this.visible = false
    } else {
      this.visible = true

      this.fadeInTween = this.game.add.tween(this.overlay)
        .from({ alpha: 0 }, 200, Phaser.Easing.Default, false, 500);
      this.fadeInTween.start();
      this.moveInTween = this.game.add.tween(this)
        .from({ y: -800 }, 800, Phaser.Easing.Elastic.Out, false, 500);
      this.moveInTween.start();
    }
  }
}
