let pos;
let vel;


let planet;
let sun;
let moon;
function setup()
{
    createCanvas(15000, 7000);
    planet = new Planet(random(200, 1300), random(100, 600));
    sun = new Planet(random(200, 1300), random(100, 600));
    moon = new Planet(random(200, 1300), random(100, 600));
    background(0);
    planet.setColor();
    sun.setColor();
    moon.setColor();
    
}

function draw()
{
    background(0, 30);
    planet.move(moon, sun);
    planet.show();
    sun.show();
    sun.move(planet, moon);
    moon.move(sun, planet);
    moon.show();
}