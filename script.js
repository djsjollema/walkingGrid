var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var player;
var map = [];

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.buttons = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        addEventListener('keydown', (evt) => {
            switch (evt.keyCode) {
                case 37: this.buttons.left = true; break;
                case 38: this.buttons.up = true; break;
                case 39: this.buttons.right = true; break;
                case 40: this.buttons.down = true; break;
            }
        });
        addEventListener('keyup', (evt) => {
            switch (evt.keyCode) {
                case 37: this.buttons.left = false; break;
                case 38: this.buttons.up = false; break;
                case 39: this.buttons.right = false; break;
                case 40: this.buttons.down = false; break;
            }
        });
    }
    update() {
        var speed = 0.1;
        if (!this.buttons.left || !this.buttons.right) {
            if (this.buttons.left) {
                this.x -= speed;
            } else if (this.buttons.right) {
                this.x += speed;
            }
        }
        
        if (!this.buttons.up || !this.buttons.down) {
            if (this.buttons.up) {
                this.y -= speed;
            } else if (this.buttons.down) {
                this.y += speed;
            }
        }
        this.x = clamp(this.x, 0, 8 * 100 - 1);
        this.y = clamp(this.y, 0, 8 * 100 - 1);
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = "#000000";
        context.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
    }
}

class Bit {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.state = false;
    }

    draw(context) {
        context.beginPath();
        if (this.state) {
            context.fillStyle = "#ff0000";
        } else {
            context.fillStyle = "#00ff00";
        }
        context.rect(this.x, this.y, 100, 100);
        context.stroke();
        context.fill();
        context.closePath();
    }
}

function init() {
    for (i = 0; i < 64; i++) {
        var numOnRow = 8;
        var bitWidth = 100;
        var x = (i % numOnRow) * bitWidth;
        var y = Math.floor(i / numOnRow) * bitWidth;
        var bit = new Bit(x, y);
        map.push(bit);
    }
    player = new Player(150, 150);
    player.draw(context);
    setInterval(animate,17)
}

function animate(){
  context.clearRect(0,0,800,800);
  for (var i = 0; i < map.length; i++) {
    if(i == findGrid(player.x,player.y)){
      map[i].state = true
    } else {
      map[i].state = false;
    }
    player.update();

    map[i].draw(context);
    player.draw(context)
  }
}

init();

function findGrid(x,y){
  return Math.floor(y/100)*8 + Math.floor(x/100);
}

function clamp(x,min,max){
    return (x < min ? min : (x > max ? max : x));
}
