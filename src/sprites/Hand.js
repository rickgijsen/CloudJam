import Phaser from 'phaser'
import Sprite from '../services/sprite'
import Overlay from "../services/Overlay";

//@author: Aaron Ligthart
export default class extends Phaser.Group {
    constructor(x, y) {
        super(game)

        this.game = game
        this.buildImage()

        // this.x = x  - this.sprite.texture.width/2
        // this.y = y - this.sprite.texture.height/2
        this.open = true;

    }

    buildImage() {
        this.sprite = new Sprite({
            x: this.game.world.centerX,
            y: this.game.height - 50,
            asset: 'hand_open',
            anchorX: 1,
            anchorY: 0,
        })
        this.add(this.sprite)
        console.log(this.sprite)

    }



    update() {
        if(this.open== false){
            this.sprite.loadTexture('hand_closed')
        } else{this.sprite.loadTexture('hand_open')}
    }

    squish() {
        console.log(this.sprite.scale)
        this.sprite.scale.x = 1
        this.sprite.scale.y = 1
        game.soundManager.playSound(this.getRandomFart(Math.floor(Math.random() * 5)))
        this.sprite.moveInTween = this.game.add.tween(this.sprite.scale)
            .from({x: .5, y: 1.2}, 500, Phaser.Easing.Circular.Out, false)


        this.sprite.moveInTween.start();
    }

    getRandomFart(fartNumber) {

        switch (fartNumber) {
            case 0:
                console.log("fart1")
                this.fartNumber = 0

                return "fart01"
                break;
            case 1:
                console.log("fart2")
                this.fartNumber = 0
                return "fart02"
                break;
            case 2:
                console.log("fart3")
                this.fartNumber = 0
                return "fart03"
                break;
            case 3:
                console.log("fart4")
                this.fartNumber = 0
                return "fart04"
                break;
            case 4:
                console.log("fart5")
                this.fartNumber = 0
                return "fart05"
                break;

        }

    }
}
