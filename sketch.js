let pos;
let vel;


let planet = [];
let zoom = 1;

let massCenter = p5.Vector.random2D();

massCenter = p5.Vector.sub(massCenter, massCenter);
let relativeMass;
let totalMass = 0; //not a good way, tomorrow try with a rectangle contaninig all the planets and taking the center.

function setup()
{
    createCanvas(windowWidth, windowHeight);
    for(let i = 0; i < 3; i++)
    {
      planet[i] = new Planet(random(windowWidth), random(windowHeight), random(0.5, 1));  
      planet[i].setColor();
      totalMass = totalMass + planet[i].mass;
    }
    

    background(0);
    
    
    
}

function draw()
{
    background(0, 30);
    massCenter = p5.Vector.sub(massCenter, massCenter);
    for(let j = 0; j < planet.length; j++)
    {
        
        planet[j].final =  p5.Vector.sub(planet[j].final,  planet[j].final);
        
        for(let i = 0; i < planet.length; i++)
        {
            if(i != j)
            {
                planet[j].sumAttraction(planet[i]);
            }
           
        }

        if(abs((planet[j].pos.x - massCenter.x))-100 > (windowWidth/2)/zoom || abs((planet[j].pos.y - massCenter.y))-100 > (windowHeight/2)/zoom)
        {
            
            zoom = zoom / 100 * 90;
            
        }
        
        relativeMass = p5.Vector.mult(planet[j].pos, planet[j].mass)
        massCenter = p5.Vector.add(relativeMass, massCenter);
        
    }
    massCenter = p5.Vector.div(massCenter, totalMass);

    for(let i = 0; i < planet.length; i++)
    {
            
        planet[i].attract();
        
    }
    translate(windowWidth/2, windowHeight / 2)
    scale(zoom);
    
    translate(-massCenter.x, -massCenter.y)
    for(let j = 0; j < planet.length; j++)
    {
        planet[j].show();
    }
        
}