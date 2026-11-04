

let pos;
let vel;


let planet = [];
let zoom = 1;

let xMin, xMax, yMin, yMax;
let num_planets;



function setup()
{
    createCanvas(windowWidth, windowHeight);
    createEnv();
    createStats();
    
}

function draw()
{
    background(0, 30);
    

    Attraction();
   
    createRectangle();
   

    for(let j = 0; j < planet.length; j++)
    {
        planet[j].show();

        
    }

    timeToReset();
}

function createEnv()
{
    
    for(let i = 0; i < 3; i++)
    {
      planet[i] = new Planet(random(windowWidth/2-windowWidth/4, windowWidth/2+windowWidth/4), random(windowHeight/2-windowHeight/6,windowHeight/2+windowHeight/6), random(0.5, 1));  
      planet[i].setColor();
      
        if(i == 0)
        {
        xMin = planet[i].pos.x;
        yMin = planet[i].pos.y;
        xMax = xMin;
        yMax = yMin;
        }
      
    }
    
    let totalMass = 0;
    let motionV = createVector(0,0);

    for(let i = 0; i < planet.length; i++)
    {
        totalMass = totalMass + planet[i].mass;
        motionV = p5.Vector.add(motionV, p5.Vector.mult(planet[i].vel, planet[i].mass))


    }

    motionV = p5.Vector.div(motionV, totalMass);


    for(let i = 0; i < planet.length; i++)
    {
        planet[i].vel = p5.Vector.sub(planet[i].vel, motionV);


    }


    num_planets = planet.length;
    background(0);
}

function Attraction()
{
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
        

        
        
        
        
        
    }
    
    

    for(let i = 0; i < planet.length; i++)
    {
            
        planet[i].attract();
        
    }
}


function createRectangle()
{
     xMin = Infinity;
    xMax = -Infinity;
    yMin = Infinity;
    yMax = -Infinity;

    for(let j = 0; j < planet.length; j++)
    {

        if(planet[j].pos.x > xMax)
        {
            xMax = planet[j].pos.x;
        }
        
        if(planet[j].pos.x < xMin)
        {
            xMin = planet[j].pos.x
        }

        if(planet[j].pos.y > yMax)
        {
            yMax = planet[j].pos.y;

        }
        
        if(planet[j].pos.y < yMin)
        {
            yMin = planet[j].pos.y
        }
    }


    
    
    
        first = point(xMin,yMin)
       second =  point(xMin,yMax)
        third = point(xMax, yMin)
        fourth =point(xMax, yMax)

}

function resetScene()
{
    while(planet.length > 0)
    {
        planet.pop()
    }

    createEnv();
}

function timeToReset()
{
    
    for(let i = 0; i < planet.length; i++)
    {
        if (planet[i].pos.x > windowWidth || planet[i].pos.x < 0 || planet[i].pos.y > windowHeight || planet[i].pos.y < 0)
        {
            num_planets--;
        }
        else
        {
            if(num_planets < planet.length)
            {
                num_planets++;
            }   
        }
    }

    if(num_planets < (planet.length / 2))
    {
        resetScene();
        updateStats()
    }

}