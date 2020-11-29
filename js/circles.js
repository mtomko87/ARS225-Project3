// constants
const FPS = 30;
const NUM_CIRCLES = 100;
const MIN_RAD = 30;
const MAX_RAD = 300;
const MIN_RATIO = 0.1;
const MAX_DIST = 500;

// states
var circles = [];
var mousePos = {x: 0, y: 0};

// initialize everything
// =====================

function setup() {

    // set up canvas
    canv = document.getElementById("canvas");
    ctx = canv.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // make circles
    for (var i = 0; i < NUM_CIRCLES; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var r = Math.random() * (MAX_RAD - MIN_RAD) + MIN_RAD;
        var c = getRandomColor();
        circles.push({x: x, y: y, rad: r, color: c})
    }

    // set up functions to run
    setInterval(loop, 1000 / FPS);
    window.addEventListener('mousemove', e => mousemove(e))
}

// track mouse position
// ====================

function mousemove(e) {
    mousePos = {x: e.x, y: e.y};
}

// draw the items
// ==============

function loop() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    for (var i = 0; i < circles.length; i++) {
        circle = circles[i];
        dist = Math.sqrt((mousePos.x - circle.x) ** 2 + (mousePos.y - circle.y) ** 2);
        ratio = (MAX_DIST - dist) / MAX_DIST;
        ratio = Math.max(ratio, MIN_RATIO);
        drawCircle(circle.x, circle.y, circle.rad * ratio, circle.color);
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

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }