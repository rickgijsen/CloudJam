import Phaser from 'phaser'
import Sprite from '../services/sprite'
import Overlay from "../services/Overlay";

//@author: Aaron Ligthart
export default class extends Phaser.Group {
    constructor(x, y) {
        super(game)

        this.game = game
        this.buildImage()


    }

    buildImage() {
        this.sprite = new Sprite({
            x: this.game.world.centerX,
            y: this.game.world.centerY,
            asset: 'background_feed',
            anchorX: 0.5,
            anchorY: 0.5,
        })
        this.sprite.width = this.game.world.width
        this.sprite.height = this.game.world.height
        this.add(this.sprite)


    }


    update() {


    }


}
