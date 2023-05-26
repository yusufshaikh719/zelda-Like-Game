var positionY = window.scrollY + document.querySelector('#Link-pixel-frontwalk-swayright-noweapons').getBoundingClientRect().top;
var positionX = window.scrollX + document.querySelector('#Link-pixel-frontwalk-swayright-noweapons').getBoundingClientRect().left;

document.onkeydown = (e) => {
    e = e || window.event;
    if (e.key === "ArrowUp") {
        console.log("up arrow pressed");
    } else if (e.key === "ArrowDown") {
        console.log("down arrow pressed");
    } else if (e.key === "ArrowLeft") {
        console.log("left arrow pressed");
    } else if (e.key === "ArrowRight") {
        console.log("right arrow pressed");
        document.getElementById('Link-pixel-frontwalk-swayright-noweapons').style.left = "150px";
    }
};
console.log("Y: " + window.scrollY + document.querySelector('#Link-pixel-frontwalk-swayright-noweapons').getBoundingClientRect().top);
console.log("X: " + window.scrollX + document.querySelector('#Link-pixel-frontwalk-swayright-noweapons').getBoundingClientRect().left);