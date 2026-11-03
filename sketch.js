let pos;
let vel;


let planet = [];
let zoom = 1;

let xMin, xMax, yMin, yMax;
let zoomCenter = p5.Vector.random2D();
let base, alt;

function setup()
{
    createCanvas(windowWidth, windowHeight);
    for(let i = 0; i < 3; i++)
    {
      planet[i] = new Planet(random(windowWidth), random(windowHeight), random(0.5, 1));  
      planet[i].setColor();
      
        if(i == 0)
        {
        xMin = planet[i].pos.x;
        yMin = planet[i].pos.y;
        xMax = xMin;
        yMax = yMin;
        }
      
    }
    

    background(0);
    
    
    
}

function draw()
{
    background(0, 30);
    

    
    zoomCenter = p5.Vector.sub(zoomCenter, zoomCenter);
    zoomCenter = createVector((xMin+xMax)/2, (yMin+yMax)/2)
    point(zoomCenter);
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
        print("xMin: " + xMin + "xMax: " + xMax + "yMin: "+  yMin + " yMax: "+ yMax)

        
        point(xMin,yMin)
        point(xMin,yMax)
        point(xMax, yMin)
        point(xMax, yMax)

        
        if(xMin <  100 || yMin < 100 || xMax > windowWidth-100 || yMax > windowHeight-100 )
        {
            
            zoom = zoom / 100 * 99;
            
        }
        
        
        
    }
    translate(zoomCenter.x/2, zoomCenter.y/2)
    scale(zoom);

    translate(-zoomCenter.x, -zoomCenter.y)
    

    for(let i = 0; i < planet.length; i++)
    {
            
        planet[i].attract();
        
    }
    xMin = Infinity;
    xMax = -Infinity;
    yMin = Infinity;
    yMax = -Infinity
    for(let j = 0; j < planet.length; j++)
    {
        planet[j].show();

        print(planet[j].pos.x + " x---------------------------")
        print(planet[j].pos.y + " y -------------------------------------")
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

    base = xMax - xMin;
    alt = yMax - yMin;

        
}