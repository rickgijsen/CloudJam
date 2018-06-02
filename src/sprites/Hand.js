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
        this.moved = false;

    }

    buildImage() {
        this.sprite = new Sprite({

            asset: 'hand_open',
            anchorX: 0.5,
            anchorY: 0.5,
        })
        this.add(this.sprite)
        console.log(this.sprite)
        this.position.x = this.game.world.centerX
        this.position.y = this.game.world.height+300

    }



    update() {
        if(this.open== false){
            this.sprite.loadTexture('hand_closed')
        } else{this.sprite.loadTexture('hand_open')}
    }

    squish() {
        this.open = false;
        this.sprite.scale.x = 1
        this.sprite.scale.y = 1
        game.soundManager.playSound(this.getRandomFart(Math.floor(Math.random() * 5)))
        this.sprite.moveInTween = this.game.add.tween(this.sprite.scale)
            .from({x: .5, y: 1.2}, 500, Phaser.Easing.Circular.Out, false)


        this.sprite.moveInTween.start();
    }

    rePosition() {
        //this.position.x = this.game.world.centerX
        //this.position.y = this.game.world.centerY

       // game.soundManager.playSound(this.getRandomFart(Math.floor(Math.random() * 5)))
        this.sprite.moveInTween = this.game.add.tween(this.position)
            .to({x: this.game.world.centerX+20, y: this.game.world.height-100}, 2000, Phaser.Easing.Elastic.Out, false)



        this.sprite.moveInTween.start();

        this.sprite.moveInTween.onComplete.add(() => {this.squish()}, this)


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
