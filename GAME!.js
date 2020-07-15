let canvas;
let context;
let width;
let height;
let score = 0;
let floor = 424;
let interval_id;
let someValue = 25;
let gravity = 1.5;
let img_mario = document.getElementById("mario");
let obstacle = document.getElementById("obstacle");
let shell = document.getElementById("shell")
let spike = document.getElementById("spike");
let enemies = [obstacle, shell, spike]

window.onload=function(){
  document.getElementById("my_sounds").play();
}

let player = {
    x : 200,
    y : floor - 300, // the plaer will start off falling from the sky
    size : 75,
    jumping: false,
    y_velocity: 0
};

let enemy = {
    x : 900, // the large inital distance between the player and enemy allows for the elastic bands to wind up
    y : floor -45,
    size: 75,
    xVelocity : -10,
    yChange: 0,
    crashAvailable: true
};

let moveUp = false

document.addEventListener('DOMContentLoaded', init, false);

function init() {
    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    window.setInterval(draw, 33);
}

function draw() {
    context.clearRect(0, 0, width, height);
    context.drawImage(obstacle, enemy.x, enemy.y, enemy.size, enemy.size)
    enemy.x += enemy.xVelocity;
    if (enemy.x < -enemy.size) {
        enemy.x = 540;
        score += 2;
        enemy.xVelocity -= 1.5;
        enemy.crashAvailable = true;
        obstacle = enemies[Math.floor(Math.random() * enemies.length)];
    }

    if (moveUp === true && player.jumping === false) {
        player.y_velocity -= 29;
        player.jumping = true;
      }

    if (player.x > enemy.x){
        enemy.crashAvailable = false;
    }

    player.y_velocity += gravity;
    player.y += player.y_velocity;
    player.y_velocity *= 0.9;

    if (player.y > floor) {

      player.jumping = false;
      player.y = floor;
      player.y_velocity = 0;

    }

    if (isCollide(enemy)) {
    stop();
      return;
    }

      context.drawImage(img_mario, player.x, player.y -45, player.size, player.size);
};

function stop() {
    clearInterval(interval_id);
    window.removeEventListener("keydown", activate);
    window.removeEventListener("keyup", deactivate);
    enemy.xVelocity = 0;
    context.font = "30px Arial";
    context.fillText("YOU JUST MAMA'D YOUR LAST MIA!", 10, 70);
    context.fillText("YOUR SCORE IS " + score, 155, 120);
}

function activate(event) {
  let keyCode = event.keyCode;
  if (keyCode === 32 || keyCode === 38 || 74){ // space bar, up arrow and j will make player jump
    moveUp = true;
  }
}

function deactivate(event) {
  let keyCode = event.keyCode;
  if (keyCode === 32 || keyCode === 38 || 74){
    moveUp = false;
  }
}

function isCollide(enemy) {
      if(player.x + someValue > enemy.x && player.x +someValue < enemy.x + enemy.size &&
          player.y + 10 > enemy.y && enemy.crashAvailable == true){
          return true;
       }
      else {
        return false;
    }
}
