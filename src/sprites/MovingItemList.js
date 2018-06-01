import Phaser from 'phaser'
import Sprite from "../services/Sprite";

export default class extends Phaser.Group {
    constructor (x, y, velocityX, velocityY) {
        super(game)

        this.x = x;
        this.y = y;

        this.velocityX = 0;
        this.velocityY = 2;

        this.second = 60;
        this.standerdTime = this.second * 3;
        this.timer = 0;

        this.isRecycled = false;
    }

    update () {
        let xModifier = this.velocityX;
        let yModifier = this.velocityY;
        this.forEach(function(item) {
            item.position.y += yModifier;
            item.position.x += xModifier;

            if(item.position.y > screen.height) {
                item.destroy();
            }
        });


        if(this.timer <= 0) {
            this.spawnItems();
            this.timer = this.standerdTime;
        }

        this.timer -= 1;
    }

    changeX(newX) {
        this.velocityX = newX;
    }

    changeY(newY) {
        this.velocityY = newY;
    }


    spawnItems() {
        for (var i = 0; i < 4; i++) {

            let position = Math.floor(Math.random() * (screen.width + 1));
            this.isRecycled = false;
            this.forEach(function(item) {
                if(item.position.y > screen.height) {
                    this.isRecycled = true;
                    this.recycleItem = item;
                }
            });
            if (this.isRecycled == true) {
                this.recycleItem.position = position;
            } else {
                this.items = new Sprite({
                    asset: 'mushroom',
                    x: position,
                    y: 0,
                    anchorX: 0.5,
                    anchorY: 0.5
                });
                this.add(this.items);
            }
        }
    }

}