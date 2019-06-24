// main.js
// Dependencies: 
// Description: singleton object
// This object will be our main "controller" class and will contain references
// to most of the other objects in the game.

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

/*
 .main is an object literal that is a property of the app global
 This object literal has its own properties and methods (functions)
 
 */
app.main = {
    //  properties
    WIDTH: 640,
    HEIGHT: 480,
    canvas: undefined,
    ctx: undefined,
    lastTime: 0, // used by calculateDeltaTime() 
    gameState: undefined,
    roundScore: 0,
    totalScore: 0,
    highScore: 0,
    debug: true,
    paused: false,
    animationID: 0,
    numClicks: 0,
    Game: Object.freeze({
        WIDTH: 640,
        HEIGHT: 480
    }),

    // original 8 fluorescent crayons: https://en.wikipedia.org/wiki/List_of_Crayola_crayon_colors#Fluorescent_crayons
    //  "Ultra Red", "Ultra Orange", "Ultra Yellow","Chartreuse","Ultra Green","Ultra Blue","Ultra Pink","Hot Magenta"
    colors: [
        "#FD5B78",
        "#FF6037",
        "#FF9966",
        "#FFFF66",
        "#66FF66",
        "#50BFE6",
        "#FF6EFF",
        "#EE34D2"
    ],

    sound: undefined,
    myKeys: undefined,

    //bgAudio: undefined,
    //currentEffect: 0,
    //currentDirection: 1,
    /*effectSounds: [
        "1.mp3",
        "2.mp3",
        "3.mp3",
        "4.mp3",
        "5.mp3",
        "6.mp3",
        "7.mp3",
        "8.mp3"
    ],*/

    CIRCLE: Object.freeze({
        NUM_CIRCLES_START: 5,
        NUM_CIRCLES_END: 20,

        START_RADIUS: 20,
        MAX_RADIUS: 45,
        MIN_RADIUS: 2,

        MAX_LIFETIME: 2.5,

        MAX_SPEED: 80,

        EXPLOSION_SPEED: 60,
        IMPLOSION_SPEED: 84,
    }),

    CIRCLE_STATE: {
        NORMAL: 0,
        EXPLODING: 1,
        MAX_SIZE: 2,
        IMPLODING: 3,
        DONE: 4
    },

    GAME_STATE: { // another fake enumeration
        BEGIN: 0,
        DEFAULT: 1,
        EXPLODING: 2,
        ROUND_OVER: 3,
        REPEAT_LEVEL: 4,
        END: 5
    },

    currLevel: 0,
    levels: [
        //1
        {
            targetNum: 2,
            numCircles: 5,
            failMessage: "Wait for them to clump.",
            winMessage: "You got it!"
        },

        //2
        {
            targetNum: 3,
            numCircles: 7,
            failMessage: "Try to spread the explosions.",
            winMessage: "You're getting the hang of it!"
        },

        //3
        {
            targetNum: 5,
            numCircles: 10,
            failMessage: "Just warming up, right?",
            winMessage: "Okay, cranking up the difficulty now. Maybe."
        },

        //4
        {
            targetNum: 8,
            numCircles: 12,
            failMessage: "I warned ya...",
            winMessage: "Roughly half way there!"
        },

        //5
        {
            targetNum: 11,
            numCircles: 14,
            failMessage: "You can still do it!",
            winMessage: "Past halfway there!"
        },
        
        //6
        {
            targetNum: 16,
            numCircles: 20,
            failMessage: "Hopefully you'll never see this message..",
            winMessage: "66% the way there!"
        },
        
        //7
        {
            targetNum: 9,
            numCircles: 10,
            failMessage: "90% is pretty rough... mwahahaahaaa!",
            winMessage: "Running out of things to write!"
        },
        
        //8
        {
            targetNum: 28,
            numCircles: 30,
            failMessage: "Final Level, coming up!",
            winMessage: "Final Level, coming up!"
        },
        
        //9
        {
            targetNum: 5,
            numCircles: 5,
            failMessage: "That all you got?",
            winMessage: "Got the 100%. Pretty good."
        },
    ],


    circles: [],
    numCircles: this.NUM_CIRCLES_START,

    // methods
    init: function () {
        console.log("app.main.init() called");

        // initialize properties
        this.canvas = document.querySelector('canvas');
        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT;
        this.canvas.onmousedown = this.doMousedown.bind(this);
        this.ctx = this.canvas.getContext('2d');

        this.bgAudio = document.querySelector("#bgAudio");
        this.bgAudio.volume = 0.25;

        this.gameState = this.GAME_STATE.BEGIN;
        this.numCircles = this.levels[this.currLevel].numCircles;
        this.circles = this.makeCircles(this.numCircles);
        console.log("this.circles = " + this.circles);

        // start the game loop
        this.update();
    },

    update: function () {
        // 1) LOOP
        // schedule a call to update()
        this.animationID = requestAnimationFrame(this.update.bind(this));

        // 2) PAUSED?
        // if so, bail out of loop
        if (this.paused) {
            this.drawPauseScreen(this.ctx);
            return;
        }

        // 3) HOW MUCH TIME HAS GONE BY?
        var dt = this.calculateDeltaTime();

        // 4) UPDATE
        //Move Circles
        this.moveCircles(dt);

        //CHECK FOR COLLISIONS
        this.checkForCollisions();

        // 5) DRAW	
        // i) draw background
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

        // ii)Draw Circles
        this.ctx.globalAlpha = 0.9;
        this.drawCircles(this.ctx);

        // iii) draw HUD
        this.ctx.globalAlpha = 1.0;
        this.drawHUD(this.ctx);

        // iv) draw debug info
        if (this.debug) {
            // draw dt in bottom right corner
            this.fillText(this.ctx, "dt: " + dt.toFixed(3), this.WIDTH - 150, this.HEIGHT - 10, "18pt courier", "white");
        }

        //cheats
        if (this.gameState == this.GAME_STATE.BEGIN || this.gameState == this.GAME_STATE.ROUND_OVER) {
            if (this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_UP] && this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_SHIFT]) {
                this.totalScore++;
                this.sound.playEffect();
            }
        }
    },

    /*playEffect: function() {
        var effectSound = document.createElement('audio');
        effectSound.volume = .03;
        effectSound.src = "media/" + this.effectSounds[this.currentEffect];
        effectSound.play();
        this.currentEffect += this.currentDirection;
        if(this.currentEffect == this.effectSounds.length || this.currenEffect == -1) {
            this.currentDirection *= -1;
            this.currentEffect += currentDirection;
        }
    },*/
    makeCircles: function (num) {
        var array = [];

        var circleDraw = function (ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
            ctx.restore();
        };

        var circleMove = function (dt) {
            this.x += this.xSpeed * this.speed * dt;
            this.y += this.ySpeed * this.speed * dt;
            this.y += this.ySpeed * this.speed * dt;
        }

        //debugger;
        for (var i = 0; i < num; i++) {
            var c = {};

            c.x = getRandom(this.CIRCLE.START_RADIUS * 2, this.WIDTH - this.CIRCLE.START_RADIUS * 2);
            c.y = getRandom(this.CIRCLE.START_RADIUS * 2, this.HEIGHT - this.CIRCLE.START_RADIUS * 2);

            c.radius = this.CIRCLE.START_RADIUS;
            var randomVector = getRandomUnitVector();
            c.xSpeed = randomVector.x;
            c.ySpeed = randomVector.y;

            c.speed = this.CIRCLE.MAX_SPEED;
            c.fillStyle = this.colors[i % this.colors.length];
            c.state = this.CIRCLE_STATE.NORMAL;
            c.lifetime = 0;

            c.draw = circleDraw;
            c.move = circleMove;

            Object.seal(c);
            array.push(c);
            Object.seal(c);
        }

        return array;
    },

    circleHitLeftRight: function (c) {
        if (c.x < c.radius || c.x > this.WIDTH - c.radius) {
            return true;
        }
    },

    circleHitTopBottom: function (c) {
        if (c.y < c.radius || c.y > this.HEIGHT - c.radius) {
            return true;
        }
    },

    drawCircles: function (ctx) {
        if (this.gameState == this.GAME_STATE.ROUND_OVER || this.gameState == this.GAME_STATE.END) {
            this.ctx.globalAlpha = 0.25;
        }

        for (var i = 0; i < this.circles.length; i++) {
            var c = this.circles[i];
            if (c.state === this.CIRCLE_STATE.DONE) continue;
            c.draw(ctx);
        }
    },

    moveCircles: function (dt) {
        for (var i = 0; i < this.circles.length; i++) {
            var c = this.circles[i];
            if (c.state === this.CIRCLE_STATE.DONE) continue;
            if (c.state === this.CIRCLE_STATE.EXPLODING) {
                c.radius += this.CIRCLE.EXPLOSION_SPEED * dt;
                if (c.radius >= this.CIRCLE.MAX_RADIUS) {
                    c.state = this.CIRCLE_STATE.MAX_SIZE;
                    console.log("circle #" + i + " hit CIRCLE.MAX_RADIUS");
                }
                continue;
            }

            if (c.state === this.CIRCLE_STATE.MAX_SIZE) {
                c.lifetime += dt;
                if (c.lifetime >= this.CIRCLE.MAX_LIFETIME) {
                    c.state = this.CIRCLE_STATE.IMPLODING;
                    console.log("circle #" + i + " hit CIRCLE.MAX_LIFETIME");
                }
                continue;
            }

            if (c.state === this.CIRCLE_STATE.IMPLODING) {
                c.radius -= this.CIRCLE.IMPLOSION_SPEED * dt;
                if (c.radius <= this.CIRCLE.MIN_RADIUS) {
                    console.log("circle #" + i + "hit CIRCLE.MIN_RADIUS and is gone");
                    c.state = this.CIRCLE_STATE.DONE;
                    continue;
                }
            }

            //Moving circles
            c.move(dt);

            //Checking boundary collisions
            if (this.circleHitLeftRight(c)) {
                c.xSpeed *= -1;
                c.move(dt);
            }
            if (this.circleHitTopBottom(c)) {
                c.ySpeed *= -1;
                c.move(dt);
            }
        }
    },

    pauseGame: function () {
        this.stopBGAudio();

        this.paused = true;

        //Stopping animation loop
        cancelAnimationFrame(this.animationID);

        //Make sure pause screen gets drawn
        this.update();
    },

    resumeGame: function () {
        //Stopping animation loop
        cancelAnimationFrame(this.animationID);

        this.paused = false;

        //Restarting loop
        this.update();

        this.sound.playBGAudio();
    },

    toggleDebug: function () {
        this.debug = !this.debug;
    },

    stopBGAudio: function () {
        //this.bgAudio.pause();
        //this.bgAudio.currentTime = 0;

        this.sound.stopBGAudio();
    },

    reset: function () {
        if (this.roundScore >= this.levels[this.currLevel].targetNum) {
            this.currLevel++;
        }
        this.numClicks = 0;
        this.roundScore = 0;
        this.circles = this.makeCircles(this.levels[this.currLevel].numCircles);
    },

    doMousedown: function (e) {
        this.sound.playBGAudio();

        var mouse = getMouse(e);

        if (this.gameState == this.GAME_STATE.ROUND_OVER) {
            this.gameState = this.GAME_STATE.DEFAULT;
            this.reset();
            return;
        }

        if (this.gameState == this.GAME_STATE.END) {
            this.gameState = this.GAME_STATE.DEFAULT;
            this.resetGame();
            return;
        }

        //unpause on click
        //Making sure we don't get stuck on pause
        if (this.paused) {
            this.paused = false;
            this.update();
            return;
        };

        //if the round is over, reset and add 5 more circles
        if (this.gameState == this.GAME_STATE.ROUND_OVER) {
            this.gameState = this.GAME_STATE.DEFAULT;
            this.reset();
            return;
        }

        console.log("e=" + e);
        console.log("e.target= " + e.target);
        console.log("this= " + this);

        console.log("e.pageX=" + e.pageX);
        console.log("e.pageY=" + e.pageY);

        var mouse = getMouse(e);
        console.log("(mouse.x,mouse.y)=" + mouse.x + "," + mouse.y);

        if (this.numClicks == 0) {
            this.checkCircleClicked(mouse);
        }
    },

    checkForCollisions: function () {
        if (this.gameState == this.GAME_STATE.EXPLODING) {
            // check for collisions between circles
            for (var i = 0; i < this.circles.length; i++) {
                var c1 = this.circles[i];
                // only check for collisions if c1 is exploding
                if (c1.state === this.CIRCLE_STATE.NORMAL) continue;
                if (c1.state === this.CIRCLE_STATE.DONE) continue;
                for (var j = 0; j < this.circles.length; j++) {
                    var c2 = this.circles[j];
                    // don't check for collisions if c2 is the same circle
                    if (c1 === c2) continue;
                    // don't check for collisions if c2 is already exploding 
                    if (c2.state != this.CIRCLE_STATE.NORMAL) continue;
                    if (c2.state === this.CIRCLE_STATE.DONE) continue;

                    // Now you finally can check for a collision
                    if (circlesIntersect(c1, c2)) {
                        this.sound.playEffect();
                        c2.state = this.CIRCLE_STATE.EXPLODING;
                        c2.xSpeed = c2.ySpeed = 0;
                        this.roundScore++;
                    }
                }
            } // end for

            // round over?
            var isOver = true;
            for (var i = 0; i < this.circles.length; i++) {
                var c = this.circles[i];
                if (c.state != this.CIRCLE_STATE.NORMAL && c.state != this.CIRCLE_STATE.DONE) {
                    isOver = false;
                    break;
                }
            } // end for

            if (isOver) {
                this.stopBGAudio();
                this.gameState = this.GAME_STATE.ROUND_OVER;
                if (this.roundScore >= this.levels[this.currLevel].targetNum) {
                    this.totalScore += this.roundScore;
                }
                if (this.currLevel >= this.levels.length - 1 && this.roundScore >= this.levels[this.currLevel].targetNum) {
                    this.gameState = this.GAME_STATE.END;
                }
            }

        } // end if GAME_STATE_EXPLODING
    },

    checkCircleClicked: function (mouse) { //loopingthroughcirclearraybackwards,why?
        for (var i = this.circles.length - 1; i >= 0; i--) {
            var c = this.circles[i];
            if (pointInsideCircle(mouse.x, mouse.y, c)) {
                this.sound.playEffect();
                c.fillStyle = "red";
                c.xSpeed = c.ySpeed = 0;
                c.state = this.CIRCLE_STATE.EXPLODING;
                this.gameState = this.GAME_STATE.EXPLODING;
                this.roundScore++;
                this.numClicks += 1;
                break; //we want to click only one circle
            }
        }
    },

    resetGame: function () {
        this.gameState = this.GAME_STATE.BEGIN;
        if (this.totalScore > this.highScore) {
            this.highScore = this.totalScore;
        }
        this.currLevel = 0;
        this.totalScore = 0;
        this.roundScore = 0;
        this.reset();
    },

    drawPauseScreen: function (ctx) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        this.fillText(this.ctx, "...PAUSED...", this.WIDTH / 2, this.HEIGHT / 2, "40pt courier", "white");
        ctx.restore();
    },

    drawHUD: function (ctx) {
        ctx.save(); // NEW
        // draw score
        // fillText(string, x, y, css, color)
        this.fillText(this.ctx, "This Round: " + this.roundScore + "/" + this.levels[this.currLevel].targetNum + " of " + this.levels[this.currLevel].numCircles, 20, 20, "14pt courier", "#ddd");
        this.fillText(this.ctx, "Total Score: " + this.totalScore, this.WIDTH - 200, 20, "14pt courier", "#ddd");
        this.fillText(this.ctx, "High Score: " + this.highScore, this.WIDTH - 200, 40, "14pt courier", "#ddd");

        // NEW
        if (this.gameState == this.GAME_STATE.BEGIN) {
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            this.fillText(this.ctx, "To begin, click a circle", this.WIDTH / 2, this.HEIGHT / 2, "30pt courier", "white");
        } // end if

        // NEW
        if (this.gameState == this.GAME_STATE.ROUND_OVER) {
            ctx.save();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            if (this.currLevel + 1 < this.levels.length && this.roundScore >= this.levels[this.currLevel].targetNum) {
                this.fillText(this.ctx, this.levels[this.currLevel].winMessage, this.WIDTH / 2, this.HEIGHT / 2 - 40, "25pt courier bold", "#ddd");
                this.fillText(this.ctx, "Goal next round: " + this.levels[this.currLevel + 1].numCircles + " of " + this.levels[this.currLevel + 1].targetNum + " circles", this.WIDTH / 2, this.HEIGHT / 2, "20pt courier", "#ddd");
                this.fillText(this.ctx, "Click to continue", this.WIDTH / 2, this.HEIGHT / 2 + 40, "30pt courier", "red");
            } else if (this.roundScore < this.levels[this.currLevel].targetNum) {
                this.fillText(this.ctx, this.levels[this.currLevel].failMessage, this.WIDTH / 2, this.HEIGHT / 2 - 40, "20pt courier", "#ddd");
                this.fillText(this.ctx, "Click to retry...", this.WIDTH / 2, this.HEIGHT / 2, "20pt courier", "red");
            }
        } // end if

        if (this.gameState == this.GAME_STATE.END) {
            ctx.save();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            this.fillText(this.ctx, "You won!", this.WIDTH / 2, this.HEIGHT / 2 - 40, "30pt courier", "#ddd");
            if (this.totalScore > this.highScore) {
                this.fillText(this.ctx, "New Highscore: " + this.totalScore, this.WIDTH / 2, this.HEIGHT / 2, "20pt courier", "red")
            } else {
                this.fillText(this.ctx, "Total Score: " + this.totalScore, this.WIDTH / 2, this.HEIGHT / 2, "20pt courier", "red");
            }
            this.fillText(this.ctx, "Click to restart game", this.WIDTH / 2, this.HEIGHT / 2 + 40, "30pt courier", "#ddd");

        }

        ctx.restore(); // NEW
    },


    fillText: function (ctx, string, x, y, css, color) {
        ctx.save();
        // https://developer.mozilla.org/en-US/docs/Web/CSS/font
        ctx.font = css;
        ctx.fillStyle = color;
        ctx.fillText(string, x, y);
        ctx.restore();
    },

    calculateDeltaTime: function () {
        var now, fps;
        now = performance.now();
        fps = 1000 / (now - this.lastTime);
        fps = clamp(fps, 12, 60);
        this.lastTime = now;
        return 1 / fps;
    }
}; // end app.main
