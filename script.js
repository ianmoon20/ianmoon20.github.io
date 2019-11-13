var carouselList = document.getElementById("carousel-list");
var carousel = document.getElementById("myCarousel");
var carouselImages = document.getElementById("carousel-images");
var desc = document.getElementById("desc");
var modalTitle = document.getElementById("modalTitle");
var projectLink = document.getElementById("projectLink");
var teamSize = document.getElementById("teamSize");
var timeSpent = document.getElementById("timeSpent");
var resources = document.getElementById("resources");
var leftControl = document.getElementById("left");
var rightControl = document.getElementById("right");

var projectInfo = {
    "platform": {
        "total": 6,
        "name": "Speed Platformer",
        "link": "330/platformer/index.html",
        "size": "1",
        "time": "1 Month",
        "resources": ["Phaser.js", "Javascript", "HTML", "CSS"],
        "0": "media/Platformer1.png",
        "1": "media/Platformer2.png",
        "2": "media/Platformer3.png",
        "3": "media/Platformer4.png",
        "4": "media/Platformer5.png",
        "5": "media/Platformer6.png",
        "desc": "This is Speed Platformer.",

    },
    "aisles": {
        "total": 5,
        "name": "Aisles of Chaos",
        "link": "game/index.html",
        "size": "4",
        "time": "2 Days",
        "resources": ["Construct 2"],
        "0": "media/Aisles1.png",
        "1": "media/Aisles2.png",
        "2": "media/Aisles3.png",
        "3": "media/Aisles4.png",
        "4": "media/Aisles5.png",
        "desc": "This is Aisles of Chaos.",
    },
    "audio": {
        "total": 5,
        "name": "Audio Visualizer",
        "link": "330/AudioViz/index.html",
        "size": "1",
        "time": "1 Month",
        "resources": ["HTML", "Javascript", "CSS"],
        "0": "media/Audio1.png",
        "1": "media/Audio2.png",
        "2": "media/Audio3.png",
        "3": "media/Audio4.png",
        "4": "media/Audio5.png",
        "desc": "This is an Audio Visualizer.",
    },
    "deck": {
        "total": 8,
        "name": "Decked Builder",
        "link": "https://proj2-mvc-430.herokuapp.com/",
        "size": "1",
        "time": "1 Month",
        "resources": ["HTML", "Javascript", "CSS", "Bootstrap"],
        "0": "media/Decked1.png",
        "1": "media/Decked2.png",
        "2": "media/Decked3.png",
        "3": "media/Decked4.png",
        "4": "media/Decked5.png",
        "5": "media/Decked6.png",
        "6": "media/Decked7.png",
        "7": "media/Decked8.png",
        "desc": "This is Decked Builder",
    },
    "dume": {
        "total": 0,
        "name": "Dume Realtors",
        "link": "https://sites.google.com/g.rit.edu/dume/home?authuser=1",
        "size": "4",
        "time": "3 Months",
        "resources": ["Google Spreadsheet", "Google Docs", "Gamecrafter"],
        "0": "media/Dume1.pdf#view=fitb",
        "desc": "Villains always seem to crop up in towns, cities, and neighborhoods... but how exactly do they settle in? I mean, they always seem to get a headquarters, but who is the person responsible for selling the property? Well, in short, you!<br><br>In this game the players are competing real estate agents tasked with the experience of supplying villains of all walks of life with homes and headquarters. In order to do this, you must take these differences into consideration. The property that appeals to the Foot Clan Member will probably not make Cthulhu, for instance, very pleased with you and I wouldn’t want to make him mad.<br><br>However, the clients are not your only problem. Throughout the course of the game, the other players will also be trying to clamor their way to the top of the sometimes metaphorical food chain. So watch your footing and be very careful to balance aggression and cooperation, for sometimes the enemy of your enemy is your friend. But remember, at the end of the day, only one player can be the very best.",
    },
    "rogue": {
        "total": 1,
        "name": "Once a Rogue",
        "link": "https://github.com/DarkSword-Studios/Once-A-Rogue",
        "size": "4",
        "time": "3 Months",
        "resources": ["Monogame", "C#"],
        "0": "media/Rogue1.png",
        "desc": "This is once a rogue.",
    }
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-toggle="tooltip"]').tooltip({
        boundary: 'window'
    })
})

var makeModal = function (name) {
    //Resetting modal carousel
    while (carouselList.firstChild) {
        carouselList.removeChild(carouselList.firstChild);
    }
    while (carouselImages.firstChild) {
        carouselImages.removeChild(carouselImages.firstChild);
    }
    while (resources.firstChild) {
        resources.removeChild(resources.firstChild);
    }

    desc.innerHTML = "";

    if (projectInfo[name]["total"] > 1) {
        rightControl.style.display = "";
        leftControl.style.display = "";
    } else {
        rightControl.style.display = "none";
        leftControl.style.display = "none";
    }

    //If we need an embed
    if (name == "dume") {
        var embed = document.createElement("embed");
        embed.src = projectInfo[name]["0"];
        embed.classList.add("carouselInner");
        carouselImages.appendChild(embed);

        carousel.classList.remove("slide");
    } else {
        carousel.classList.add("slide");
        //Updating information based on what was clicked.
        for (var i = 0; i < projectInfo[name]["total"]; i++) {
            var li = document.createElement("li");
            var div = document.createElement("div");
            var img = document.createElement("img");

            li.setAttribute('data-target', '#myCarousel');
            li.setAttribute('data-slide-to', i);
            if (i == 0) {
                li.classList.add("active");
            }

            carouselList.appendChild(li);

            div.classList.add("item");
            if (i == 0) {
                div.classList.add("active");
            }

            img.src = projectInfo[name][i];
            img.alt = i;
            img.classList.add("carouselInner");
            div.appendChild(img);
            carouselImages.appendChild(div);
        }
    }

    for (var i = 0; i < projectInfo[name]["resources"].length; i++) {
        var li = document.createElement("li");
        li.innerHTML = projectInfo[name]["resources"][i];

        resources.appendChild(li);
    }

    modalTitle.innerHTML = projectInfo[name]["name"];
    projectLink.href = projectInfo[name]["link"];
    $('[data-toggle="tooltip"]').attr('title', projectInfo[name]["link"])
        .tooltip('fixTitle');
    teamSize.innerHTML = projectInfo[name]["size"];
    timeSpent.innerHTML = projectInfo[name]["time"];
    desc.innerHTML = projectInfo[name]["desc"];
}
