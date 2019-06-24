"use strict"

var play = function () {};

play.prototype = {
    //Properties
    currLevel: 0,

    //Time until the level is beaten
    timer: 0,

    //Array of all the timers
    times: [],

    //Timer text
    txt: "",

    //Initializing the game
    init: function () {
        //Starting arcade physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;
        
        //Particle Emitter
        this.emitter = game.add.emitter(0,0,100);
        this.emitter.makeParticles('coin');
        this.emitter.minParticleScale = .3;
        this.emitter.maxParticleScale = .4;
        this.emitter.gravity = 10;
        
        //Creating the object groups
        this.walls = game.add.group();
        this.hazards = game.add.group();
        this.coins = game.add.group();

        //Setting up controls
        this.cursor = game.input.keyboard.createCursorKeys();
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.restartKey = game.input.keyboard.addKey(Phaser.Keyboard.R);

        //setting coins
        this.coinsCollected = 0;

        //Creating the levels
        this.levels = [
            {
                numCoins: 1,
                startPosX: 100,
                startPosY: 1900,
                levelData: [
                'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x         hhh      c                   x',
                'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                ]
            },

            {
                numCoins: 2,
                startPosX: 100,
                startPosY: 1900,
                levelData: [
                'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x       xxx                            x',
                'x                                      x',
                'x                                      x',
                'x c                                    x',
                'xxxxx                                  x',
                'x             c                        x',
                'x             x                        x',
                'x     x                                x',
                'x                                      x',
                'x         hhhhhhhhh                    x',
                'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                ]
            },

            {
                numCoins: 4,
                startPosX: 100,
                startPosY: 1900,
                levelData: [
                'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                    c x',
                'x                                   xxxx',
                'x                                      x',
                'x                                      x',
                'x             h                        x',
                'x             h                  x     x',
                'x             h                        x',
                'x       xxx                            x',
                'x                                      x',
                'x                                   x  x',
                'x c               xxxx                 x',
                'xxxxx                                  x',
                'x             c                        x',
                'x             x                  x     x',
                'x     x                                x',
                'x                                      x',
                'x         hhhhhhhhhhhhhh   c   hhhhhhhhx',
                'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                ]
            },

            {
                numCoins: 5,
                startPosX: 100,
                startPosY: 1900,
                levelData: [
                'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                'x                                      x',
                'x                                      x',
                'x                 x                    x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                     x                x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                         x            x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                             x        x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                 x    x',
                'x                                      x',
                'xhhhhhhh   hhhhhhhhhhhhhhhhhhhh        x',
                'x        c                           c x',
                'x       xxx                         xxxx',
                'x                                      x',
                'x                                      x',
                'x             h                        x',
                'x             h                  x     x',
                'x             h                        x',
                'x       xxx                            x',
                'x                                      x',
                'x                                   x  x',
                'x c               xxxx                 x',
                'xxxxx                                  x',
                'x             c                        x',
                'x             x                  x     x',
                'x     x                                x',
                'x                                      x',
                'x         hhhhhhhhhhhhhh   c   hhhhhhhhx',
                'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                ]
            },

            {
                numCoins: 1,
                startPosX: 100,
                startPosY: 1900,
                levelData: [
                'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x                      x   x           x',
                'x                                      x',
                'x                                      x',
                'x                xhhhh       hhhhx     x',
                'x                                      x',
                'x                                      x',
                'x                                      x',
                'x             x    h           h       x',
                'x                                      x',
                'x                                      x',
                'x                      hhhhh           x',
                'x          x                           x',
                'x                                      x',
                'x                  h           h       x',
                'x                                      x',
                'x       x       h                 h    x',
                'x                                      x',
                'x                                      x',
                'x                   h         h        x',
                'x          x                           x',
                'x                                      x',
                'x                     h     h          x',
                'x                                      x',
                'x             x     h         h        x',
                'x                   h         h        x',
                'x                   h         h        x',
                'x                h               h     x',
                'x          x     h               h     x',
                'x                h               h     x',
                'x                h               h     x',
                'x                                      x',
                'x       x            h       h         x',
                'x                        c             x',
                'x       hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhx',
                'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                ]
            }  
        ];
    },

    //Upon creation
    create: function () {
        //Setting timer text
        this.txt = game.add.text(game.world.centerX, 100, "" + this.timer, style.navitem.default);

        //Getting the current level
        var level = this.levels[this.currLevel].levelData;

        //Creating the level
        //y
        for (var i = 0; i < level.length; i++) {
            //x
            for (var j = 0; j < level[i].length; j++) {
                var x = j * 50;
                var y = i * 50;
                if (level[i][j] == 'x') {
                    var wall = game.add.sprite(x, y, 'wall');
                    wall.body.immovable = true;
                    this.walls.add(wall);
                } else if (level[i][j] == 'c') {
                    var coin = game.add.sprite(x, y, 'coin');
                    this.coins.add(coin);
                } else if (level[i][j] == 'h') {
                    var hazard = game.add.sprite(x, y, 'hazard');
                    this.hazards.add(hazard);
                }
            }
        }

        //Adding the player
        this.player = game.add.sprite(this.levels[this.currLevel].startPosX, this.levels[this.currLevel].startPosY, 'player');

        //Setting the players gravity
        this.player.body.gravity.y = 36000 * game.time.physicsElapsed;

        //Updating the timer every 10ms
        game.time.events.loop(10, this.updateTimer, this);
    },

    //Adding to the timer and rounding to 2nd decimal place
    updateTimer: function () {
        this.timer += .01;
        this.timer = Math.round(this.timer * 100) / 100;
    },

    update: function () {
        //Collisions between objects    
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);
        game.physics.arcade.overlap(this.player, this.hazards, this.restart, null, this);

        //Setting the timer text
        this.txt.setText("" + this.timer);

        //Player controls

        //Left + Right movement
        if (this.cursor.left.isDown || this.leftKey.isDown) {
            this.player.body.velocity.x = -12000 * game.time.physicsElapsed;
        } else if (this.cursor.right.isDown || this.rightKey.isDown) {
            this.player.body.velocity.x = 12000 * game.time.physicsElapsed;
        } else {
            this.player.body.velocity.x = 0;
        }

        //Jumping
        if ((this.cursor.up.isDown || this.upKey.isDown) && this.player.body.touching.down) {
            this.player.body.velocity.y = -500;
            sound = game.add.audio('jump');
            sound.volume = volume;
            sound.play();
        }

        //I have decided against this feature. >:|
        /*if (this.restartKey.isDown) {
            this.cleanup();
            game.state.start("play");
        }*/

        //Checking to see if the level is completed
        if (this.coinsCollected == this.levels[this.currLevel].numCoins) {
            //Incrementing the level
            this.currLevel++;

            //Pushing the time to the array
            this.times.push(this.timer);

            //Cleaning up the level
            this.cleanup();

            //Checking to see if that was the last level
            if (this.currLevel >= this.levels.length) {
                //Resetting the level count
                this.currLevel = 0;
                //Going to gameOver menu
                game.state.start("gameOver");
            } else {
                //Otherwise restarting the stage with the updated level
                game.state.start("play");
            }
        }
    },

    //Taking care of things that need to be reset each level
    cleanup: function () {
        this.player.destroy();
        this.coinsCollected = 0;
        this.timer = 0;
    },

    //Phaser doesn't like this from what I can tell. I tried getting it to work through this method: https://phaser.io/examples/v2/sprites/extending-sprite-demo-2
    /*Platform: function (game, x, y, velX, velY, distance, hazard) {
        switch (hazard) {
            case true:
                Phaser.Sprite.call(this, game, x, y, 'hazard');
                this.hazards.add(this);
                break;
            case false:
                Phaser.Sprite.call(this, game, x, y, 'wall');
                this.body.immovable = true;
                this.walls.add(wall);
                break;
        }
        
        this.velocity.x = velX;
        this.velocity.y = velY;
        this.startX = x;
        this.startY = y;
        
        game.add.existing(this);
    },*/

    //When the player collides with the coin
    takeCoin: function (player, coin) {
        this.coinsCollected += 1;
        sound = game.add.audio('coinCollection');
        sound.volume = volume;
        sound.play();
        this.particleBurst(coin.x, coin.y);
        coin.destroy();
    },
    
    particleBurst: function(x,y) {
        this.emitter.x = x;
        this.emitter.y = y;
        
        this.emitter.start(true, 500, null, 10);
    },

    //When the player collides with a hazard
    restart: function () {
        sound = game.add.audio('scream');
        sound.volume = volume;
        sound.play();
        game.state.start("play");
    }
};
