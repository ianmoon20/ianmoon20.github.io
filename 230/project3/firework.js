function Firework(explosionSound)
{
	this.hu = random(255);
	this.firework = new Particle(mouseX, height, this.hu, true);
	this.exploded = false;
	this.particles = [];
	this.explosionSound = explosionSound;

	this.update = function()
	{
		if(!this.exploded)
		{
			this.firework.applyForce(gravity);
			this.firework.update();
			if(this.firework.vel.y >= 0)
			{
				this.exploded = true;
				this.explode();
			}
		}

		for(var i = this.particles.length-1; i >= 0; i--)
		{
			this.particles[i].applyForce(gravity);
			this.particles[i].update();
		}
	}

	this.explode = function()
	{
		explosionSound.play();
		
		for(var i = 0; i < 50; i++)
		{
			var p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false);
			this.particles.push(p);
		}
	}

	this.show = function()
	{
		if(!this.exploded)
		{
			this.firework.show();
		}

		for(var i = 0; i < this.particles.length; i++)
		{
			this.particles[i].show();
			if(this.particles[i].done())
			{
				this.particles.splice(i,1);
			}
		}
	}

	this.done = function()
	{
		if(this.exploded && this.particles.length == 0)
		{
			return true;
		}

		else
		{
			return false;
		}
	}
}