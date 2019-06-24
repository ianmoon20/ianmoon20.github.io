var fireworks = []; //All fireworks on the canvas
var gravity;

//Sound effects
var flyingSound;
var fireworkExplosion;

//Called once preloading is done
function setup() 
{
	//Creating the canvas and setting it's dimensions to that of the window
	createCanvas(windowWidth, windowHeight);

	//The downward force acting on the projectiles which changes based on the height of the canvas
	gravity = createVector(0, height/4000);

	//Pushing the first firework to be spawned
	fireworks.push(new Firework(fireworkExplosion));

	firework = new Particle(200, 150);

	//Changing the alpha channel to Hue Saturation and Brightness
	colorMode(HSB);
}

function draw() 
{
	//Instruction Text
	noStroke();
  	fill(255);
  	textSize(height/20);
  	text("Click on the screen!", 0, height - (height/20));

  	//Changing back to RGB for the alpha channels
	colorMode(RGB);
	background(0, 0, 0, 25);
	for(var i = fireworks.length-1; i > 0; i--)
	{
		fireworks[i].update();
		fireworks[i].show();
		if(fireworks[i].done())
		{
			fireworks.splice(i,1);
		}
	}
}

//Resizing the window
function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
	//console.log(windowWidth + " " + windowHeight);
	gravity = createVector(0, height/4000);
}

function touchStarted()
{
	flyingSound.play();
	fireworks.push(new Firework(fireworkExplosion));
}

function preload()
{
	flyingSound = loadSound("sound/fireworkWhoosh.mp3");
	fireworkExplosion = loadSound("sound/fireworkExplosion.mp3");
}