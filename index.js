//Key data

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

function encoderData(){
  document.getElementById('codeStatus').innerHTML = NetworkTables.getValue('/dash/leftEncoderDistanceEntry');
  document.getElementById('codeStatus').style.backgroundColor = "yellow";
}

function robotConnction(){
  if(!NetworkTables.isRobotConnected()){document.getElementById("commsStatus").style.backgroundColor = "red";}
  else{document.getElementById("commsStatus").style.backgroundColor = "green";}
}

//Targeting

var canvas = document.getElementById("targetImaging");
var ctx = canvas.getContext("2d");
var image = document.getElementById("camFeed");
var active = false;

function toggleTargeting(){
  if(!active){
    active = true;
    activateTargeting()
  }
  else{
    active = false;
    deactivateTargeting()
  }
}

function activateTargeting(){
  document.getElementById('targetImaging').style.opacity = 0.5;
  displayTarget();
}

function deactivateTargeting(){
  canvas.style.opacity = 0;
}

function displayTarget(){
  
}

//Networktable Listeners

NetworkTables.addKeyListener('/dash/batteryEntry', function(key, value, isNew){
  
  document.getElementById("batteryStatus").innerHTML() = value;

  if(value >= 11){document.getElementById("batteryStatus").style.backgroundColor = "green";}
  else if(value >= 10){document.getElementById("batteryStatus").style.backgroundColor = "yellow";}
  else{document.getElementById("batteryStatus").style.backgroundColor = "red";}

}, true);

NetworkTables.addKeyListener('/dash/pressureEntry', function(key, value, isNew){
  
  document.getElementById("pressureStatus").innerHTML() = value;

  if(value){document.getElementById("pressureStatus").style.backgroundColor = "green";}
  else{document.getElementById("pressureStatus").style.backgroundColor = "red";}

}, true);

NetworkTables.addRobotConnectionListener(robotConnction);
NetworkTables.addKeyListener('/dash/leftEncoderDistanceEntry', encoderData);