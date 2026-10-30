let pos;
let vel;

let planet;
function setup()
{
    createCanvas(1500, 700);
    planet = new Planet(300, 300);
    
    background(0);
    
}

function draw()
{
    background(0);
    planet.move();
    planet.show();
    
}