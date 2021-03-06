/*
loader.js
variable 'app' is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of 
the game will be properties of app.
*/
"use strict";

// if app exists use the existing copy
// else create a new empty object literal
var app = app || {};

window.onblur = function () {
    console.log("blur at " + Date());

    app.main.paused = true;

    //Stop the Animation
    cancelAnimationFrame(app.main.animationID);

    //Call Update
    app.main.update();
}

window.onfocus = function () {
    console.log("focus at " + Date());

    //Stop the Animation
    cancelAnimationFrame(app.main.animationID);

    app.main.paused = false;

    //Call Update
    app.main.update();
}

window.onload = function () {
    console.log("window.onload called");
    app.main.init();
}
