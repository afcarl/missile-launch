WINDOW_WIDTH = 1280;
WINDOW_HEIGHT = 720;
CELL_SIZE = 40;
SCALE = 4;

DELTA_T = 1/60;

var missiles = [];
var img;
var idcounter = 0;

function preload(){
  img = loadImage("assets/missile.png");
}

function setup(){
  var canvas = createCanvas(WINDOW_WIDTH+1, WINDOW_HEIGHT+1);
  canvas.parent('simulation');
  frameRate(1 / DELTA_T);

  fillValues();
}

// Function to zoom in and out of the simulation
function mouseWheel(event){
  if(event.delta > 0){
    SCALE *= 2;
  } else {
    SCALE /= 2;
  }
}

function draw() {

  stroke(224, 224, 224);
  fill(255);
  for(var x = 0; x < WINDOW_WIDTH/CELL_SIZE; x++){
    for(var y = 0; y < WINDOW_HEIGHT/CELL_SIZE; y++){
      rect(x*40,y*40, CELL_SIZE, CELL_SIZE);
    }
  }

  stroke(0,0,0,0);
  fill(224, 224, 224);
  for(var i = 0; i < WINDOW_HEIGHT/CELL_SIZE; i++){
    var meters = (WINDOW_HEIGHT/CELL_SIZE - i) * CELL_SIZE * SCALE;
    text(unitConversion(meters), 5, i * CELL_SIZE + 15);
  }

  for(var i = 0; i < WINDOW_WIDTH/CELL_SIZE; i++){
    var meters = i * CELL_SIZE * SCALE;
    text(unitConversion(meters), i * CELL_SIZE + 5, 715);
  }



  translate(0, WINDOW_HEIGHT);
  drawAthmosphere();

  for(var i = 0; i < missiles.length; i++){
    if(missiles[i].health > 0 && $('#running').hasClass('btn-success')){
      missiles[i].update();

    }
    missiles[i].show();
  }
}

function fillValues(){
  $('.launchangle').val(45);
  $('.fuel').val(200);
  $('.mass').val(900);
  $('.fueluse').val(10);
  $('.width').val(5);
  $('.length').val(90);
  $('.thrustangle').val(0);
}

$(document).ready(function(){
  $('#launch').click(function(){
    var angle = parseInt($('.launchangle').val());
    var fuel = parseInt($('.fuel').val());
    var mass = parseInt($('.mass').val());
    var fueluse = parseInt($('.fueluse').val());
    var width = parseInt($('.width').val());
    var length = parseInt($('.length').val());
    var thrustangle = parseInt($('.thrustangle').val());
    missiles.push(new Missile(idcounter, angle, fuel, mass, fueluse, width, length, thrustangle));
    idcounter++;
  });
  $('#showinfo').click(function(){
    $('#showinfo').toggleClass('btn-success btn-danger');
  })
  $('#running').click(function(){
    $('#running').toggleClass('btn-success btn-danger');
  })
});
