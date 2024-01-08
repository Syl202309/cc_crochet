function CrochetRound(basicStitch, specialStitch) {
  
  this.basic = basicStitch;
  this.special = specialStitch;
 
  
  // need the shape you're repeating and the number of times you repeat it, and the radius of the round
  this.repeatAround = function(num, radius) {
    for (var j = 0; j < num; j++) {
      push();
      var ang = j*TWO_PI/num;
      rotate(ang);
      scale(0.15);
      image(this.basic,0,-radius);
      pop();
    }
  }
  
  // the pattern stitch works!! This is for two stitch patterns. Need to use those class variables correctly. 
  this.patternStitch = function(num, radius) { // prep for having a sequence of stitches on a round
    for (var j = 0; j < num; j++) {
      var ang = j*(TWO_PI/num);
      if (j%2 == 1) {
        push();
        rotate(ang);
        scale(0.15);
        image(this.basic, 0, -radius);
        pop();
      }
      else {
        push();
        rotate(ang);
        scale(0.15);
        image(this.special, 0, -radius);
        pop();
      }
    }
  }
  
  this.increaseRound = function(num, radius, rounds) { // (number of stitches in each round, radius of round, number of rounds)
    if (incCounter == 1) {
      for (var j = 0; j < num; j++) {
        var ang = j*(TWO_PI/num);
        push();
    	rotate(ang);
    	scale(0.15);
    	image(this.basic, 0, -radius);
    	pop();
      }
    }
    
    else if (incCounter == 2) {
      for (var j = 0; j < num/2; j++) {
        var ang = j*(TWO_PI/(num/2));
        push();
        rotate(ang);
        scale(0.15);
        image(this.special, 0, -radius);
        pop();
      }
    }
    else {
      for (var j = 0; j < num-initStitchNum; j++) {
        var ang = j*(TWO_PI/(num-initStitchNum));
        if (j%(incCounter-1) != 0) {
          push();
    	  rotate(ang);
    	  scale(0.15);
    	  image(this.basic, 0, -radius);
    	  pop();
        }
        else {
          push();
    	  rotate(ang);
    	  scale(0.15);
    	  image(this.special, 0, -radius);
    	  pop();
        }
      }
    }
  }
}