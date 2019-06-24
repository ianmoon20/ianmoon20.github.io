"use strict";

//Variables for storring the canvas, context, grid, grid width, grid height, tile width, tile height, tile padding, window width, and window height respectively
var canvas, ctx, grid, gridWidth, gridHeight, tileWidth, tileHeight, tilePadding, winWidth, winHeight;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    console.log("X: " + x + " Y: " + y + " Width: " + width + " Height: " + height);
    ctx.fillRect(x, y, width, height);
}

function redraw() {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = '5';
    ctx.strokeRect(0, 0, winWidth, winHeight);

    console.dir(grid);

    ctx.save();
    for (var i = 0; i < gridWidth; i++) {
        for (var j = 0; j < gridHeight; j++) {
            switch (grid[i][j]) {
                case "wall":
                    drawRect(i * tileWidth + tilePadding * 2, j * tileHeight + tilePadding * 2, tileWidth - tilePadding, tileHeight - tilePadding, "gray");
                    //console.log(tilePadding);
                    break;
                case "start":
                    drawRect(i * tileWidth + tilePadding * 2, j * tileHeight + tilePadding * 2, tileWidth - tilePadding, tileHeight - tilePadding, "red");
                    //console.log(tilePadding);
                    break;
            }
            
            ctx.restore();
        }
    }
}

function resizeCanvas() {
    winWidth = window.innerWidth;
    winHeight = window.innerHeight;
    canvas.width = winWidth;
    canvas.height = winHeight;
    tilePadding = winWidth/100;
    console.log(tilePadding);
    tileWidth = winWidth / gridWidth - tilePadding;
    tileHeight = winHeight / gridHeight - tilePadding;
    redraw();
}

function initialize() {
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');

    gridWidth = 4;
    gridHeight = 4;

    grid = generateLevel(gridHeight, gridWidth);
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, false);
}

window.onload = initialize;
