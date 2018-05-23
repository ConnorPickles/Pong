var targetCoord = 0;
var diffNum = 350; // 350, 375, 400, 425
var movingUp = true;
var movingLeft = false;
var moving = true;
var leftUp = false;
var leftDown = false;
var rightUp = false;
var rightDown = false;
var extreme = false;
var gamemode = "";

// moves the ball to a random location on the left
function initLeft () {
  document.getElementById("ball").style.left = "50px"; // 22, 559
  document.getElementById("ball").style.top = (parseInt(Math.random() * 408) + 12) + "px";
  movingLeft = false;
  if (extreme == true) {
	diffNum = 350;
  } // if
} // initLeft

// moves the ball to a random location on the right
function initRight () {
  document.getElementById("ball").style.left = "550px";
  document.getElementById("ball").style.top = (parseInt(Math.random() * 408) + 12) + "px";
  movingLeft = true;
  if (extreme == true) {
	diffNum = 350;  
  } // if
} // initRight

// mouse controls
document.onmousemove = function movePlayer (e) {
  if (gamemode == "") {
	var y = e.pageY;
    var x = e.pageX;
    var current = "";
  
    if (x < 300) {
      current = "player";
    } else {
      if (gamemode == "multi") {
	    current = "computer";
  	  } else {
  	    current = "player";
  	  } // else
	} // else
  
    document.getElementById(current).style.top = (y - 50) + "px";
  
    if (parseInt(document.getElementById(current).style.top) < 20) {
      document.getElementById(current).style.top = "20px";
    } else if (parseInt(document.getElementById(current).style.top) > 347) {
      document.getElementById(current).style.top = "347px";
    } // if
  } // if
} // movePlayer

// keyboard controls - keydown
window.addEventListener('keydown', function (e) {
  if (document.getElementById("game").className == "visible") {
	if (gamemode == "solo") {
      switch (e.keyCode) {
	    case 38: // up arrow
	      leftUp = true;
		  break;
	    case 40: // down arrow
	      leftDown = true;
		  break;
	  } // switch
	} else if (gamemode == "multi") {
	  switch (e.keyCode) {
	    case 87: // w
	      leftUp = true;
		  break;
	    case 83: // s
	      leftDown = true;
	      break;
	    case 38: // up arrow
	      rightUp = true;
		  break;
	    case 40: // down arrow
	      rightDown = true;
		  break;
	  } // switch
	} // else if
  } // if
}, false);

// keyboard controls - keyup
window.addEventListener('keyup', function (e) {
  if (document.getElementById("game").className == "visible") {
	if (gamemode == "solo") {
      switch (e.keyCode) {
	    case 38: // up arrow
	      leftUp = false;
		  break;
	    case 40: // down arrow
	      leftDown = false;
		  break;
	  } // switch
	} else if (gamemode == "multi") {
	  switch (e.keyCode) {
	    case 87: // w
	      leftUp = false;
		  break;
	    case 83: // s
	      leftDown = false;
		  break;
	    case 38: // up arrow
	      rightUp = false;
		  break;
	    case 40: // down arrow
	      rightDown = false;
		  break;
	  } // switch
	} // else if
  } // if
}, false);

// moves the ball horizontally
function moveHor () {
  var block = document.getElementById("ball");
  
  if (movingLeft == false) {
	block.style.left = (parseInt(block.style.left) + 1) + "px";
	if (parseInt(block.style.left) == 559) {
	  checkCompCon();
	} // if
  } else {
    block.style.left = (parseInt(block.style.left) - 1) + "px";
	if (parseInt(block.style.left) == 22) {
	  checkPlayCon();
	} // if
  } // else
} // moveHor

// moves the ball vertically
function moveVer () {
  var block = document.getElementById("ball");
  
  if (movingUp == false) {
	block.style.top = (parseInt(block.style.top) + 1) + "px";
	if (parseInt(block.style.top) == 420) {
	  movingUp = true;
	} // if
  } else {
    block.style.top = (parseInt(block.style.top) - 1) + "px";
	if (parseInt(block.style.top) == 12) {
	  movingUp = false;
	} // if
  } // else
} // moveVer

// checks if the ball has hit the right paddle
function checkCompCon () {
  var ballCoord = parseInt(document.getElementById("ball").style.top);
  var compCoord = parseInt(document.getElementById("computer").style.top);
  if (ballCoord >= (compCoord - 30) && ballCoord <= (compCoord + 100)) {
    movingLeft = true;
	if (extreme == true) {
	  diffNum = 350;	
	} // if
  } else {
    goal("player");
  } // else
} // checkCompCon

// checks if the ball has hit the left paddle
function checkPlayCon () {
  var ballCoord = parseInt(document.getElementById("ball").style.top);
  var playCoord = parseInt(document.getElementById("player").style.top);
  
  if (ballCoord >= (playCoord - 30) && ballCoord <= (playCoord + 100)) {
    movingLeft = false;
	if (extreme == true && (parseInt(Math.random() * 100)) == 42) {
		diffNum = 375;
		// alert("Extreme Might Lose!");
	} // if
  } else {
    goal("computer");
  } // else
} // checkPlayCon

// scores a goal
function goal (side) {
  moving = false;

  if (side == "player") {
    document.getElementById("playScore").innerHTML = parseInt(document.getElementById("playScore").innerHTML) + 1;
    initLeft();
  } else {
    document.getElementById("compScore").innerHTML = parseInt(document.getElementById("compScore").innerHTML) + 1;
    initRight();
  } // else
  
  setTimeout(startMoving, 1000);
} // goal

// controls the computer
function ai () {
  var ball = document.getElementById("ball");
  var comp = document.getElementById("computer");
  
  // calculates where the ball is going to hit the right side
  if (parseInt(ball.style.left) == diffNum) {
    var currentCoord = parseInt(ball.style.top);
	var movingUpCopy = movingUp;
	targetCoord = currentCoord;
	
	for (i = 0; i < (587 - diffNum); i++) {
	  if (movingUpCopy == true) {
	    targetCoord--;
	  } else if (movingUpCopy == false) {
	    targetCoord++;
	  } // if
	  
	  if (targetCoord == 12) {
	    movingUpCopy = false;
	  } else if (targetCoord == 420) {
	    movingUpCopy = true;
	  } // if
	} // for
	
	targetCoord += 5;
	if (movingUpCopy == true) {
	  targetCoord += 40;
	} // if
  } // if
  
  // moves right paddle to target coordinates
  if (parseInt(ball.style.left) > diffNum && movingLeft == false) {
	 if ((parseInt(comp.style.top) + 50) > targetCoord) {
	   comp.style.top = (parseInt(comp.style.top) - 1) + "px";
	 } else if ((parseInt(comp.style.top) + 50) < targetCoord) {
	   comp.style.top = (parseInt(comp.style.top) + 1) + "px";
	 } // if
	 
	 if (parseInt(comp.style.top) < 20) {
	   comp.style.top = "20px";
	 } else if (parseInt(comp.style.top) > 347) {
	   comp.style.top = "347px";
	 } // if
  } // if
} // ai

// moves both paddles based on keyboard input
function keyMove () {
  var left = parseInt(document.getElementById("player").style.top);
  var right = parseInt(document.getElementById("computer").style.top);
  
  if (leftUp == true) {
    left--;
  } else if (leftDown == true) {
    left++;
  } // else if

  if (rightUp == true) {
    right--;
  } else if (rightDown == true) {
    right++;
  } // if
  
  if (left < 20) {
    left = 20;
  } else if (left > 347) {
    left = 347;
  } // if
  
  if (right < 20) {
    right = 20;
  } else if (right > 347) {
    right = 347;
  } // if
  
  document.getElementById("player").style.top = left + "px";
  document.getElementById("computer").style.top = right + "px";
} // keyMove

// returns gamemode
function getMode (mode) {
  gamemode = mode;
} // getMode

// gets diffNum and starts game
function getDiff (x) {
  diffNum = x;
  if (diffNum == 350) {
	extreme = true;
  } // if
  start();
} // getDiff

// sets moving to true
function startMoving () {
  moving = true;
} // stopMoving

// moves horizontally and vertically
function move () {
  if (moving == true) {
    moveHor();
    moveVer();
  } // if
} // move

// sets up game and begins all looping methods
function start () {
  initLeft();
  setInterval(move, 1);
  document.getElementById("player").style.left = "20px";
  document.getElementById("player").style.top = "175px";
  document.getElementById("computer").style.left = "587px";
  document.getElementById("computer").style.top = "175px";
  if (gamemode == "solo") {
    setInterval(ai, 1);
	setInterval(keyMove, 1);
  } else {
    setInterval(keyMove, 1);
  } // else
} // start

// changes visibility
function changeVisibility (element) {
  var name = document.getElementById(element).className;
  
  if (name == "hidden") {
    document.getElementById(element).className = "visible";
  } else {
    document.getElementById(element).className = "hidden";
  } // else
} // changeVisibility

// changes two visibilities
function changeTwo (element1, element2) {
  changeVisibility(element1);
  changeVisibility(element2);
} // changeTwo