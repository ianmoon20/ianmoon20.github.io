"use strict"

//Variable that stores utility functions
var utils = {
    //Sets the anchor for every game object in the array passed in
    centerGameObjects: function (objects) {
        objects.forEach(function (object) {
            object.anchor.setTo(0.5);
        })
    }
};
