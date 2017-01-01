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

// Allows missiles to be clicked
function mouseClicked(){
  for (var i = 0; i < missiles.length; i++){
  if(dist(mouseX, WINDOW_HEIGHT - mouseY, missiles[i].xsc, missiles[i].ysc) < 100 / SCALE){
      selected_missile = missiles[i];
    }
  }
}

// Allows changing the view of the canvas
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

// Contains all click functions
$(document).ready(function(){
  $('#launch').click(function(){
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

      $('.name').val(generateID());
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

function swap(id){
  for(var i = 0; i < missiles.length; i++){
    if(missiles[i] == id){
      selected_missile = missiles[i];
      return;
    }
  }
}

function generateID(){
  var highest = -1;
  for (var i = 0; i < missiles.length; i++){
    if(!isNaN(missiles[i].id) && missiles[i].id > highest){
      highest = parseInt(missiles[i].id);
    }
  }
  return highest + 1;
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
