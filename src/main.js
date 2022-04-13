let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Difficulty, Play]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let twoPlayer = false;
// reserve keyboard vars
let keyA, keyW, keyD, keyLEFT, keyUP, keyRIGHT;
