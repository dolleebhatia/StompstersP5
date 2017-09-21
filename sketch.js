var Monster1;
var monsters = [];
var moodColor;

var rows = 5;
var cols = 6;

function setup() {
  createCanvas( windowWidth-10, windowHeight-10);
  frameCount = (30);
  background(240);
  for (var i = 0; i<cols; i++){
    for (var j = 0; j<rows; j++){
      var x = (j+0.5) * (width-300) / (cols-1)*1.6;
      var y = (i+1) * (height-300) / (rows-1)*1.3;
      colorMode(RGB);
       moodColor = color (random(0,255), random(0,255), 255);
      monsters.push(new Stompster(x, y, moodColor));
    }
  }
  Monster1 = new Stompster(200,200,moodColor);

}

function draw(){
  background(240);
  smooth();
  for(var i=0; i < monsters.length; i++){
      monsters[i].show();
      monsters[i].update();
      monsters[i].hoverStatus();

      }
  //  Monster1.show();
}
