M_EARTH = 5.972 * 10**24;
R_EARTH = 6.371 * 10**6;
G_CONSTANT = 6.674 * 10**-11;

function Gravity(altitude){
  return G_CONSTANT * M_EARTH / (R_EARTH + altitude)**2;
}

function angleToPoint(x1, y1, x2, y2){
  d = dist(x1, y1, x2, y2);
  dx = (x2-x1) / d;
  dy = (y2-y1) / d;

  a = Math.acos(dx) * 180/PI;
  if(dy < 0){
    a = 360 - a;
  }
  return a;
}

function unitConversion(meters){
  var base = Math.log10(meters);
  if(base < 3){
    return Math.round(meters) + 'm';
  } else if(base < 6){
    return Math.round(meters / 10**3) + 'km';
  } else {
    return Math.round(meters / 10**Math.floor(base)*100)/100 + ' * 10^' + (Math.floor(base)-3) + 'km';
  }
}

function speed(vx, vy){
  return Math.sqrt(vx**2 + vy**2);
}
