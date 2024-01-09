let uploadedImage;
let saturation;
let img;


var chain, dc, sc, doubleDC;
var puff, dcChCorner, shell;

var sliderStitch, sliderStitchY, sliderStitchOver;
var sliderRound, sliderRoundY, sliderRoundOver;
var sliderStart;
var nobSize;

var stitches = [];
var equivNum = []; //array equivalent number of stitches
var basicEquivNum = [];
var specialEquivNum = [];
var basicStitches = [];
var specialStitches = [];
var stitchNum;

var stitchNames = [];
var basicStitchesNames = [];
var specialStitchesNames = [];

var chainRound, patternRound;
var decoration, pattern;
var singleIncrease, doubleIncrease;

var randomize = false; //booleans that detect if the button is pressed
var checked = false;
var generate = false;
var randomFill = 255,  generateFill = 200, generateTextFill = 0, randomTextFill = 0;

var n = 6;
var initStitchNum;
var equivInitStitchNum;
var saveNum = 1;
var incCounter; // keeps track of the number of increase rounds
var incNum;
var stitchInd; //variable for the random stitch index
var stitchIndTwo;
var basicStitchInd;
var specialStitchInd;
var incChange;

var r = 250;

var font;

function preload() {
  chain = loadImage("stitches/chain.svg");
  dc = loadImage("stitches/dc.svg");
  sc = loadImage("stitches/sc.svg");
  doubleDC = loadImage("stitches/double_dc.svg");
  dcChCorner = loadImage("stitches/dc_ch_corner.svg");
  shell = loadImage("stitches/shell.svg");
  puff = loadImage("stitches/puff.svg");
  font = loadFont("Raleway-Light.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);  


  stitches[0] = chain;
  stitches[1] = sc;
  stitches[2] = dc;
  stitches[3] = doubleDC;
  stitches[4] = dcChCorner;
  stitches[5] = shell;
  stitches[6] = puff;
  
  basicStitches[0] = chain;
  basicStitches[1] = sc;
  basicStitches[2] = dc;
  basicStitches[3] = doubleDC;
  basicStitches[4] = puff;
  
  specialStitches[0] = dcChCorner;
  specialStitches[1] = shell;
  
  sliderStart = width-300;
  sliderEnd = width-20;
  sliderStitchY = height/8;
  sliderStitch = createVector(sliderStart+(280/2), sliderStitchY);
  sliderRoundY = height/4;
  sliderRound = createVector(sliderStart+(280/2), sliderRoundY);
  
  nobSize = 20;
  
  stitchNames = ["chain", "single crochet", "double crochet", "two double crochet", "dc chain corner", "shell", "puff"];
  equivNum = [1, 1, 1, 2, 2, 5, 1];
  basicEquivNum = [1, 1, 1, 2, 1];
  specialEquivNum = [2, 5];
  basicStitchesNames = ["chain", "single crochet", "double crochet", "two double crochet", "puff"];
  specialStitchesNames = ["dc chain corner", "shell"];
   
  imageMode(CENTER);
  noLoop();

   // Create a file input element
   let fileInput = createFileInput(handleFile);
   fileInput.position(60, height/2 - 60);
   fileInput.style('width', '200px');
   fileInput.style('height', '30px');
   fileInput.style('color', '#ffffff'); // Text color
   fileInput.style('background-color', '#cccccc'); // Background color
   fileInput.style('border', '2px solid #555555'); // Border style
   fileInput.style('border-radius', '5px'); // Border radius
}

function draw() {
  // clear();
  background(255);
  incCounter = 1;



  stroke(0);
  strokeWeight(1);

  rectMode(CENTER);
  fill(randomFill);
  rect(150, 125, 200, 50); //generate button


  noStroke();
  textAlign(CENTER);
  textSize(20);
  textFont(font);
  fill(randomTextFill);
  text("GENERATE", 150, 132); // buttons to control the output

  //slider
  stroke(0);
  line(sliderStart, sliderRoundY, sliderEnd, sliderRoundY);
  //noStroke();
  rect(sliderRound.x, sliderRound.y, nobSize, nobSize);

  textAlign(LEFT);
  textSize(20);
  n = int(map(sliderRound.x, sliderStart, sliderEnd, 3, 9));
  text("Number of rounds: " + n, sliderStart, sliderRoundY - 30);

  // making the crochet chart
  noFill();
  noStroke();
  let hueAnalysis = analyzeHSL(img);
  averageLightness = hueAnalysis.lightness.average;
  let mappedInitStitchNum = int(map(averageLightness, 0, 100, 7, 3));
  displayColorSquare(hueAnalysis.hue.average, hueAnalysis.saturation.average, hueAnalysis.lightness.average);
  push();
  translate(width / 2, height / 2);
  
  // let hueAnalysis = analyzeHSL(img);
  // averageLightness = hueAnalysis.lightness.average;
  // let mappedInitStitchNum = int(map(averageLightness, 0, 100, 7, 3));

  for (var i = 1; i <= n; i++) { // makes the rounds with invisible circles
    stitchInd = round(random(0, stitches.length - 1));
    basicStitchInd = round(random(0, basicStitches.length - 1));
    specialStitchInd = round(random(0, specialStitches.length - 1));
    incNum = i * mappedInitStitchNum; // incNum is the number of stitches in each round, increases each time

    if (randomize) {
      let hueAnalysis = analyzeHSL(img);
      averageSaturation = hueAnalysis.saturation.average;
  
      chainRound = new CrochetRound(basicStitches[basicStitchInd], specialStitches[specialStitchInd]);
      if (averageSaturation <= 50) {
          chainRound.repeatAround(incNum, i * r);
          console.log('repeat');
      }  else {
            chainRound.patternStitch(incNum, i * r);
            console.log('pattern');
      }
      pattern = "Round " + i + ": " + incNum + " " + stitchNames[stitchInd] + " stitches\n";
      fill(0);
      textAlign(LEFT);
      textSize(14);
      rectMode(CORNER);
      text(pattern, width / 4 + 10, -150 + i * 20, 600, 900);
      noFill();
    }

  
    rectMode(CENTER);

    incCounter++;
  }
  pop();
  fill(0);
  textAlign(LEFT);
  text("Upload an image to get ideas!\nPress Generate to get different designs\nTry images with different saturation and lightness.\nRefresh webpage before uploading new images.\nUse the sliders to change the number of rounds.\n - Press 'S' to save pattern.\n",50, height/2 - 250);
  text("Color suggestions:", 60, height-135);

}

// Callback function to handle the uploaded file
function handleFile(file) {
  
  if (file.type === 'image') {
    // Load the image and assign it to the uploadedImage variable
    uploadedImage = loadImage(file.data, (loadedImg) => {
      // Resize the image to fit within the canvas
      img = loadedImg;
      let aspectRatio = img.width / img.height;
      let maxDimension = min(width / 4, height / 4);
      if (img.width > img.height) {
        img.resize(maxDimension, maxDimension / aspectRatio);
      } else {
        img.resize(maxDimension * aspectRatio, maxDimension);
      }

      // Create an img element in the HTML body to display the image
      let imgElement = createImg(file.data, 'uploaded image', ''); // Updated line
      imgElement.size(uploadedImage.width, uploadedImage.height);
      imgElement.position(60, height / 2);
      
      let hueAnalysis = analyzeHSL(img);
      averageSaturation = hueAnalysis.saturation.average;
      displayColorSquare(hueAnalysis.hue.average, hueAnalysis.saturation.average, hueAnalysis.lightness.average);
      console.log('HSL Analysis:', hueAnalysis);
      
    });  
    
  } else {
    // If the file is not an image, show an error message
    console.error('Invalid file type. Please upload an image.');
  }

  
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h, s, l];
}

function analyzeHSL(img) {

  if (!img || !img.width || !img.height) {
    return {
      hue: { average: 0 },
      saturation: { average: 0 },
      lightness: { average: 0 }
    };
  }

  img.loadPixels();
  let totalPixels = img.pixels.length / 4; 
  let lightnessValues = [];
  let hueValues = [];
  let saturationValues = [];

  for (let i = 0; i < totalPixels; i++) {
    let pixelIndex = i * 4;
    let pixelR = img.pixels[pixelIndex];
    let pixelG = img.pixels[pixelIndex + 1];
    let pixelB = img.pixels[pixelIndex + 2];

    let hsl = rgbToHsl(pixelR, pixelG, pixelB);
    let pixelLightness = hsl[2] * 100; 
    let pixelHue = hsl[0] * 360;
    let pixelSaturation = hsl[1] * 100; 

    lightnessValues.push(pixelLightness);
    hueValues.push(pixelHue);
    saturationValues.push(pixelSaturation);
  }

  let averageHue = hueValues.reduce((acc, val) => acc + val, 0) / hueValues.length;
  let averageSaturation = saturationValues.reduce((acc, val) => acc + val, 0) / saturationValues.length;
  let averageLightness = lightnessValues.reduce((acc, val) => acc + val, 0) / lightnessValues.length;

  return {
    hue: { average: averageHue },
    saturation: { average: averageSaturation },
    lightness: { average: averageLightness }
  };
}

function displayColorSquare(hue, saturation, lightness) {
  // Convert HSL to HSB

  colorMode(HSB, 360, 100, 100);
  let hsbColor = color(hue, saturation, lightness);
  let hsbColor1 = color(hue+60, saturation+50, lightness+20);
  let hsbColor2 = color(hue-20, saturation+100, lightness+80);
  let hsbColor3 = color(hue+120, saturation, lightness+30);

  // Display color square
  fill(hsbColor);
  rect(320, height-80, 80, 80); // You can adjust the size of the square
  fill(hsbColor1);
  rect(240, height-80, 80, 80);
  fill(hsbColor2);
  rect(160, height-80, 80, 80);
  fill(hsbColor3);
  rect(80, height-80, 80, 80);
  // Reset color mode to default (RGB)
  colorMode(RGB, 255);
}

// Control functions
function mousePressed() {
  checkHover();
  vectorLimiter();
  
  if (mouseX > 50 && mouseX < 250 && mouseY > 100 && mouseY < 150) { // randomize
    randomize = true;
    randomFill = 0;
    randomTextFill = 255; 
    redraw();
  }  else if (mouseX > 50 && mouseX < 250 && mouseY > 375 && mouseY < 425) { // generate button
    redraw();
  }
}

function vectorLimiter() {
  // limiting sliders  
  if (sliderStitch.x < sliderStart) {
    sliderStitch.x = sliderStart;
  }
  if (sliderStitch.x > sliderEnd) {
    sliderStitch.x = sliderEnd;
  }
  if (sliderRound.x < sliderStart) {
    sliderRound.x = sliderStart;
  }
  if (sliderRound.x > sliderEnd) {
    sliderRound.x = sliderEnd;
  }
}

function mouseDragged() {
  if (sliderStitchOver) {
    sliderStitch.x = mouseX;
    vectorLimiter();
    redraw();
  }
  else if (sliderRoundOver) {
    sliderRound.x = mouseX;
    vectorLimiter();
    redraw();
  }
}

function checkHover() {
  if (mouseX > sliderStitch.x - nobSize &&
    mouseX < sliderStitch.x + nobSize &&
    mouseY > sliderStitch.y - nobSize &&
    mouseY < sliderStitch.y + nobSize) {
    sliderStitchOver = true;
  }
  else {
    sliderStitchOver = false;
  }
  if (mouseX > sliderRound.x - nobSize &&
    mouseX < sliderRound.x + nobSize &&
    mouseY > sliderRound.y - nobSize &&
    mouseY < sliderRound.y + nobSize) {
    sliderRoundOver = true;
  }
  else {
    sliderRoundOver = false;
  }
}

function keyTyped() {
  if (key === 's') {
      save("crochet chart-" + saveNum + ".png");
    println("save " + saveNum);
      saveNum++;
  }
}