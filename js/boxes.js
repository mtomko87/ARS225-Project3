// constants
const FPS = 30;
const GRAVITY = 1;
const BOX_SIZE = 3;
const GROUND_TIME = 30;
const COLOR_SPEED = 10;
const BOX_FREQ = 5;

// states
var boxes = [];
var boxFreq = 0;
var color = 0;
var colorString = "";

// initialize everything
// =====================

function setup() {

    // set up canvas
    canv = document.getElementById("canvas");
    ctx = canv.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // set up functions to run
    setInterval(loop, 1000 / FPS);
    window.addEventListener('mousemove', e => mousemove(e))
}

// track mouse movement
// ====================

function mousemove(e) {

    boxFreq++;
    if (boxFreq != BOX_FREQ) return;
    boxFreq = 0;

    size = Math.abs(e.movementX) * BOX_SIZE;
    boxes.push({
        x: e.x - size / 2,
        y: -size,
        vel: 0,
        size: size,
        grounded: false,
        groundedDuration: 0,
        c: colorString
    });
}

// draw the items
// ==============

function loop() {

    incrementColor();

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    for (var i = 0; i < boxes.length; i++) {

        box = boxes[i];
        drawSquare(box.x, box.y, box.size, box.c);
        
        if (box.grounded) {
            box.groundedDuration++;
            if (box.groundedDuration > GROUND_TIME) {
                boxes.splice(i, 1);
                i--;
            }
        }

        else {
            box.y += box.vel;
            box.vel += GRAVITY;
            var maxY = canvas.height - box.size;
            if (box.y > maxY) {
                box.y = maxY;
                box.grounded = true;
            }
        }
    }
}

// helper functions
// ================

function drawSquare(x, y, size, c) {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, size, size);
}

function incrementColor() {

    color += COLOR_SPEED;
    color %= 1536;

    var r;
    var g;
    var b;

    if (color < 256) {
        r = 255;
        g = color % 256;
        b = 0;
    }

    else if (color < 512) {
        r = 256 - color % 256;
        g = 255;
        b = 0;
    }

    else if (color < 768) {
        r = 0;
        g = 255;
        b = color % 256;
    }

    else if (color < 1024) {
        r = 0;
        g = 256 - color % 256;
        b = 255;
    }

    else if (color < 1280) {
        r = color % 256;
        g = 0;
        b = 255;
    }

    else {
        r = 255
        g = 0;
        b = 256 - color % 256;
    }

    colorString = colorFromNumbers(r, g, b);
}

function colorFromNumbers(r, b, g) {

    var letters = '0123456789ABCDEF';
    var c = '#';

    c += letters[Math.floor(r / 16)];
    c += letters[r % 16];
    c += letters[Math.floor(g / 16)];
    c += letters[g % 16];
    c += letters[Math.floor(b / 16)];
    c += letters[b % 16];

    return c;
}