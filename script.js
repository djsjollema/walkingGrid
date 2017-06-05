var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var player;
var plane = [];

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        addEventListener('keydown', (evt) => {
          console.log(evt.keyCode)
            switch (evt.keyCode) {
                case 37:
                    this.x -= 2;
                    break;
                case 38:
                    this.y -= 2;
                    break;
                case 39:
                    this.x += 2;
                    break;
                case 40:
                    this.y += 2;
                    break;
            }
        })
    }
    update() {

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
        context.fillStyle = this.state ? "#ff0000" : "#00ff00";
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
        plane.push(bit);
    }
    player = new Player(150, 150);
    player.draw(context);
    setInterval(animate,100)
}

function animate(){
  context.clearRect(0,0,800,800);
  plane.map((tile, idx) => {
    tile.state = idx == findGrid(player.x,player.y)
    tile.draw(context);
    player.draw(context)  
  })
}

init();

function findGrid(x,y){
  return Math.floor(y/100)*8 + Math.floor(x/100);
}
