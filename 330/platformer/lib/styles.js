"use strict"

var style;

//IIFE
(function () {
    //Setting colors
    var defaultColor = "white",
        highlightColor = "#FEFFD5",
        bestColor = "rgba(255,215,0,1.0)";

    style = {
        //Header style
        header: {
            font: 'bold 60pt PressStart2P-Regular',
            fill: defaultColor,
            align: 'center'
        },
        navitem: {
            //Consistent base
            base: {
                font: '30pt PressStart2P-Regular',
                align: 'left',
                strokeThickness: 4
            },
            //Default fill and stroke
            default: {
                fill: defaultColor,
                stroke: 'rgba(0,0,0,1)'
            },
            //Hover fill and stroke
            hover: {
                fill: highlightColor,
                stroke: 'rgba(200,200,200,0.5)'
            },
            //Best times fill 
            best: {
                fill: bestColor
            },
        }
    };

    //Assign style pieces on top of the base style as long as we didn't call for the base style
    for (var key in style.navitem) {
        if (key !== "base") {
            Object.assign(style.navitem[key], style.navitem.base);
        }
    }
})();
