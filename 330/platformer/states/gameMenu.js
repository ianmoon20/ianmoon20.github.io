"use strict"

var gameMenu = function () {};

gameMenu.prototype = {
    //Adding a button to the main menu screen
    addMenuOption: function (text, callback) {
        //display the text
        var txt = game.add.text(game.world.centerX, (this.optionCount * 200) + 600, text, style.navitem.default);

        //center the text's anchor
        utils.centerGameObjects([txt]);

        //Set the text to clickable
        txt.inputEnabled = true;

        //Click + Hover Inputs
        txt.events.onInputUp.add(callback);
        txt.events.onInputOver.add(function (target) {
            target.setStyle(style.navitem.hover);
        });
        txt.events.onInputOut.add(function (target) {
            target.setStyle(style.navitem.default);
        });

        //Incrementing options on screen
        this.optionCount++;
    },

    init: function () {
        //Make the title text in advance
        this.titleText = game.make.text(game.world.centerX, 400, "Speed Platformer", {
            font: 'bold 80pt PressStart2P-Regular',
            fill: '#e93030',
            stroke: 'rgba(0,0,0,1.0)',
            strokeThickness: 4,
            align: 'center'
        });
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        utils.centerGameObjects([this.titleText]);
    },

    preload: function () {
        //Setting the option count to one for the first button
        this.optionCount = 1;
    },

    create: function () {
        //Adding the premade title text
        game.add.existing(this.titleText);

        //Adding a start button with a callback function to play music and advance the gameState
        this.addMenuOption("Start", function () {
            music.stop();
            music = game.add.audio('gameLoop');
            music.loop = true;
            music.volume = volume;
            music.play();

            //Playing a confirmation sound
            sound = game.add.audio('buttonConfirm');
            sound.volume = volume;
            sound.play();

            game.state.start("play");
        });

        //Adding a reset data button which clears the previous highscores
        this.addMenuOption("Reset Data", function () {
            //Checking to make sure if there are highscores stored currently
            if (localStorage.highscores != null) {
                //Playing a confirmation sound
                sound = game.add.audio('buttonConfirm');
                sound.volume = volume;
                sound.play();

                //Clearing the storage
                localStorage.clear();

                //Displaying a confirmation message with a little alpha animation
                var dataConfirmation = game.add.text(game.world.centerX, 1500, "Data cleared!", style.navitem.default);

                utils.centerGameObjects([dataConfirmation]);

                //Setting the alpha to 0
                dataConfirmation.alpha = 0;

                //Having the animation fade in then fade out
                var tweenA = game.add.tween(dataConfirmation).to({
                    alpha: 1
                }, 1000, "Linear");
                var tweenB = game.add.tween(dataConfirmation).to({
                    alpha: 0
                }, 400, "Linear");

                //Telling tweenB to come after tweenA has finished 
                tweenA.chain(tweenB);

                tweenA.start();
            } else {
                //If there isn't a highscore list saved, give a negative feedback sound
                sound = game.add.audio('buttonDeny');
                sound.play();
            }
        });
    }
};
