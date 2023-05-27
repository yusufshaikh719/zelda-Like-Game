// var positionY = window.scrollY + document.querySelector('#Link-pixel-frontwalk-swayright-noweapons').getBoundingClientRect().top;
// var positionX = window.scrollX + document.querySelector('#Link-pixel-frontwalk-swayright-noweapons').getBoundingClientRect().left;

// document.onkeydown = (e) => {
//     e = e || window.event;
//     if (e.key === "ArrowUp") {
//         console.log("up arrow pressed");
//     } else if (e.key === "ArrowDown") {
//         console.log("down arrow pressed");
//     } else if (e.key === "ArrowLeft") {
//         console.log("left arrow pressed");
//     } else if (e.key === "ArrowRight") {
//         console.log("right arrow pressed");
//         document.getElementById('Link-pixel-frontwalk-swayright-noweapons').style.left = "150px";
//     }
// };
// console.log("Y: " + window.scrollY + document.querySelector('#Link-pixel-frontwalk-swayright-noweapons').getBoundingClientRect().top);
// console.log("X: " + window.scrollX + document.querySelector('#Link-pixel-frontwalk-swayright-noweapons').getBoundingClientRect().left);

/*  
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/
var character = document.querySelector(".character");
var map = document.querySelector(".map");

//start in the middle of the map
var x = 90;
var y = 34;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame

const placeCharacter = () => {

    var pixelSize = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
    );

    const held_direction = held_directions[0];
    if (held_direction) {
        if (held_direction === directions.right) { x += speed; }
        if (held_direction === directions.left) { x -= speed; }
        if (held_direction === directions.down) { y += speed; }
        if (held_direction === directions.up) { y -= speed; }
        character.setAttribute("facing", held_direction);
    }
    character.setAttribute("walking", held_direction ? "true" : "false");

    //Limits (gives the illusion of walls)
    var leftLimit = -8;
    var rightLimit = (16 * 11) + 8;
    var topLimit = -8 + 32;
    var bottomLimit = (16 * 7);
    if (x < leftLimit) { x = leftLimit; }
    if (x > rightLimit) { x = rightLimit; }
    if (y < topLimit) { y = topLimit; }
    if (y > bottomLimit) { y = bottomLimit; }


    var camera_left = pixelSize * 66;
    var camera_top = pixelSize * 42;

    map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${-y * pixelSize + camera_top}px, 0 )`;
    character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize}px, 0 )`;
}


//Set up the game loop
const step = () => {
    placeCharacter();
    window.requestAnimationFrame(() => {
        step();
    })
}
step(); //kick off the first step!



/* Direction key state */
const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
}
const keys = {
    38: directions.up,
    37: directions.left,
    39: directions.right,
    40: directions.down,
}
document.addEventListener("keydown", (e) => {
    var dir = keys[e.which];
    if (dir && held_directions.indexOf(dir) === -1) {
        held_directions.unshift(dir)
    }
})

document.addEventListener("keyup", (e) => {
    var dir = keys[e.which];
    var index = held_directions.indexOf(dir);
    if (index > -1) {
        held_directions.splice(index, 1)
    }
});



/* BONUS! Dpad functionality for mouse and touch */
var isPressed = false;
const removePressedAll = () => {
    document.querySelectorAll(".dpad-button").forEach(d => {
        d.classList.remove("pressed")
    })
}
document.body.addEventListener("mousedown", () => {
    console.log('mouse is down')
    isPressed = true;
})
document.body.addEventListener("mouseup", () => {
    console.log('mouse is up')
    isPressed = false;
    held_directions = [];
    removePressedAll();
})
const handleDpadPress = (direction, click) => {
    if (click) {
        isPressed = true;
    }
    held_directions = (isPressed) ? [direction] : []

    if (isPressed) {
        removePressedAll();
        document.querySelector(".dpad-" + direction).classList.add("pressed");
    }
}
