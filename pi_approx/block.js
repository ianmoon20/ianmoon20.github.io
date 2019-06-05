class Block {
  constructor(x, y, w, v, m, xc) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.velocity = v;
    this.mass = m;
    this.xConstraint = xc;
  }
  
  collide(other) {
    return (this.x + this.width > other.x && this.x < other.x + other.width)
  }
  
  show() {
    textAlign(CENTER);
    fill(0,0,0);
    const x = constrain(this.x, this.xConstraint, width);
    text(this.mass, x + this.width/2, this.y - 10);
    fill(255,255,255);
    rect(x, this.y, this.width, this.width);
    textAlign(LEFT);
  }
  
  update() {
    this.x += this.velocity;
  }
}