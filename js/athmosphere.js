// http://www.braeunig.us/space/atmmodel.htm
// http://www.braeunig.us/space/pdf/USSA1976.pdf

EARTH_RADIUS = 6536.766; //km

function getAirDensity(y){
  geopot = getGeoPotential(y / 1000);
  if(geopot <= 85){
    airpressure = getAirPressure(y);
    return airpressure / (287.05 * getTemperature(geopot));
  } else if(geopot <= 91){
    return Math.exp(0.000000 * geopot**4 + -3.322622E-06 * geopot**3 + 9.111460E-04 * geopot**2 + -0.2609971 * geopot + 5.944694);
  } else if(geopot <= 100){
    return Math.exp(0.000000 * geopot**4 + 2.873405E-05 * geopot**3 + -0.008492037 * geopot**2 + 0.6541179 * geopot + -23.62010);
  } else if(geopot <= 110){
    return Math.exp(-1.240774E-05 * geopot**4 + 0.005162063 * geopot**3 + -0.8048342 * geopot**2 + 55.55996 * geopot + -1443.338);
  } else if(geopot <= 120){
    return Math.exp(0.00000 * geopot**4 + -8.854164E-05 * geopot**3 + 0.03373254 * geopot**2 + -4.390837 * geopot + 176.5294);
  } else if(geopot <= 150){
    return Math.exp(3.661771E-07 * geopot**4 + -2.154344E-04 * geopot**3 + 0.04809214 * geopot**2 + -4.884744 * geopot + 172.3597);
  } else if(geopot <= 200){
    return Math.exp(1.906032E-08 * geopot**4 + -1.527799E-05 * geopot**3 + 0.004724294 * geopot**2 + -0.6992340 * geopot + 20.50921);
  } else if(geopot <= 300){
    return Math.exp(1.199282E-09 * geopot**4 + -1.451051E-06 * geopot**3 + 6.910474E-04 * geopot**2 + -0.1736220 * geopot + -5.321644);
  } else if(geopot <= 500){
    return Math.exp(1.140564E-10 * geopot**4 + -2.130756E-07 * geopot**3 + 1.570762E-04 * geopot**2 + -0.07029296 * geopot + -12.89844);
  } else if(geopot <= 750){
    return Math.exp(8.105631E-12 * geopot**4 + -2.358417E-09 * geopot**3 + -2.635110E-06 * geopot**2 + -0.01562608 * geopot + -20.02246);
  } else if(geopot <= 1000){
    return Math.exp(-3.701195E-12 * geopot**4 + -8.608611E-09 * geopot**3 + 5.118829E-05 * geopot**2 + -0.06600998 * geopot + -6.137674);
  }

}

function getAirPressure(y){
  y = y / 1000; // convert to km
  geopot = getGeoPotential(y);
  t = getTemperature(geopot);

  if (geopot <= 11){
    return  101325 * Math.pow(288.15 / t, -5.255877);
  } else if (geopot <= 20){
    return 22632.06 * Math.exp(-0.1577 * (geopot - 11));
  } else if (geopot <= 32){
    return 5474.889 * Math.pow(216.65 / t, 34.16319);
  } else if (geopot <= 47){
    return 868.0187 * Math.pow(228.65 / t, 12.2011);
  } else if (geopot <= 51){
    return 110.9063 * Math.exp(-0.1262 * (geopot - 47));
  } else if (geopot <= 71){
    return 66.93887 * Math.pow(270.65 / t, -12.2011);
  } else if (geopot <= 84.85){
    return 3.956420 * Math.pow(214.65 / t, -17.0816);
  } else if(geopot <= 91){
    return Math.exp(0.000000 * geopot**4 + 2.159582E-06 * geopot**3 + -4.836957E-04 * geopot**2 + -0.1425192 * geopot + 13.47530);
  } else if(geopot <= 100){
    return Math.exp(0.000000 * geopot**4 + 3.304895E-05 * geopot**3 + -0.009062730 * geopot**2 + 0.6516698 * geopot + -11.03037);
  } else if(geopot <= 110){
    return Math.exp(0.000000 * geopot**4 + 6.693926E-05 * geopot**3 + -0.01945388 * geopot**2 + 1.719080 * geopot + -47.75030);
  } else if(geopot <= 120){
    return Math.exp(0.000000 * geopot**4 + -6.539316E-05 * geopot**3 + 0.02485568 * geopot**2 + -3.223620 * geopot + 135.9355);
  } else if(geopot <= 150){
    return Math.exp(2.283506E-07 * geopot**4 + -1.343221E-04 * geopot**3 + 0.02999016 * geopot**2 + -3.055446 * geopot + 113.5764);
  } else if(geopot <= 200){
    return Math.exp(1.209434E-08 * geopot**4 + -9.692458E-06 * geopot**3 + 0.003002041 * geopot**2 + -0.4523015 * geopot + 19.19151);
  } else if(geopot <= 300){
    return Math.exp(8.113942E-10 * geopot**4 + -9.822568E-07 * geopot**3 + 4.687616E-04 * geopot**2 + -0.1231710 * geopot + 3.06740);
  } else if(geopot <= 500){
    return Math.exp(9.814674E-11 * geopot**4 + -1.654439E-07 * geopot**3 + 1.148115E-04 * geopot**2 + -0.05431334 * geopot + -2.011365);
  } else if(geopot <= 750){
    return Math.exp(-7.835161E-11 * geopot**4 + 1.964589E-07 * geopot**3 + -1.657213E-04 * geopot**2 + 0.04305869 * geopot + -14.77132);
  } else if(geopot <= 1000){
    return Math.exp(2.813255E-11 * geopot**4 + -1.120689E-07 * geopot**3 + 1.695568E-04 * geopot**2 + -0.1188941 * geopot + 14.56718);
  }
}

// Returns temperature in Kelvin
function getTemperature(geopot){
  if (geopot <= 11){
    return 288.15 - (6.5 * geopot);
  } else if (geopot <= 20){
    return 216.65;
  } else if (geopot <= 32){
    return 196.65 + geopot;
  } else if (geopot <= 47){
    return 228.65 + 2.8 * (geopot - 32);
  } else if (geopot <= 51){
    return 270.65;
  } else if (geopot <= 71){
    return 270.65 - 2.8 * (geopot - 51);
  } else if (geopot <= 84.85){
    return 214.65 - 2 * (geopot - 71);
  } else if (geopot <= 91){
    return 186.87;
  } else if(geopot <= 110){
    return 263.19 - 76.32 * Math.sqrt(1 - ((geopot - 91) / -19.94)**2);
  } else if(geopot <= 120){
    return 240 + 12 * (geopot - 110);
  } else if(geopot <= 1000){
    var e = (geopot - 120) * (6356.766 + 120) / (6356.766 + geopot);
    return 1000 - 640 * Math.exp(-0.01875 * e);
  }
  console.log("no temperature");
}

function getGeoPotential(y){
  return EARTH_RADIUS * y / (EARTH_RADIUS + y);
}

function drawAthmosphere(){
  // Surface
  stroke(255);
  line(0, start_y, WINDOW_WIDTH, start_y);
  // Troposphere
  stroke(255, 165, 0);
  line(0, -10000 / SCALE + start_y, WINDOW_WIDTH, -10000 / SCALE + start_y);
  // Stratosphere
  stroke(51, 204, 255);
  line(0, -50000 / SCALE + start_y, WINDOW_WIDTH, -50000 / SCALE + start_y);
  // Mesosphere
  stroke(0, 102, 255);
  line(0, -85000 / SCALE + start_y, WINDOW_WIDTH, -85000 / SCALE + start_y);
  // Thermosphere
  // Exposphere
  stroke(0, 0, 153);
  line(0, -600000 / SCALE + start_y, WINDOW_WIDTH, -600000 / SCALE + start_y);


  stroke(0, 0, 0, 0);
  fill(255);
  text('Surface', 0, start_y + 15);
  fill(255, 165, 0);
  text('Troposphere', 0, -10000 / SCALE + start_y + 15);
  fill(51,204, 255);
  text('Stratosphere', 0, -50000 / SCALE + start_y + 15);
  fill(0, 102, 255);
  text('Mesosphere', 0, -85000 / SCALE  + start_y + 15);
  fill(0, 0, 153);
  text('Thermosphere', 0, -600000 / SCALE + start_y + 15);
}
