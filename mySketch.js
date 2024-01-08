let uploadedImage;

var chain, dc, sc, doubleDC;
var puff, dcCorner, shell, picot, dcChainCorner;

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
var normal = true;
var checked = false;
var helper = false;
//var generate = false;
var randomFill = 255, normalFill = 0, generateFill = 200, generateTextFill = 0, randomTextFill = 0, normalTextFill = 255;

var n = 6;
var initStitchNum = 6;
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

var crochetEx;

function preload() {
  chain = loadImage("stitches/chain.svg");
  dc = loadImage("stitches/dc.svg");
  sc = loadImage("stitches/sc.svg");
  doubleDC = loadImage("stitches/double_dc.svg");
  dcChainCorner = loadImage("stitches/dc_3ch_corner.svg");
  dcCorner = loadImage("stitches/dc_ch_corner.svg");
  shell = loadImage("stitches/shell.svg");
  picot = loadImage("stitches/picot.svg");
  puff = loadImage("stitches/puff.svg");
  
 // crochetEx = loadImage("crochet-01.png");
  font = loadFont("Raleway-Light.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);  


  stitches[0] = chain;
  stitches[1] = sc;
  stitches[2] = dc;
  stitches[3] = doubleDC;
  stitches[4] = dcCorner;
  stitches[5] = dcChainCorner;
  stitches[6] = shell;
  stitches[7] = picot;
  stitches[8] = puff;
  
  basicStitches[0] = chain;
  basicStitches[1] = sc;
  basicStitches[2] = dc;
  basicStitches[3] = doubleDC;
  basicStitches[4] = puff;
  
  specialStitches[0] = dcCorner;
  specialStitches[1] = dcChainCorner;
  specialStitches[2] = shell;
  specialStitches[3] = picot;
  
  sliderStart = width-300;
  sliderEnd = width-20;
  sliderStitchY = height/8;
  sliderStitch = createVector(sliderStart+(280/2), sliderStitchY);
  sliderRoundY = height/4;
  sliderRound = createVector(sliderStart+(280/2), sliderRoundY);
  
  nobSize = 20;
  
  stitchNames = ["chain", "single crochet", "double crochet", "two double crochet", "dc chain shell",
"three chain dc shell", "shell", "picot", "puff"];
  equivNum = [1, 1, 1, 2, 2, 2, 5, 1, 1];
  basicEquivNum = [1, 1, 1, 2, 1];
  specialEquivNum = [2, 2, 5, 1];
  basicStitchesNames = ["chain", "single crochet", "double crochet", "two double crochet", "puff"];
  specialStitchesNames = ["dc chain shell", "three chain dc shell", "shell", "picot"];
   
  imageMode(CENTER);
  noLoop();

   // Create a file input element
   let fileInput = createFileInput(handleFile);
   fileInput.position(width -200, height - 200);
}

function draw() {
  clear();
  background(255);
  incCounter = 1;



  stroke(0);
  strokeWeight(1);

  rectMode(CENTER);
  fill(randomFill);
  rect(150, 125, 200, 50); //random and normal buttons
  fill(normalFill);
  rect(150, 200, 200, 50);
  fill(generateFill); // generate button
  rect(150, 400, 200, 50);

  if (normal) {
    fill(255);
    rect(62.5, 250, 25, 25);
    if (checked) {
      fill(0);
      rect(62.5, 250, 15, 15);
    }
  }

  noStroke();
  textAlign(CENTER);
  textSize(20);
  textFont(font);
  fill(randomTextFill);
  text("RANDOMIZE", 150, 132); // buttons to control the output
  fill(normalTextFill);
  text("NORMAL", 150, 207);
  fill(generateTextFill);
  text("GENERATE", 150, 407);



  if (normal) {
    fill(0);
    text("Decoration Round", 165, 257.5);
  }

  ellipseMode(CENTER); // helper icon
  noFill();
  stroke(0);
  ellipse(62.5, 7 * height / 8, 30, 30);
  noStroke();
  fill(0);
  text("?", 62.5, 7 * height / 8 + 7);

  //helper text
  if (helper) {
    fill(0);
    textAlign(LEFT);
    textSize(14);
    rectMode(CORNER);
    text("GENERATE - Generate pattern.\nUse the sliders to change the number of rounds and stitches.\n\"S\" - save pattern (prompts download).\nRANDOM - generates random stitches for each round.\nNORMAL - follows normal increasing rounds.\nDecoration Round - adds special stitch to the last round of a normal pattern.", 90, 640, width / 2, 570);
    rectMode(CENTER);
  }

  //slider
  stroke(0);
  line(sliderStart, sliderStitchY, sliderEnd, sliderStitchY);
  line(sliderStart, sliderRoundY, sliderEnd, sliderRoundY);
  noStroke();
  rect(sliderStitch.x, sliderStitch.y, nobSize, nobSize);
  rect(sliderRound.x, sliderRound.y, nobSize, nobSize);

  textAlign(LEFT);
  textSize(20);
  initStitchNum = int(map(sliderStitch.x, sliderStart, sliderEnd, 4, 8));
  n = int(map(sliderRound.x, sliderStart, sliderEnd, 3, 10));
  text("Number of stitches: " + initStitchNum, sliderStart - 10, sliderStitchY - 20);
  text("Number of rounds: " + n, sliderStart - 10, sliderRoundY - 20);

  // making the crochet chart
  noFill();
  noStroke();
  push();
  translate(width / 2, height / 2);

  for (var i = 1; i <= n; i++) { // makes the rounds with invisible circles
    stitchInd = round(random(0, stitches.length - 1));
    stitchIndTwo = round(random(0, stitches.length - 1));
    basicStitchInd = round(random(0, basicStitches.length - 1));
    specialStitchInd = round(random(0, specialStitches.length - 1));
    incNum = i * initStitchNum; // incNum is the number of stitches in each round, increases each time (5, 10, 15, etc)

    stitchNum = incNum * equivNum[stitchInd];

    if (i == 1) {
      equivInitStitchNum = initStitchNum;
      incChange = equivNum[stitchInd] * equivInitStitchNum;
    } else {
      equivInitStitchNum = incChange;
      incChange = incChange * equivNum[stitchInd];
    }

    if (normal && !checked) {
      doubleIncrease = new CrochetRound(basicStitches[2], basicStitches[3]);
      doubleIncrease.increaseRound(incNum, i * r, n);
    } else if (normal && checked) {
      doubleIncrease = new CrochetRound(basicStitches[2], basicStitches[3]);
      doubleIncrease.increaseRound(incNum, i * r, n);
      if (i == n) {
        decoration = new CrochetRound(specialStitches[specialStitchInd], specialStitches[specialStitchInd]);
        decoration.repeatAround(incNum, (i + 1) * r, n);
      }
    } else if (randomize) {
      chainRound = new CrochetRound(stitches[stitchInd], stitches[stitchIndTwo]);
      chainRound.repeatAround(incNum, i * r);
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


  if (uploadedImage) {
  
    image(uploadedImage, width / 2 - uploadedImage.width / 2, height / 2 - uploadedImage.height / 2);
  }

}




//Callback function to handle the uploaded file
// function handleFile(file) {
//   if (file.type === 'image') {
//     // Load the image and assign it to the uploadedImage variable
//     uploadedImage = loadImage(file.data, (img) => {
//       // Resize the image to fit within the canvas
//       let aspectRatio = img.width / img.height;
//       let maxDimension = min(width/4, height/4);
//       if (img.width > img.height) {
//         img.resize(maxDimension, maxDimension / aspectRatio);
//       } else {
//         img.resize(maxDimension * aspectRatio, maxDimension);
//       }

//       // Create an img element in the HTML body to display the image
//       let imgElement = createImg(file.data);
//       imgElement.size(uploadedImage.width, uploadedImage.height);
//       imgElement.position(width - uploadedImage.width / 2 -200 , height / 2 - uploadedImage.height / 2);
//     });
//   } else {
//     // If the file is not an image, show an error message
//     console.error('Invalid file type. Please upload an image.');
//   }
// }

// Callback function to handle the uploaded file
// Callback function to handle the uploaded file
function handleFile(file) {
  if (file.type === 'image') {
    // Load the image and assign it to the uploadedImage variable
    uploadedImage = loadImage(file.data, (img) => {
      // Resize the image to fit within the canvas
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
      imgElement.position(width - uploadedImage.width / 2 - 200, height / 2 - uploadedImage.height / 2);

      // Count color density after displaying the image
      let colorDensity = countColorDensityByRanges(img);
      console.log('Color Density:', colorDensity);
    });
  } else {
    // If the file is not an image, show an error message
    console.error('Invalid file type. Please upload an image.');
  }
}

function countColorDensityByRanges(img) {
  img.loadPixels();
  let totalPixels = img.pixels.length / 4; // 4 values per pixel (R, G, B, A)

  let redRange = { min: 100, max: 255 }; // Example red range
  let greenRange = { min: 0, max: 150 };  // Example green range
  let blueRange = { min: 0, max: 150 };   // Example blue range

  let countRed = 0;
  let countGreen = 0;
  let countBlue = 0;

  for (let i = 0; i < totalPixels; i++) {
    let pixelIndex = i * 4;
    let pixelR = img.pixels[pixelIndex];
    let pixelG = img.pixels[pixelIndex + 1];
    let pixelB = img.pixels[pixelIndex + 2];

    // Check if the pixel color is within the defined ranges
    if (pixelR >= redRange.min && pixelR <= redRange.max) {
      countRed++;
    }

    if (pixelG >= greenRange.min && pixelG <= greenRange.max) {
      countGreen++;
    }

    if (pixelB >= blueRange.min && pixelB <= blueRange.max) {
      countBlue++;
    }
  }

  return { countRed, countGreen, countBlue };
}






// Control functions
function mousePressed() {
  checkHover();
  vectorLimiter();
  
  if (mouseX > 50 && mouseX < 250 && mouseY > 100 && mouseY < 150) { // randomize
    randomize = true;
    normal = false;
    randomFill = 0;
    randomTextFill = 255; 
    normalFill = 255;
    normalTextFill = 0;
    redraw();
  }
  else if (mouseX > 50 && mouseX < 250 && mouseY > 175 && mouseY < 225) { // normal
    randomize = false;
    normal = true;
    randomFill = 255;
    randomTextFill = 0; 
    normalFill = 0;
    normalTextFill = 255;
    redraw();
  }
  else if (mouseX > 55 && mouseX < 70 && mouseY > 242.5 && mouseY < 257.5) { // normal decoration
    if(checked) {
      checked = false;
      redraw();
    }
    else {
      checked = true;
      redraw();
    }
  }
  //    rect(150, 400, 200, 50);
  else if (mouseX > 50 && mouseX < 250 && mouseY > 375 && mouseY < 425) { // generate button
    redraw();
  }

  
  var d = dist(mouseX, mouseY, 62.5, 7*height/8);
  if (d < 15 && !helper) {
    helper = true;
    redraw();
  }
  else if (d < 15 && helper) {
    helper = false;
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