class Difficulty extends Phaser.Scene {
    constructor() {
        super("DifScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create() {
        //Menu configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //actually showing the menu
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        if (!twoPlayer) {
            this.add.text(game.config.width/2, game.config.height/2, 'Use <- -> arrows to move & ^ to fire', menuConfig).setOrigin(0.5);
        } else {
            this.add.text(game.config.width/2, game.config.height/2 + borderPadding, 'P1 use <- -> arrows \nto move & ^ to fire', menuConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2, 'P2 use (A) (D) keys \nto move & (W) to fire', menuConfig).setOrigin(0.5);
        }
        menuConfig.backgroundColor = '#B0FF00';
        menuConfig.color = '#800';
        this.add.text(game.config.width/2, game.config.height/2 + (borderUISize * 3) + (borderPadding * 4), 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        
        //define some keys 
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
              spaceshipSpeed: 3,
              gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
              spaceshipSpeed: 4,
              gameTimer: 45000    
        }
        this.sound.play('sfx_select');
        this.scene.start('playScene');    
        }
    }
}