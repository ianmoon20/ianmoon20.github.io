function Particle(x,y, hu, firework)
{
	this.pos = createVector(x,y); //Keeping track of particle position
	this.firework = firework;
	this.lifespan = 255;
	this.hu = hu;

	if(this.firework)
	{
		this.vel = createVector(0,random(-height/50, -height/90)); //Velocity
	}
	else
	{
		this.vel = p5.Vector.random2D();
		this.vel.mult(random(width/300, width/1000));
	}

	this.acc = createVector(0,0); //Acceleration

	this.applyForce = function(force)
	{
		this.acc.add(force); //Adding the force to the acceleration
	}

	this.update = function()
	{
		if(!this.firework)
		{
			this.vel.mult(random(.95, .98));
			this.lifespan -= 3;
		}

		this.vel.add(this.acc); //Adding the acceleration to the velocity of the particle
		this.pos.add(this.vel); //Adding the velocity to the position
		this.acc.mult(0); //Clearing the acceleration
	}

	this.show = function()
	{
		colorMode(HSB);

		if(!this.firework)
		{
			strokeWeight(width/200);
			stroke(hu, 255, 255, this.lifespan);
		}
		else
		{
			strokeWeight(width/100);
			stroke(hu, 255, 255);
		}
		point(this.pos.x, this.pos.y);
	}

	this.done = function()
	{
		return this.lifespan < 0;
	}
}