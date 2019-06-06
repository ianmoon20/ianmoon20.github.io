let cnv;

let rangle;
let langle;

let stSlider;
let rightSlider;
let leftSlider;
let rlenSlider;
let llenSlider;

let rSlider;
let gSlider;
let bSlider;

let lenLabel;
let angLabel;
let colLabel;

let middleCheckbox;
let leftCheckbox;
let rightCheckbox;

function setup() {
    cnv = createCanvas(windowWidth, windowHeight * .8);
    angle = PI / 3;
    input = createInput();
    input.position(20, 65);

    button = createButton('save');
    button.position(input.x + input.width + 10, 65);
    button.mousePressed(saveDrawing);
    mlenSlider = createSlider(.5, .7, .5, 0.01);
    rlenSlider = createSlider(.5, .7, .5, 0.01);
    llenSlider = createSlider(.5, .7, .5, 0.01);

    rightSlider = createSlider(PI / 16, PI, PI / 6, 0.01);
    leftSlider = createSlider(PI / 16, PI, PI / 6, 0.01);

    rSlider = createSlider(0, 255, 255, 1);
    gSlider = createSlider(0, 255, 255, 1);
    bSlider = createSlider(0, 255, 255, 1);

    middleCheckbox = createCheckbox('middle', false);

    mlenSlider.position(windowWidth * .1, windowHeight * .85);
    rlenSlider.position(windowWidth * .1, windowHeight * .90);
    llenSlider.position(windowWidth * .1, windowHeight * .95);

    rightSlider.position(windowWidth * .45, windowHeight * .85);
    leftSlider.position(windowWidth * .45, windowHeight * .90);
    middleCheckbox.position(windowWidth * .45, windowHeight * .95)

    rSlider.position(windowWidth * .8, windowHeight * .85);
    gSlider.position(windowWidth * .8, windowHeight * .90);
    bSlider.position(windowWidth * .8, windowHeight * .95);

    mlenSlider.style("width", '9em');
    rlenSlider.style("width", '9em');
    llenSlider.style("width", '9em');

    rightSlider.style("width", '9em');
    leftSlider.style("width", '9em');

    rSlider.style("width", '9em');
    gSlider.style("width", '9em');
    bSlider.style("width", '9em');

    lenLabel = createDiv('Lengths (Middle/Right/Left)');
    lenLabel.position(windowWidth * .1, windowHeight * .80);

    angLabel = createDiv('Angles (Right/Left)');
    angLabel.position(windowWidth * .45, windowHeight * .80);

    colLabel = createDiv('Colors (R/G/B)');
    colLabel.position(windowWidth * .8, windowHeight * .80);
}

function checkboxChanged() {

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight * .8);

    mlenSlider.position(windowWidth * .1, windowHeight * .85);
    rlenSlider.position(windowWidth * .1, windowHeight * .90);
    llenSlider.position(windowWidth * .1, windowHeight * .95);

    rightSlider.position(windowWidth * .45, windowHeight * .85);
    leftSlider.position(windowWidth * .45, windowHeight * .90);

    middleCheckbox.position(windowWidth * .45, windowHeight * .95)

    rSlider.position(windowWidth * .8, windowHeight * .85);
    gSlider.position(windowWidth * .8, windowHeight * .90);
    bSlider.position(windowWidth * .8, windowHeight * .95);

    lenLabel.position(windowWidth * .1, windowHeight * .80);
    angLabel.position(windowWidth * .45, windowHeight * .80);
    colLabel.position(windowWidth * .8, windowHeight * .80);
}

function draw() {
    background(160, 160, 200);
    rangle = rightSlider.value();
    langle = leftSlider.value();
    translate(cnv.width / 2, height);
    branch(200);
}

function saveDrawing() {
    console.log(input.value().length);
    if (input.value().length != 0) {
        saveCanvas(input.value(), "png");
    } else {
        alert("Filename input is empty. Please enter a name next to the save button.");
    }
}

function branch(len) {
    push();
    stroke(rSlider.value() / (len / 200), gSlider.value() / (len / 200), bSlider.value() / (len / 200));
    strokeWeight(len / 10);
    line(0, 0, 0, -len);
    translate(0, -len);
    if (len > 4) {
        if (middleCheckbox.checked()) {
            branch(len * mlenSlider.value());
        }
        push();
        rotate(rangle);
        branch(len * rlenSlider.value());
        pop();
        push();
        rotate(-langle);
        branch(len * llenSlider.value());
        pop();
    }

    pop();
}
