class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
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
        //this.add.text(game.config.width/2, game.config.height/2, 'Use <- -> arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#B0FF00';
        menuConfig.color = '#800';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, ' Press <- for 1 Player \nor -> for 2 Players  ', menuConfig).setOrigin(0.5);
        
        //define some keys 
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //one player
            twoPlayer = false;
            this.sound.play('sfx_select');
            this.scene.start('DifScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //two player
            twoPlayer = true;
            this.sound.play('sfx_select');
            this.scene.start('DifScene');   
        }    
    }
}