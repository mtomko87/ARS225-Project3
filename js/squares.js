// constants
const FPS = 30;
const CELL_SIZE = 50;
const SPIN_SPEED = 0.1;
const COLOR_SPEED = 10;

// states
var squares = [];
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

    var x = Math.floor(e.x / CELL_SIZE);
    var y = Math.floor(e.y / CELL_SIZE);

    for (var i = 0; i < squares.length; i++) {
        if (squares[i].x == x && squares[i].y == y) return;
    }

    squares.push({x: x, y: y, a: 0, c: colorString});
}

// draw circles wherever the mouse moves
// =====================================

function loop() {

    incrementColor();

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    for (var i = 0; i < squares.length; i++) {
        var square = squares[i];
        if (square.a > Math.PI * 0.5) drawSquare(square.x, square.y, square.a, square.c);
        square.a += SPIN_SPEED;
        if (square.a > Math.PI * 1.5) {
            squares.splice(i, 1);
            i--;
        }
    }
}

// helper functions
// ================

function drawSquare(x, y, a, c) {
    
    // calculate the offset for this angle
    var rad2 = Math.sqrt(2);
    var diagonal = (CELL_SIZE * rad2) / 2;
    var offset = (diagonal - Math.cos(a) * diagonal) / rad2;

    var startX = x * CELL_SIZE;
    var startY = y * CELL_SIZE

    // draw the thing
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + offset, startY + CELL_SIZE - offset);
    ctx.lineTo(startX + CELL_SIZE, startY + CELL_SIZE);
    ctx.lineTo(startX + CELL_SIZE - offset, startY + offset);
    ctx.lineTo(startX, startY);
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