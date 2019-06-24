//I can't use "use strict" here or Google's WebFontConfig workaround with Phaser doesn't work shown here: https://github.com/MattMcFarland/phaser-menu-system
"use strict"

var splash = function () {},
    playMusic = true,
    music,
    sound,
    volume = .1;

splash.prototype = {
    //Loading the scripts for the game states
    loadScripts: function () {
        game.load.script('WebFont', 'js/webfontloader.js');
        game.load.script('gameMenu', 'states/gameMenu.js');
        game.load.script('play', 'states/play.js');
        game.load.script('gameOver', 'states/gameOver.js');
        game.load.script('styles', 'lib/styles.js');
    },

    //Loading sounds (BGM = Background Music)
    loadBGM: function () {
        //https://freesound.org/people/joshuaempyre/sounds/251461/
        game.load.audio('mainMenuLoop', 'assets/media/menuLoop.mp3');

        //https://freesound.org/people/B_Lamerichs/sounds/220331/
        game.load.audio('gameLoop', 'assets/media/gameLoop.mp3');

        //https://freesound.org/people/ProjectsU012/sounds/341695/
        game.load.audio('coinCollection', 'assets/media/coinCollection.mp3');

        //https://opengameart.org/content/512-sound-effects-8-bit-style
        game.load.audio('jump', 'assets/media/jump.mp3');
        game.load.audio('buttonConfirm', 'assets/media/buttonConfirm.mp3');
        game.load.audio('buttonDeny', 'assets/media/buttonDeny.mp3');
        game.load.audio('hazard', 'assets/media/hazard.mp3');
        game.load.audio('scream', 'assets/media/scream.mp3');
    },

    //Loading the images used for game objects
    loadImages: function () {
        this.load.image('wall', 'assets/sprites/wall.png');
        this.load.image('coin', 'assets/sprites/coin.png');
        this.load.image('hazard', 'assets/sprites/hazard.png');
        this.load.image('player', 'assets/sprites/player.png');
    },

    loadFonts: function () {
        window.WebFontConfig = {
            custom: {
                families: ['PressStart2P-Regular'],
                urls: ['assets/fonts/font.css']
            }
        }
    },

    init: function () {
        //Making the loading bar
        this.loadingBar = game.make.sprite(game.world.centerX, game.world.centerY - 300, "loading");

        //Making the status text
        this.status = game.make.text(game.world.centerX, game.world.centerY, 'Loading...', {
            fill: 'white',
            font: '20pt PressStart2P-Regular'
        });

        //Centering..
        utils.centerGameObjects([this.status, this.loadingBar]);
    },

    preload: function () {
        //Adding our assets made in the init
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);

        //Setting the loading bar to show load progress
        this.load.setPreloadSprite(this.loadingBar);

        //Loading all the assets
        this.loadScripts();
        this.loadBGM();
        this.loadImages();
        this.loadFonts();
    },

    //Adds the music
    addGameMusic: function () {
        music = game.add.audio('mainMenuLoop');
        music.loop = true;
        music.volume = volume;
        music.play();
    },

    //Adds the game states
    addGameStates: function () {
        game.state.add("play", play);
        game.state.add("gameOver", gameOver);
        game.state.add("gameMenu", gameMenu);
    },

    create: function () {
        //Setting status text once everything is loaded.
        this.status.setText('Ready!');

        //Adding the game states
        this.addGameStates();

        //Moving to the main menu after adding music and 1 second has passed (So you can see the loading screen in case it loads to fast)
        setTimeout(function () {
            //Playing music
            splash.prototype.addGameMusic();

            //Going to main menu
            game.state.start("gameMenu");
        }, 1000);
    }
}
