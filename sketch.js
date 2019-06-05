let block1;
let m1;
let block2;
let count;
let hasStarted;
let digits = 1;
let cnv;
const timeStepsArray = [1, 10, 40, 100, 664, 7000, 67000, 700000, 6750000];
let timeSteps;


function setup() {
    cnv = createCanvas(400, 400);
    //x, y, s, v, m
    const m1 = pow(100, digits - 1);
    block1 = new Block(300, 275, 50, -5, m1, 25);
    block2 = new Block(50, 300, 25, 0, 1, 0);

    //x, y, w, h
    wall = new Wall(-100, 0, 100, 400);

    count = 0;

    input = createSlider(1, 9, 1);
    input.position(60, 350);
    input.style('width', '80px');

    button = createButton('Start');
    button.position(input.x + input.width + 150, 350);
    button.mousePressed(start);

    hasStarted = false;
}

function start() {
    timeSteps = timeStepsArray[digits - 1];
    block1 = new Block(300, 275, 50, -5 / timeSteps, m1, 25);
    block2 = new Block(50, 300, 25, 0, 1, 0);

    //x, y, w, h
    wall = new Wall(-100, 0, 100, 400);

    count = 0;
    hasStarted = true;
}

function draw() {
    background(220);
    fill(255, 255, 255);
    digits = input.value();
    m1 = pow(100, digits - 1);
    if (hasStarted) {
        for (let i = 0; i < timeSteps; i++) {
            if (block1.collide(block2)) {
                newVelocity1 = (((block1.mass - block2.mass) / (block1.mass + block2.mass)) * block1.velocity) + ((2 * block2.mass) / (block1.mass + block2.mass) * block2.velocity);

                newVelocity2 = (((block2.mass - block1.mass) / (block2.mass + block1.mass)) * block2.velocity) + ((2 * block1.mass) / (block2.mass + block1.mass) * block1.velocity);

                block1.velocity = newVelocity1;
                block2.velocity = newVelocity2;

                count++;
            }

            if (block2.collide(wall)) {
                block2.velocity *= -1;
                count++;
            }
            block1.update();
            block2.update();
        }
    }


    rect(10, 330, 380, 60);
    block1.show();
    block2.show();
    wall.show();

    fill(0, 0, 0);
    text("Count: " + count, 10, 30);
    text("Digits", 20, 365, 350)
    text(digits, input.x + input.width + 20, 365, 350)
}
