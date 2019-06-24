"use strict"

var game = new Phaser.Game(2000, 2000, Phaser.AUTO, ''),
    main = function () {};

main.prototype = {
    //Preloading assets and scripts
    preload: function () {
        this.load.image('loading', 'assets/sprites/loading.png');

        //Loading the splash screen and utility function folder
        game.load.script('splash', 'states/splash.js');
        game.load.script('utils', 'lib/utils.js');
    },

    //Upon creation...
    create: function () {
        game.state.add('splash', splash);
        game.state.start('splash');
    },

    //Initializing Phaser settings
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        game.stage.backgroundColor = "#302F2F";
    }
}

game.state.add("main", main);
game.state.start("main");