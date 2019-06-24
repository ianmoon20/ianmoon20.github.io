"use strict";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    var result = Math.floor((Math.random() * (max - min) + min));
    return result;
}

function generateLevel(width, height) {
    //Create a level tile-grid
    //console.log("" + width + " " + height);
    var ranInt = getRandomInt(0, 4),
        grid = new Array(width);

    for (var i = 0; i < width; i++) {
        grid[i] = new Array(height);
    }

    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            grid[i][j] = "wall";
        }
    }

    //console.log("Case number: " + ranInt);

    switch (ranInt) {
        //0 means y = 0
        case 0:
            ranInt = getRandomInt(0, width);
            //console.log("Case 0 Random number: " + ranInt);
            grid[ranInt][0] = 'start';
            break;
            //1 means x = 0
        case 1:
            ranInt = getRandomInt(0, height);
            //console.log("Case 1 Random number: " + ranInt);
            grid[0][ranInt] = "start";
            break;
            //2 means y = height
        case 2:
            ranInt = getRandomInt(0, width);
            //console.log("Case 2 Random number: " + ranInt);
            grid[ranInt][height - 1] = "start";
            break;
            //3 means x = width
        case 3:
            ranInt = getRandomInt(0, height);
            //console.log("Case 3 Random number: " + ranInt);
            grid[width - 1][ranInt] = "start";
            break;
    }

    //console.dir(grid);
    return grid;
}
