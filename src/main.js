/*
Matthew Meacham
Rocket Patrol Mods
4-13-2022
The project took about 5 hours total to complete
---------------------
Points break down:
(30) - I implemented a simultaneous two-player mode which can be chosen
at the beginning of the game
(20) - Using Phaser's particle emitter I made the ships explode when hit
(20) - I put in code to add time to the timer when ships got hit
(20) - I made a new golden spaceship that movers fast and offers extra points
(10) - Remaining time is displayed on the screen
-----------
(100) Points total
*/

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
