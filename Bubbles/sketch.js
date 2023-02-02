//Do not use wireless headphones when running this program

let mic
let canvas
let colors = ['#B8F6F8', '#C9F3D0', '#FAF4D5', '#FAE383', '#FADDD1', '#FABBB2','#F1F1F1'];
let linesColors=['#FAE383', '#B8E7E5'];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight-100);
  canvas.parent("sketch");
  strokeCap(SQUARE);
  rectMode(CORNER)
  mic=new p5.AudioIn();
  mic.start();
  addGUI();
  //frameRate(15);
}

function draw() {
  var vol=mic.getLevel();
  var vol_=map(vol,0,0.2,0,100);
  let col = color(random(colors));
  let lineColor=color(random(linesColors));
  console.log(vol_);
  let num=5;
  let num2=20;
  let lineX = randomGaussian(0.5, 0.18) * width;
  let lineY = randomGaussian(0.5, 0.18) * height;
  
    if(20<vol_&&vol<70){
      let linePosition=random(10,1000)*random(random());
      for (let i = 0; i < num; i++) {
      let d = map(i, 0, num, width * 1.5, 100) * random(random(random()));
    circles(random(-0.1, 1.1) * width, random(-0.1, 1.1) * height, d);
  }
          
      if(10<vol_&&vol<20){
        for (let x = 0; x < num2; x++) {
          stroke(lineColor);
          col.setAlpha(random(100, 255));
          line(lineX-linePosition,lineY,lineX+linePosition,lineY);
  }
}
        if(80<vol_){
        for (let x = 0; x < num2/2; x++) {
          col.setAlpha(random(100, 255));
          stroke(lineColor);      
          line(lineX,lineY+linePosition,lineX,lineY-linePosition);
    }
    }      
    }  
    if(frameCount %5== 0){
    //background(255);
      push();
      fill(255,245,244,150)
      rect(0,0,width,height);
      pop();
  }
  button.html("Start");
}

function circles(x, y, d) {
   let num = random(300,500);
	let col = color(random(colors));
	strokeWeight(d * 0.0015);
	for (let i = 0; i < num; i++) {
		let nm = norm(i, 0, num);
		let alph = lerp(255, 0, nm ** 0.5);
		let dd = lerp(d, d * 0.5, nm);
        col.setAlpha(alph);
        noFill();
        stroke(col);
        circle(x, y, dd);
    }
}


function addGUI(){

  //add a button
  button = createButton("Press to start");

  button.addClass("button");

  //Add the play button to the parent gui HTML element
  button.parent("gui");
  
  //Adding a mouse pressed event listener to the button 
  button.mousePressed(circles); 

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight-100);
}