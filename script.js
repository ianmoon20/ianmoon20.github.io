var carouselList = document.getElementById("carousel-list");
var carousel = document.getElementById("myCarousel");
var carouselImages = document.getElementById("carousel-images");
var desc = document.getElementById("desc");
var modalTitle = document.getElementById("modalTitle");
var projectLink = document.getElementById("projectLink");
var teamSize = document.getElementById("teamSize");
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
        "desc": "Speed Platformer is a game using the Phaser.js engine. The goal of the game is to complete each of the stages as quickly as possible. To complete each stage, the players will have to navigate the level without touching any of the red obstacles. The game's data is stored in the browser's memory to remember the user's fastest times when returning to the site and compares them to their current run's times.",
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
        "desc": "Aisles of Chaos is a 2-player party game designed during a Game Jam. Utilizing the Construct 2 Engine, the goal of the game is to bring various food items to a register for points. The player with the highest points at the end of the time limit wins. However, the food you are holding can also be used as a weapon to cause your opponent to drop all of their food.",
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
        "desc": "An audio visualizer featuring various customization options such as grayscale, RGB changing, song uploading, etc. Reads in data from the Audio API, parses the data, then adjusts the image displayed on the screen based on the data.",
    },
    "deck": {
        "total": 8,
        "name": "Decked Builder",
        "link": "https://mtgdeckbox.herokuapp.com/",
        "size": "1",
        "time": "1 Month",
        "resources": ["HTML", "Javascript", "CSS", "Bootstrap", "MongoDB"],
        "0": "media/Decked1.png",
        "1": "media/Decked2.png",
        "2": "media/Decked3.png",
        "3": "media/Decked4.png",
        "4": "media/Decked5.png",
        "5": "media/Decked6.png",
        "6": "media/Decked7.png",
        "7": "media/Decked8.png",
        "desc": "Decked Builder is a simple Magic: The Gathering deck building site. The site uses MongoDB and Javascript to allow users to create profiles and save their decklists. User passwords are hashed and salted for protection.",
    },
    "dume": {
        "total": 0,
        "name": "Dume Realtors",
        "link": "https://sites.google.com/g.rit.edu/dume/home?authuser=1",
        "size": "4",
        "time": "3 Months",
        "resources": ["Google Spreadsheet", "Google Docs", "Gamecrafter"],
        "0": "media/Dume1.pdf#view=fitb",
        "desc": "D&Uuml;ME Realtors is a party card game designed to be played with between two to four players. The game features largely competitive elements with opportunities of cooperation in which players attempt to become the best super villain real estate agent. Players take turns selecting a villain to attempt to sell their available homes to and the other players will try to steal said client. The player with the most points, as gained by the clients they've sold homes to, wins.",
    },
    "rogue": {
        "total": 7,
        "name": "Once a Rogue",
        "link": "https://github.com/DarkSword-Studios/Once-A-Rogue",
        "size": "4",
        "time": "3 Months",
        "resources": ["Monogame", "C#"],
        "0": "media/RogueHome.png",
        "1": "media/Rogue1.png",
        "2": "media/Rogue2.png",
        "3": "media/Rogue3.png",
        "4": "media/Rogue4.png",
        "5": "media/Rogue5.png",
        "6": "media/Rogue6.png",
        "desc": "Once a Rogue is a procedurally generated roleplaying game, in the style of Binding of Isaac. Players traverse a randomly generated dungeon by navigating rooms. Each room has a template that determines the layout and movement patterns of the monsters within. Combat is done in real-time and players can combo abilities similarly to games such as Divinity: Original Sin. Defeating monsters gives the player experience which can level them up. Once levelled up, they can purchase skills in a variety of skill trees. Each floor in a dungeon has a boss room where a harder enemy can be fought to move onto the next floor.",
    }
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-toggle="tooltip"]').tooltip({
        boundary: 'window'
    })
})

$(function () {
    for (var i = 0; i < $('.img-responsive').length / 2; i++) {
        $(".img-responsive:eq(" + i + ")").css({
            opacity: 0.0,
            visibility: "hidden"
        }).delay(500 * i).css({
            opacity: 0.0,
            visibility: "visible"
        }).animate({
            opacity: 1.0
        }, 1500);
        $(".img-responsive:eq(" + ($('.img-responsive').length - (i + 1)) + ")").delay(500 * i).css({
            opacity: 0.0,
            visibility: "visible"
        }).animate({
            opacity: 1.0
        }, 2000);
    }
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

    //history.pushState(null, 'modalOpened');

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
        
        carousel.style.marginRight = "0px";
        carousel.style.marginLeft = "0px";
    } else {
        carousel.style.marginRight = "";
        carousel.style.marginLeft = "";
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
    desc.innerHTML = projectInfo[name]["desc"];
}