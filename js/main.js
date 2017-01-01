
WINDOW_HEIGHT = 680;
CELL_SIZE = 40;
SCALE = 4;

DELTA_T = 1/60;

var missiles = [];

var start_x = 0; // in pixels
var start_y = 0;

var last_x;
var last_y;
var dragged_x;
var dragged_y;

var selected_missile;

function setup(){
  WINDOW_WIDTH = $('#simulation').width();
  var canvas = createCanvas(WINDOW_WIDTH+1, WINDOW_HEIGHT+1);
  canvas.parent('simulation');
  frameRate(1 / DELTA_T);

  fillValues();
}

function draw() {
  clear();
  // Check if mouse is pressed, don't update last_x and last_y
  if(!mouseIsPressed){
    last_x = mouseX;
    last_y = mouseY;
    dragged_x = 0;
    dragged_y = 0;
  }

  // Draws the square grid
  stroke('#2E426E');
  fill(255, 255, 255, 0);
  for(var x = 0; x < WINDOW_WIDTH/CELL_SIZE; x++){
    for(var y = 0; y < WINDOW_HEIGHT/CELL_SIZE; y++){
      rect(x*40,y*40, CELL_SIZE, CELL_SIZE);
    }
  }

  // Draws the y-axis
  stroke(0,0,0,0);
  fill('#334E87');

  if($('#yaxis').hasClass('btn-success')){
    for(var i = 0; i < WINDOW_HEIGHT/CELL_SIZE; i++){
      var meters = start_y * SCALE + (WINDOW_HEIGHT/CELL_SIZE - i) * CELL_SIZE * SCALE;
      text(unitConversion(meters), 5, i * CELL_SIZE + 15);
    }
  }

  // Draws the x-axis
  if($('#xaxis').hasClass('btn-success')){
    for(var i = 1; i < WINDOW_WIDTH/CELL_SIZE; i++){
      var meters = start_x * SCALE + i * CELL_SIZE * SCALE;
      text(unitConversion(meters), i * CELL_SIZE + 5, WINDOW_HEIGHT - 5);
    }
  }

  // Translates from y = -y
  translate(0, WINDOW_HEIGHT);

  // Draws lines of athmosphereric regions
  drawAthmosphere();

  // Updates missiles and draws them
  for(var i = 0; i < missiles.length; i++){
    if(missiles[i].health > 0 && $('#running').hasClass('btn-success')){
      missiles[i].update();

    }
    missiles[i].show();
  }

  updateMissileList();
}

function fillValues(){
  $('.launchangle').val(45);
  $('.fuel').val(200);
  $('.mass').val(900);
  $('.fueluse').val(10);
  $('.width').val(5);
  $('.length').val(90);
  $('.thrustangle').val(0);
  $('.name').val(0);
}
