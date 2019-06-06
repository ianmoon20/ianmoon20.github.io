let cnv;
let rangle;
let langle;


function setup() {
  cnv = createCanvas(800, 800);
  angle = PI/3;
  input = createInput();
  input.position(20, 65);

  button = createButton('save');
  button.position(input.x + input.width + 10, 65);
  button.mousePressed(saveDrawing);
  stslider = createSlider(50,500, 100, 1);
  rslider = createSlider(0,TWO_PI, PI/6, 0.01);
  lslider = createSlider(0, TWO_PI, PI/6, 0.01);
  rlenSlider = createSlider(0,.8, .7, 0.01);
  llenSlider = createSlider(0,.8, .7, 0.01);
  lenSlider = createSlider(2,8, 4, 1);
}

function draw() {
  background(51);
  rangle = rslider.value();
  langle = lslider.value();
  translate(cnv.width/2,height);
  branch(stslider.value());
}

function saveDrawing() {
  console.log(input.value().length);
  if(input.value().length != 0) {
    save(input.value() + ".png");
  } else {
    alert("Save Filename empty.");
  }
}

function branch(len) {
  stroke(600/len,400/len,500/len);
  strokeWeight(len/10);
  line(0,0,0,-len);
  translate(0,-len);
  if(len > lenSlider.value()) {
    push();
    rotate(rangle);
    branch(len * rlenSlider.value());
    pop();
    push();
    rotate(-langle);
    branch(len * llenSlider.value());
    pop();
  }
}