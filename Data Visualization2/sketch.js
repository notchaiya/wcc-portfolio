// Inspired from https://youtu.be/ZI1dmHv3MeM

var perlin;
var mycircle;
var perlinR, circleR, deltaX, deltaY, angle;
var x1, y1, x2, y2;
var loopR, loopAngle;
var steps;
var iteration;
var fontSize;
var textOfAirQuality;
var frequency;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
    noStroke();
    perlin = new Array(130);
    mycircle = new Array(perlin.length);
    angle = TWO_PI / perlin.length;
    perlinR = 0.4;
    circleR = width / 3;
    steps = 300;
    loopR = 0.4;
    deltaX = loopR;
    deltaY = loopR;
    loopAngle = TWO_PI / steps;
    iteration = 0;
    fontSize=29;
  
    fetch('https://api.openaq.org/v2/measurements?location_id=275642&parameter=um100&parameter=pm25&parameter=um025&parameter=pm1&parameter=pm10&parameter=um010&date_from=2023-02-10T00:00:00Z&date_to=2023-02-11T00:00:00Z&limit=1000')
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      airInTokyo = data.results[4];
      console.log(airInTokyo);
      
      airValue=airInTokyo.value;
      //console.log(fillColor);
      if(airValue<=50){
        textOfAirQuality="Good air quality today :)"
        console.log(textOfAirQuality);
        fillColor="#68B984";
        frequency=1.3;
        
      }else if(51<airValue<100){
        textOfAirQuality="Air quality is average today :)";
        console.log(textOfAirQuality);
        fillColor="#FED049";
        frequency=2.0;
        
      }if(101<airValue){
        textOfAirQuality="The air is polluted O_O";
        console.log(textOfAirQuality);
        fillColor="#E95212";
        frequency=5.65;
    }
    });
}



function draw() {
  
//text1
    fill(255);
    textSize(fontSize);
    textAlign(LEFT);
    text("Location: "+airInTokyo.location.toString(),50, 30, 500)
    text("Value: "+airValue ,50, 70, 300);
    text("Date: "+airInTokyo.date.local,50, height-80, width);
//text2
    fill(fillColor);
    textAlign(LEFT);
    text(textOfAirQuality,width-370, height-80, 500);
    push();
    stroke(255,255,255,30);
    strokeWeight(3);
    line(width-80,50,width-80,height*0.7);
    line(70,250,70,height*0.8);
    pop();
  
//background
    fill(0, 0, 0,30);
    rect(0, 0, windowWidth, windowHeight);

    
    updatePerlin();
    translate(width / 2, height / 2);
    beginShape();
    for (var i = 0; i < perlin.length; i++) {
        var x = perlin[i] * cos(angle * i) * circleR+frequency;
        var y = perlin[i] * sin(angle * i) * circleR;
        fill(fillColor);
        circle[i] = new createVector(x, y);
        curveVertex(x, y);
    }
    endShape();
    scale(0.3);
    iteration++;
    
}


function updatePerlin() {
    deltaX = loopR * cos(loopAngle * iteration);
    deltaY = loopR * sin(loopAngle * iteration);
    for (var i = 0; i < perlin.length; i++) {
        var x = frequency*(perlinR * cos(angle * i));
        var y = frequency*(perlinR * sin(angle * i));
        perlin[i] = noise(x + deltaX + loopR * 2, y + deltaY + loopR * 2);
    }
}

