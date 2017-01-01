
WINDOW_HEIGHT = 680;
CELL_SIZE = 40;
SCALE = 4;

DELTA_T = 1/60;

var missiles = [];
var img;

var start_x = 0; // in pixels
var start_y = 0;

var last_x;
var last_y;
var dragged_x;
var dragged_y;

var selected_missile;

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
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
    if(event.delta > 0){
      SCALE *= 2;
    } else {
      SCALE /= 2;
    }
  }
}

function mouseClicked(){
  for (var i = 0; i < missiles.length; i++){
  if(dist(mouseX, WINDOW_HEIGHT - mouseY, missiles[i].xsc, missiles[i].ysc) < 100 / SCALE){
      selected_missile = missiles[i];
    }
  }
}

function mouseDragged(){
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
    var diff_x = mouseX - last_x;
    var diff_y = mouseY - last_y;
    start_x -= diff_x - dragged_x;
    start_y += diff_y - dragged_y;
    dragged_x = diff_x;
    dragged_y = diff_y;
  }
}

function draw() {
  // Check if mouse is pressed, don't update last_x and last_y
  if(!mouseIsPressed){
    last_x = mouseX;
    last_y = mouseY;
    dragged_x = 0;
    dragged_y = 0;
  }


  stroke('#2E426E');
  fill('#2B3C63');
  for(var x = 0; x < WINDOW_WIDTH/CELL_SIZE; x++){
    for(var y = 0; y < WINDOW_HEIGHT/CELL_SIZE; y++){
      rect(x*40,y*40, CELL_SIZE, CELL_SIZE);
    }
  }

  stroke(0,0,0,0);
  fill('#334E87');

  if($('#yaxis').hasClass('btn-success')){
    for(var i = 0; i < WINDOW_HEIGHT/CELL_SIZE; i++){
      var meters = start_y * SCALE + (WINDOW_HEIGHT/CELL_SIZE - i) * CELL_SIZE * SCALE;
      text(unitConversion(meters), 5, i * CELL_SIZE + 15);
    }
  }

  if($('#xaxis').hasClass('btn-success')){
    for(var i = 1; i < WINDOW_WIDTH/CELL_SIZE; i++){
      var meters = start_x * SCALE + i * CELL_SIZE * SCALE;
      text(unitConversion(meters), i * CELL_SIZE + 5, WINDOW_HEIGHT - 5);
    }
  }

  translate(0, WINDOW_HEIGHT);
  drawAthmosphere();

  for(var i = 0; i < missiles.length; i++){
    if(missiles[i].health > 0 && $('#running').hasClass('btn-success')){
      missiles[i].update();

    }
    missiles[i].show();
  }

  updateMissileList();
}

function updateMissileList(){
  $('.missilelist').empty();

  if(missiles.length > 0){
    for(var i = 0; i < missiles.length; i++){
      if(selected_missile == null || missiles[i].id != selected_missile.id){
        $('.missilelist').append('<a onclick="swap('+ missiles[i].id + ')" class="milist list-group-item">Missile ' + missiles[i].id + '</a>');
      } else {
        $('.missilelist').append('<a class="milist list-group-item active">Missile ' + missiles[i].id + '</a>');

        var format = '<a class="milist liveinfo list-group-item">\
                        <div class="row">\
                          <div class="col-md-12">\
                            <div class="info-btn btn btn-primary">\
                              <div class="col-md-6">\
                                <span class="x">x: </span>\
                              </div>\
                              <div class="col-md-6">\
                                <span class="y">y: </span>\
                              </div>\
                            </div>\
                          </div>\
                        </div>\
                        <div class="row">\
                          <div class="col-md-12">\
                            <div class="info-btn btn btn-primary">\
                              <div class="col-md-6">\
                                <span class="vx">vx: </span>\
                              </div>\
                              <div class="col-md-6">\
                                <span class="vy">vy: </span>\
                              </div>\
                            </div>\
                          </div>\
                        </div>\
                        <div class="row">\
                          <div class="col-md-12">\
                            <div class="info-btn btn btn-primary">\
                              <div class="col-md-6">\
                                <span class="live_fuel">fuel: </span>\
                              </div>\
                              <div class="col-md-6">\
                                <span class="live_mass">mass: </span>\
                              </div>\
                            </div>\
                          </div>\
                        </div>\
                      </a>'
        $('.missilelist').append(format);
        $('.x').append(Math.round(missiles[i].x));
        $('.y').append(Math.round(missiles[i].y));
        $('.vx').append(Math.round(missiles[i].vx));
        $('.vy').append(Math.round(missiles[i].vy));
        $('.live_fuel').append(Math.round(missiles[i].fuel));
        $('.live_mass').append(Math.round(missiles[i].mass));

      }
    }
  } else {
    $('.missilelist').append('<a class="milist list-group-item active">No missiles</a>');
  }
}

function swap(id){
  console.log('clicked');
  for(var i = 0; i < missiles.length; i++){
    if(missiles[i] == id){
      selected_missile = missiles[i];
      return;
    }
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
  $('.name').val(0);
}

$(document).ready(function(){
  WINDOW_WIDTH = $('#simulation').width();
  $('#launch').click(function(){
    console.log($('.name').css('color'));
    if($('.name').css('color') == 'rgb(255, 255, 255)'){
      var name = $('.name').val();
      var angle = parseInt($('.launchangle').val());
      var fuel = parseInt($('.fuel').val());
      var mass = parseInt($('.mass').val());
      var fueluse = parseInt($('.fueluse').val());
      var width = parseInt($('.width').val());
      var length = parseInt($('.length').val());
      var thrustangle = parseInt($('.thrustangle').val());

      missiles.push(new Missile(name, angle, fuel, mass, fueluse, width, length, thrustangle));

      $('.name').css('color', 'red');
    }
  });

  $('.name').on('input', function(){
    $('.name').css('color', 'white');
    for (var i = 0; i < missiles.length; i++){
      if($('.name').val() == missiles[i].id){
        $('.name').css('color', 'red');
        return;
      }
    }
  });


  $('#showinfo').click(function(){
    $('#showinfo').toggleClass('btn-success btn-danger');
  });
  $('#running').click(function(){
    $('#running').toggleClass('btn-success btn-danger');
  });
  $('#xaxis').click(function(){
    $('#xaxis').toggleClass('btn-success btn-danger');
  });
  $('#yaxis').click(function(){
    $('#yaxis').toggleClass('btn-success btn-danger');
  });
  $('#removemis').click(function(){
    missiles = [];
  });
});
