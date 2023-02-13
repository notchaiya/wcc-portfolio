
var img;
let cells = 10;
let song;

//Load the image
function preload() {
  img = loadImage('water.jpeg');
  song=loadSound('N11.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES)
  textSize(width / 3);
  textAlign(CENTER, CENTER);
  // Resize the image to fit the canvas
  img.resize(width, height);
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(canvasPressed);
  // Disable the stroke
  noStroke();
  amplitude = new p5.Amplitude();
}

function draw() {

   let level = amplitude.getLevel();
   cells = map(level, 0,1, 5, 100);
  if (level>0.055) {
    colorMode(HSB,150);
  } else {
     //colorMode(RGB);
    colorMode(HSB, 230);
  }
   centerChange=map(level, 0,1, -3, 3);

  // Loop through the pixels X and Y
  for (let y = 0; y < img.height; y += cells) {
    for (let x = 0; x < img.width; x += cells) {
      // Get the color at (x, y)
      fill(img.get(x, y),20);
      
      // Draw a rectangle at (x, y) and the size of a cell
      if (0.055<level<0.07) {
        
      rect(x+centerChange,y+centerChange, cells*0.3, cells*10);
       
    } 
      if (0.07<level<0.1) {
    
     rect(x+centerChange,y+centerChange, cells*10, cells*0.3);
    } else{
      ellipse(x,y,cells,cells);
    }      
      // push();
      // //background(255);
      // let textPosition=map(level, 0,1, 2,5);
      // fill(img.get(x, y),20);
      // textSize(24);
      // text('light', textPosition*random(2,300), textPosition*random(2,300));
      // frameRate(3);
      // pop();
    }   
    }
}


  function canvasPressed() {
  // playing a sound file on a user gesture
  // is equivalent to `userStartAudio()`
  song.play();
}