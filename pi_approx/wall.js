class Wall {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }
  
  show() {
    rect(this.x, this.y, this.width, this.height);
  }
}