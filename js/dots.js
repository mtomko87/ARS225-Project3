// constants
const FPS = 30;
const DECAY = 0.5;
const CIRCLE_SIZE = 0.5;
const COLOR_SPEED = 10;

// states
var events = [];
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
    movement = Math.sqrt(e.movementX ** 2 + e.movementY ** 2) * CIRCLE_SIZE;
    events.push({x: e.x, y: e.y, r: movement, c: colorString});
}

// draw the items
// ==============

function loop() {

    incrementColor();

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    for (var i = 0; i < events.length; i++) {
        e = events[i];
        drawCircle(e.x, e.y, e.r, e.c);
        e.r -= DECAY;
        if (e.r <= 0) {
            events.splice(i, 1);
            i--;
        }
    }
}

// helper functions
// ================

function drawCircle(x, y, r, c) {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
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