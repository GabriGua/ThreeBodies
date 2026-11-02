let pos;
let vel;


let planet = [];
let sun;
let moon;
function setup()
{
    createCanvas(windowWidth, windowHeight);
    for(let i = 0; i < 3; i++)
    {
      planet[i] = new Planet(random(windowWidth), random(windowHeight), random(0.5, 1));  
      planet[i].setColor();
    }
    

    background(0);
    
    
    
}

function draw()
{
    background(0, 30);

    for(let j = 0; j < planet.length; j++)
    {
        
        planet[j].final =  p5.Vector.sub(planet[j].final,  planet[j].final);
        planet[j].show();
        for(let i = 0; i < planet.length; i++)
        {
            if(i != j)
            {
                planet[j].sumAttraction(planet[i]);
            }
           
        }
   

        
    }

    for(let i = 0; i < planet.length; i++)
    {
            
        planet[i].attract();
    }
           
        
}