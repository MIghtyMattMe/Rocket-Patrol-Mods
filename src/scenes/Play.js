class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('goldShip', './assets/goldShip.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        //particle
        this.load.image('shipParticle', './assets/shipParticle.png');
    }

    create() {
        // place starfield
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        
        // define keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // add rockets (p1 & 2)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        if (twoPlayer) {
            this.p2Rocket = new Rocket2(this, game.config.width/2, borderUISize*4, 'rocket').setOrigin(0.5, 0);
            this.p2Rocket.flipY = true;
        }
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*6, 'spaceship', 0, 10).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*7.5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*9 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        this.goldShip = new Spaceship(this, game.config.width + borderUISize*4.5, borderUISize*7, 'goldShip', 0, 100).setOrigin(0,0);
        this.goldShip.moveSpeed += 1;
        
        // animation?!?!
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        
        //score
        this.p1Score = 0;
        this.p2Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        if (twoPlayer) {
            this.scoreRight = this.add.text(borderUISize*5 + borderPadding*5, borderUISize + borderPadding*2, this.p2Score, scoreConfig);
        }

        //GameOver Indicator
        this.gameOver = false;
        // make clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press <- to Restart or -> for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        //display timer
        this.TimeDisplay = this.add.text(game.config.width - borderUISize*3 - borderPadding*3, borderUISize + borderPadding*2, Math.round(this.clock.getRemainingSeconds()), scoreConfig);
    }

    update() {
        this.TimeDisplay.text = Math.round(this.clock.getRemainingSeconds());
        this.starfield.tilePositionX -= 2;
        if (!this.gameOver) {
            this.p1Rocket.update();
            if (twoPlayer) {this.p2Rocket.update();}
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.goldShip.update();
        }
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.p1Score += this.ship03.points;
            this.scoreLeft.text = this.p1Score;
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.p1Score += this.ship02.points;
            this.scoreLeft.text = this.p1Score;
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.p1Score += this.ship01.points + 20;
            this.scoreLeft.text = this.p1Score;
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.goldShip)) {
            this.p1Rocket.reset();
            this.p1Score += this.goldShip.points;
            this.scoreLeft.text = this.p1Score;
            this.shipExplode(this.goldShip);
        }
        if (twoPlayer) {
            if(this.checkCollision(this.p2Rocket, this.ship03)) {
                this.p2Rocket.reset();
                this.p2Score += this.ship03.points + 20;
                this.scoreRight.text = this.p2Score;
                this.shipExplode(this.ship03);
            }
            if (this.checkCollision(this.p2Rocket, this.ship02)) {
                this.p2Rocket.reset();
                this.p2Score += this.ship02.points;
                this.scoreRight.text = this.p2Score;
                this.shipExplode(this.ship02);
            }
            if (this.checkCollision(this.p2Rocket, this.ship01)) {
                this.p2Rocket.reset();
                this.p2Score += this.ship01.points;
                this.scoreRight.text = this.p2Score;
                this.shipExplode(this.ship01);
            }
            if(this.checkCollision(this.p2Rocket, this.goldShip)) {
                this.p2Rocket.reset();
                this.p2Score += this.goldShip.points + 20;
                this.scoreRight.text = this.p2Score;
                this.shipExplode(this.goldShip);
            }
        }

        //reset game
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start("menuScene");
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        //add to timer
        this.clock.delay += 3000;
        // create explosion particles emittors
        this.particles = this.add.particles('shipParticle');
        this.emitter = this.particles.createEmitter();
        this.emitter.setPosition(ship.x + ship.width/2, ship.y + ship.height/2);
        this.emitter.setSpeed(50);
        this.emitter.maxParticles = 30;
        //play explosion sound
        this.sound.play('sfx_explosion');
        //remove particles
        this.particleClock = this.time.delayedCall(500, () => {
            this.particles.destroy();
            ship.reset();
            ship.alpha = 1;
        }, null, this);
      }
}