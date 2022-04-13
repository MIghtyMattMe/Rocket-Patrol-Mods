// Rocket2 prefab
class Rocket2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      // add object to existing scene
      scene.add.existing(this);
      this.isFiring = false;
      this.moveSpeed = 1;
      this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        //left-right movement
        if(!this.isFiring){
            if(keyA.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if(keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        // shooting button
        if(Phaser.Input.Keyboard.JustDown(keyW) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }

        //move missile/rocket when fired
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y += this.moveSpeed;
        }

        //reset missile/rocket
        if (this.y >= game.config.height - borderUISize - borderPadding) {
            this.isFiring = false;
            this.y = borderUISize*4;
        }
    }

    reset() {
        this.isFiring = false;
        this.y = borderUISize*4;
    }
}