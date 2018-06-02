import Phaser from 'phaser'
import Sprite from '../services/Sprite'
import Burger from "../Food/Burger";
import Lettuce from "../Food/Lettuce";
import Celery from "../Food/Celery";
import Burrito from "../Food/Burrito";

export default class extends Phaser.Group {
  constructor (x, y, velocityX, velocityY) {
    super(game)

    this.x = x;
    this.y = y;

    this.velocityX = 0;
    this.velocityY = 2;
    this.combinedVelocity = 0;
    this.spawnDistance = 1000;

    // spawn the background
    this.background = new Sprite({
      asset: 'background',
      x: 0,
      y: this.game.world.height,
      anchorX: 0,
      anchorY: 1
    });
    this.add(this.background);

      this.background2 = new Sprite({
          asset: 'background',
          x: 0,
          y: this.game.world.height - this.background.height,
          anchorX: 0,
          anchorY: 1
      });
      this.add(this.background2);
  }

  update () {

    // update the distance traveled
    this.combinedVelocity += this.velocityY;
    let xModifier = this.velocityX;
    let yModifier = this.velocityY;

    // update the items
    let worldHeight = this.game.world.height;
    let backgroundHeight = this.background.height;

    this.forEach(function (item) {
      item.position.y += yModifier;
      item.position.x += xModifier;

      // destroy the item if it leaves the screen
      if (item.position.y > screen.height && item.key != "background") {
        // destroy the item out of bounds
        item.destroy()
      } else if (item.position.y  > worldHeight + backgroundHeight) {
          let temp = item.position.y  - (worldHeight + backgroundHeight);
          item.position.y = worldHeight - backgroundHeight + temp;
      }
    });

    if(this.combinedVelocity > this.spawnDistance) {
      this.spawnItems();
      this.combinedVelocity = 0;
      this.randomDistance = Math.floor(Math.random() * 500) + 500;
      this.spawnDistance = this.randomDistance;
    }
  }

  changeX (newX) {
    this.velocityX = newX
  }

  changeY (newY) {
    this.velocityY = newY
  }

  spawnItems () {
    var position = Math.floor(Math.random() * (screen.width + 1));
      var chooseFood = Math.floor(Math.random() * (2));
      switch (chooseFood) {
          case 0:
            this.spawnGoodFood(position);
            break;
          case 1:
              this.spawnBadFood(position);
              break;
      }
      this.add(this.items)
  }


  spawnGoodFood(position) {
      console.log("good");
      var chooseFood = Math.floor(Math.random() * (2));
      switch (chooseFood) {
          case 0:
              this.items = new Burger({
                  x: position,
                  y: 0
              });
              break;
          case 1:
              this.items = new Burrito({
                  x: position,
                  y: 0
              });
              break;
      }
  }

  spawnBadFood (position) {
      console.log("bad");
      var chooseFood = Math.floor(Math.random() * (2));
      switch (chooseFood) {
          case 0:
              console.log("Lettuce");
              this.items = new Lettuce({
                  x: position,
                  y: 0
              });
              break;
          case 1:
              console.log("Celery");
              this.items = new Celery({
                  x: position,
                  y: 0
              });
              break;
      }
  }
}
