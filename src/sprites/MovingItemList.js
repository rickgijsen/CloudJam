import Phaser from 'phaser'
import Sprite from '../services/Sprite'

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
      var test = false;
    this.forEach(function (item) {
      item.position.y += yModifier;
      item.position.x += xModifier;

      // destroy the item if it leaves the screen
      if (item.position.y > screen.height && item.key != "background") {
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

    this.items = new Sprite({
        asset: 'mushroom',
        x: position,
        y: 0,
        anchorX: 0.5,
        anchorY: 0.5
    });

    this.game.physics.arcade.enable(this.items);

    this.add(this.items)
  }
}
