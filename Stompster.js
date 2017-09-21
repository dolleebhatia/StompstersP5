
var hovering = false;


function Stompster(x,y,moodColor){
  this.pos =  createVector(x,y);
  this.vel =  p5.Vector.random2D();
  this.acc =  createVector();

  this.dancePeriod = (random(60,90));
  this.danceAmpX = (random(0,70));
  this.danceAmpY = (random(0,12));
  this.nextPeriod = this.dancePeriod;
  this.DancePeriod = 0;
  this.moodColor = moodColor;

  this.bodyOffsetX = random(-0.2, 0.2);
  this.bodyOffsetY = random(-0.2, 0.2);
  this.headHeight = random(12,30);
  this.headWidth = random(50,30);
  this.bodyWidth = random(30,80);
  this.bodyLength = random(60,40);
  this.feetSpacing = random(1,2.6);
  this.bodyDent = random(0,50);
  this.bodyTightness = random(-2.5,-1);
  this.eyeDistance = random(0.3,0.8) * this.headWidth/1.5;
  this.eyeRadius = random(9, this.eyeDistance);
  this.eyeShift = random(-2, this.headHeight * 0.6);
  this.pupilOffset = random(-this.eyeRadius * 0.6, this.eyeRadius * 0.6);
  this.pupilRadius = random(1.2, this.eyeRadius * 0.8);
  this.eyeType = floor (random(0,4));


  this.vecHead =  createVector (0, - this.headHeight - this.bodyLength);
  this.vecLeftEar =  createVector (-0.5 * this.headWidth,  - this.bodyLength);
  this.vecRightEar =  createVector (0.5 * this.headWidth,  - this.bodyLength);
  this.vecLeftFoot =  createVector(-0.5 * this.bodyWidth, 0);
  this.vecRightFoot =  createVector(0.5 * this.bodyWidth, 0);
  this.vecBottom =  createVector(0,0);
  this.vecEyeCenter =  createVector(0,0);

  this.base_vecHead = this.vecHead.copy();
  this.base_vecLeftEar = this.vecLeftEar.copy();
  this.base_vecRightEar = this.vecRightEar.copy();
  this.base_vecLeftFoot = this.vecLeftFoot.copy();
  this.base_vecRightFoot = this.vecRightFoot.copy();
  this.base_vecBottom = this.vecBottom.copy();
  this.base_vecEyeCenter = this.vecEyeCenter.copy();

 this.base_danceAmpX = this.danceAmpX;
 this.base_danceAmpY = this.danceAmpY;




this.show = function() {
  push();
   translate(this.pos.x + this.bodyOffsetX, this.pos.y + this.bodyOffsetY);
   //draw body
   stroke(40);
   colorMode(RGB);
   fill(this.moodColor);
   curveTightness(this.bodyTightness);
   beginShape();
   curveVertex(this.vecBottom.x,    this.vecBottom.y  );
   curveVertex(this.vecBottom.x - this.feetSpacing ,    this.vecBottom.y);
   curveVertex(this.vecLeftFoot.x,  this.vecLeftFoot.y);
   curveVertex(this.vecLeftEar.x,    this.vecLeftEar.y);
   curveVertex(this.vecHead.x,      this.vecHead.y);
   curveVertex(this.vecRightEar.x,  this.vecRightEar.y);
   curveVertex(this.vecRightFoot.x,  this.vecRightFoot.y);
   curveVertex(this.vecBottom.x  + this.feetSpacing,    this.vecBottom.y);
   curveVertex(this.vecBottom.x,    this.vecBottom.y );
   endShape(CLOSE);
   //draw eye
    translate(this.vecEyeCenter.x, this.vecEyeCenter.y);
    fill(255);
    ellipse(-0.5 * this.eyeDistance, - this.bodyLength - this.eyeShift, this.eyeRadius, this.eyeRadius);
    ellipse(0.5 * this.eyeDistance, - this.bodyLength - this.eyeShift, this.eyeRadius, this.eyeRadius);
    //  stroke(this.moodColor - 30);
    //noFill();

    //eyeballs
    switch (this.eyeType)
    {
      case 1:
        line(-0.5 * this.eyeDistance - this.eyeRadius * 0.5, - this.bodyLength - this.eyeShift + 2,  -0.5 * this.eyeDistance + this.eyeRadius * 0.5, - this.bodyLength - this.eyeShift - 2);
        line(0.5 * this.eyeDistance - this.eyeRadius * 0.5, - this.bodyLength - this.eyeShift - 2,  0.5 * this.eyeDistance + this.eyeRadius * 0.5, - this.bodyLength - this.eyeShift + 2);
        break;
      case 2:
        line(-0.5 * this.eyeDistance - this.eyeRadius * 0.5, - this.bodyLength - this.eyeShift - 2,  -0.5 * this.eyeDistance + this.eyeRadius * 0.5, - this.bodyLength - this.eyeShift + 2);
        line(0.5 * this.eyeDistance - this.eyeRadius * 0.5, - this.bodyLength - this.eyeShift + 2,  0.5 * this.eyeDistance + this.eyeRadius * 0.5, - this.bodyLength - this.eyeShift - 2);
        break;
      case 3:
        fill(20);
        noStroke();
        ellipse(-0.5 * this.eyeDistance + this.pupilOffset, - this.bodyLength - this.eyeShift, this.pupilRadius, this.pupilRadius);
        ellipse(0.5 * this.eyeDistance + this.pupilOffset, - this.bodyLength - this.eyeShift, this.pupilRadius, this.pupilRadius);
        break;
      case 4:
        fill(20);
        default:
        noStroke();
        ellipse(-0.5 * this.eyeDistance + this.pupilOffset, - this.bodyLength - this.eyeShift, this.pupilRadius, this.pupilRadius);
        ellipse(0.5 * this.eyeDistance + this.pupilOffset, - this.bodyLength - this.eyeShift, this.pupilRadius, this.pupilRadius);
        break;
      case 0:
        line(-0.5 * this.eyeDistance - this.eyeRadius * 0.6, - this.bodyLength - this.eyeShift,  -0.5 * this.eyeDistance + this.eyeRadius * 0.6, - this.bodyLength - this.eyeShift);
        line(0.5 * this.eyeDistance - this.eyeRadius * 0.6, - this.bodyLength - this.eyeShift,  0.5 * this.eyeDistance + this.eyeRadius * 0.6, - this.bodyLength - this.eyeShift);
        break;
    }
  pop();
    }

  this.hoverStatus = function(){

    if(abs(mouseX - this.pos.x) <= (width-300) / cols && (mouseY <= this.pos.y && mouseY >= this.pos.y - (height-300) / rows) ){
      hovering = true;
      this.moodColor = color(100,90);
     }
    else{
       hovering = false;
       this.moodColor= color(moodColor,255);
     }
  }

  this.update = function(){

   var step = frameCount % int(this.dancePeriod);
   var position = float(step) / this.dancePeriod;

   if (abs(position - 0.5) < 0.05 && (this.nextPeriod) != (this.dancePeriod)){
     this.dancePeriod = this.nextPeriod;
   }
  position = map(position,0,1,0,TWO_PI);
  this.danceOffset = createVector();
  this.danceOffset = (sin(position) * this.danceAmpX,  -1 * (sin(position) * this.danceAmpY));
  this.vecHead = p5.Vector.add(this.base_vecHead, this.danceOffset);
  this.vecLeftEar = p5.Vector.add(this.base_vecLeftEar,this.danceOffset);
  this.vecRightEar = p5.Vector.add(this.base_vecRightEar, this.danceOffset);
  //this.danceOffset.mult(2);
  this.vecEyeCenter = p5.Vector.add(this.base_vecEyeCenter, this.danceOffset*0.8);

  }
}
