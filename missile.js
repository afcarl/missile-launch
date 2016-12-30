FORCE_KG = 40000;
FUEL_WEIGHT = 1; // ~1kg/l

function Missile(id, angle, fuel, mass, fueluse, width, length, thrustangle){
  this.id = id;
  this.x = 0;
  this.y = 0;
  this.area = 4;

  this.time = 0;

  this.width = width;
  this.length = length;

  this.thrust_angle = thrustangle; // relative to this.angle
  this.angle = angle;

  this.vx = 0;
  this.vy = 0;

  this.fuel = fuel;
  this.mass = mass; //including fuel

  this.fueluse = fueluse;

  this.health = 100;

  this.update = function(){
    if(this.fuel >= this.fueluse * DELTA_T){
      // Fuel is being used
      this.fuel -= this.fueluse * DELTA_T;
      this.mass -= this.fueluse * FUEL_WEIGHT * DELTA_T;

      var f_rocket_x = FORCE_KG * this.fueluse * Math.cos(radians(this.angle - this.thrust_angle));
      var f_rocket_y = FORCE_KG * this.fueluse * Math.sin(radians(this.angle - this.thrust_angle));
    } else {
      var f_rocket_x = 0;
      var f_rocket_y = 0;
    }

    var f_gravity = Gravity(this.y) * this.mass;

    var f_drag_communal = 1/2 * getAirDensity(this.y) * this.area * speed(this.vx, this.vy)**2 * 0.63;
    var f_drag_x = Math.cos(radians(this.angle)) * f_drag_communal;
    var f_drag_y = Math.sin(radians(this.angle)) * f_drag_communal;

    this.vx += ((f_rocket_x - f_drag_x) / this.mass) * DELTA_T;
    this.vy += ((f_rocket_y - f_drag_y - f_gravity) / this.mass) * DELTA_T;

    this.x += this.vx * DELTA_T;
    this.y += this.vy * DELTA_T;

    //console.log('Position x: ' + this.x + ' y:' + this.y);
    //console.log('Drags x: ' + f_drag_x + ' y: ' + f_drag_y, 'communal: ' + f_drag_communal);
    //console.log('Rocket x: ' + f_rocket_x + ' y: ' + f_rocket_y);
    //console.log('Speeds x: ' + Math.round(this.vx) + ' y: ' + Math.round(this.vy));
    //console.log('Acceleration x: ' + (f_rocket_x - f_drag_x) / this.mass + ' y: ' + (f_rocket_y - f_drag_y - f_gravity) / this.mass);
    //console.log('Angle : ' + Math.round(this.angle));
    this.angle = angleToPoint(this.x, this.y, this.x + this.vx, this.y + this.vy);
    if(this.y < 0){
      this.health = 0;
      console.log('Missile ' + this.id + ' crashed at ' + Math.round(this.time*100)/100 + 's!');
      console.log('Missile ' + this.id + ' last position: (' + Math.round(this.x) + ', 0)');

    }

    this.time += DELTA_T;
  }

  this.show = function(){
    this.xsc = (this.x ) / SCALE;
    this.ysc = this.y / SCALE;

    translate(this.xsc, -this.ysc);
    rotate(radians(90 - this.angle));

    fill(255);
    rectMode(CENTER);
    rect(this.width/2 / SCALE, this.length/2 / SCALE, this.width / SCALE, this.length / SCALE, 5 / SCALE, 5 / SCALE, 0, 0);
    rectMode(CORNER);

    rotate(-radians(90 - this.angle));
    translate(-this.xsc, this.ysc);

    this.updateInfo();
  }

  this.updateInfo = function(){
    if($('#showinfo').hasClass('btn-success')){
      fill(255);
      text("Missile " + this.id, this.xsc + 20, -this.ysc - 10);
      fill(0);
      text("x: " + Math.round(this.x) + ' y: ' + Math.round(this.y), this.xsc + 20, -this.ysc + 5);
      text("vx: " + Math.round(this.vx) + ' vy: ' + Math.round(this.vy), this.xsc + 20, -this.ysc + 20);
      text("fuel: " + Math.round(this.fuel) + ' mass: ' + Math.round(this.mass), this.xsc + 20, -this.ysc + 35);
    }
  }

}
