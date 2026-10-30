let pos;
let vel;

let planet;
let sun;
function setup()
{
    createCanvas(1500, 700);
    planet = new Planet(600, 100);
    sun = new Planet(width/2, height/2)
    background(0);
    
}

function draw()
{
    background(0);
    planet.move(sun);
    planet.show();
    sun.show();
    
}