"use strict"
var gameOver = function () {};

gameOver.prototype = {
    //Properties
    
    //Scores given by the play.js times
    scores: [],
    
    //Best times which are loaded in through localstorage
    bestTimes: [],
    
    //Creates the text display for the gameover menu
    createTimerText: function (type) {
        //Positioning the text
        var timesTxt = game.add.text(game.world.centerX - 400, (this.index * 80) + 650, "Level " + (this.index + 1) + ": " + play.prototype.times[this.index], style.navitem.default);

        //If the time was a best time, make it gold
        if (this.bestTimes[this.index]) {
            timesTxt.setStyle(style.navitem.best);
        }

        //Displaying the highscore text
        var bestTxt = game.add.text(game.world.centerX + 400, (this.index * 80) + 650, "Level " + (this.index + 1) + ": " + this.scores[this.index], style.navitem.best);

        //Centering
        utils.centerGameObjects([timesTxt, bestTxt]);

        //If we are displaying the total run times
        if (type === "total") {
            //Round to 2nd decimal place
            this.total = Math.round(this.total * 100) / 100;
            timesTxt.setText("Total Time: " + this.total);
            
            //If there were highscores
            if (this.scores != undefined) {
                this.bestTotal = Math.round(this.bestTotal * 100) / 100;
                bestTxt.setText("Total Time: " + this.bestTotal);
                if (this.total <= this.bestTotal) {
                    timesTxt.setStyle(style.navitem.best);
                }
            }
        } else {
            this.index++
        }
    },

    //Adding options to the menu (Functions differently than the gameMenu one)
    addMenuOption: function (text, callback) {
        //Positioning text (modifies the X positioning instead of the Y, and does so by a different margin)
        var txt = game.add.text(game.world.centerX - 200 * this.optionCount, game.world.height - 300, text, style.navitem.default);
        utils.centerGameObjects([txt]);

        //Setting the text to clickable
        txt.inputEnabled = true;

        //Inputs
        txt.events.onInputUp.add(callback);
        txt.events.onInputOver.add(function (target) {
            target.setStyle(style.navitem.hover);
        });
        txt.events.onInputOut.add(function (target) {
            target.setStyle(style.navitem.default);
        });

        //Incrementing options on screen
        this.optionCount = -this.optionCount;
    },

    //Compare the current times for each level the the high score time
    checkScore: function (loc) {
        //replace the highscore time if it didn't exist or was higher than the current time for that level
        if (this.scores[loc] > play.prototype.times[loc] || this.scores[loc] === undefined) {
            this.scores[loc] = play.prototype.times[loc];
            
            //Store the index of the new high score so we can highlight it
            this.bestTimes[loc] = 1;
        }
    },

    init: function () {
        //Make the title text
        this.titleText = game.make.text(game.world.centerX, 400, "Game Over", {
            font: 'bold 80pt PressStart2P-Regular',
            fill: '#e93030',
            stroke: 'rgba(0,0,0,1.0)',
            strokeThickness: 4,
            align: 'center'
        });
        
        //Set the option count to 1 for the first button
        this.optionCount = 1;

        //Give the title some shadow
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

        //Making the heading texts
        this.headingText = game.make.text(game.world.centerX - 400, 550, "This Run", style.navitem.default);
        this.bestHeadingText = game.make.text(game.world.centerX + 400, 550, "Best Run", style.navitem.best);

        //Centering
        utils.centerGameObjects([this.headingText, this.bestHeadingText, this.titleText]);
    },

    preload: function () {
        //Loading the highscores if any exist
        //Loading everytime gameover loads because the data may have been cleared
        if (localStorage.getItem("highscores") != null) {
            //Storing and parsing the highscores
            this.scores = localStorage.getItem("highscores");
            this.scores = JSON.parse(this.scores);
        }
    },

    create: function () {
        //Starting the menu music after stopping the play music
        music.stop();
        music = game.add.audio('mainMenuLoop');
        music.loop = true;
        music.volume = volume;
        music.play();

        //Adding our premade texts
        game.add.existing(this.headingText);
        game.add.existing(this.bestHeadingText);
        game.add.existing(this.titleText);

        //Adding a retry button
        this.addMenuOption("Retry?", function () {
            //Playing a confirmation sound
            sound = game.add.audio('buttonConfirm');
            sound.volume = volume;
            sound.play();
            
            music.stop();
            music = game.add.audio('gameLoop');
            music.volume = volume;
            music.loop = true;
            music.play();
            game.state.start("play");
        });

        //Adding a button to return to main menu
        this.addMenuOption("Main Menu", function () {
            //Playing a confirmation sound
            sound = game.add.audio('buttonConfirm');
            sound.volume = volume;
            sound.play();
            
            game.state.start("gameMenu");
        });

        //Setting variables used for checking scores
        this.index = 0;
        this.total = 0;
        this.bestTotal = 0;
        this.result = {};

        for (var i = 0; i < play.prototype.times.length; i++) {
            this.checkScore(i);

            this.createTimerText();
            this.total += play.prototype.times[i];
            this.bestTotal += this.scores[i];
        }

        this.createTimerText("total");

        localStorage.highscores = JSON.stringify(this.scores);

        this.cleanup();
    },

    cleanup: function () {
        play.prototype.times = [];
        this.bestTimes = [];
        this.scores = [];
    }
};
