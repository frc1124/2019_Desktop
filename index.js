//Key and Value data

var key = {
  battery: {
    name: "batteryStatus"
  },
  pressure: {
    name: "pressureStatus"
  }
};

var value = {
  battery: 12,
  pressure: true
};

//Network Table Methods

function leftEncoderData(){
  document.getElementById('codeStatus').innerHTML = NetworkTables.getValue('/dash/leftEncoderDistanceEntry');
  document.getElementById('codeStatus').style.backgroundColor = "yellow";
}

function rightEncoderData(){
  document.getElementById('codeStatus').innerHTML = NetworkTables.getValue('/dash/rightEncoderDistanceEntry');
  document.getElementById('codeStatus').style.backgroundColor = "yellow";
}

function robotConnction(){
  if(!NetworkTables.isRobotConnected()){document.getElementById("commsStatus").style.backgroundColor = "red";}
  else{document.getElementById("commsStatus").style.backgroundColor = "green";}
}

function batteryPower(value){
  document.getElementById("batteryStatus").innerHTML() = value;

  if(value >= 11){document.getElementById("batteryStatus").style.backgroundColor = "green";}
  else if(value >= 10){document.getElementById("batteryStatus").style.backgroundColor = "yellow";}
  else{document.getElementById("batteryStatus").style.backgroundColor = "red";}
}

function pressureStatus(){
  document.getElementById("pressureStatus").innerHTML() = value;

  if(value){document.getElementById("pressureStatus").style.backgroundColor = "green";}
  else{document.getElementById("pressureStatus").style.backgroundColor = "red";}
}

//Networktable Listeners
if(NetworkTables.isWsConnected()){
  NetworkTables.addRobotConnectionListener(robotConnction);
  NetworkTables.addKeyListener('/dash/leftEncoderDistanceEntry', leftEncoderData);
  NetworkTables.addKeyListener('/dash/rightEncoderDistanceEntry', rightEncoderData);
  NetworkTables.addKeyListener('/dash/batteryEntry', function(key, value, isNew){batteryPower();}, true);
  NetworkTables.addKeyListener('/dash/pressureEntry', function(key, value, isNew){pressureStatus();}, true);
}
//Targeting

const canvas = document.getElementById("targetImaging");
const ctx = canvas.getContext("2d");
var imageFront = document.getElementById("DriveFront");
var imageBack = document.getElementById("DriveBack");
var active = false;

function toggleTargeting(){
  if(!active){
    active = true;
    //document.getElementsById('HUDItem').sytle.backgroundColor = "white";
    displayTarget();
  }
  else{
    active = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function displayTarget(){
  var centerX = 50; //NetworkTables.getValue('/dash/targetCenterX', 240);
  var centerY = 50; //NetworkTables.getValue('/dash/targetCenterY', 240);

  ctx.beginPath();
  ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
  ctx.fill();
}
