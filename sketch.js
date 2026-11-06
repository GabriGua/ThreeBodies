const slider = document.getElementById("nPlanets");
const resetButton = document.getElementById("resetBTN");
const saveButton = document.getElementById("saveBTN");
const loadButton = document.getElementById("loadBTN");
const autRes = document.getElementById("keepGoing");

let nPlanets = slider.value;
let pos;
let vel;


let planet = [];
let zoom = 1;

let xMin, xMax, yMin, yMax;
let num_planets;

let runState;


function setup()
{
    createCanvas(windowWidth-25, windowHeight-25);
    createEnv();
    createStats();
    
}

function draw()
{
    background(20, 30);
    

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
    
    for(let i = 0; i < nPlanets; i++)
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
    
    runState = {planets: []};

    for(let i = 0; i < planet.length; i++)
    {
        runState.planets.push({x: planet[i].pos.x, y: planet[i].pos.y, velx: planet[i].vel.x, vely: planet[i].vel.y, mass: planet[i].mass})
    }
    JSON.stringify(runState);


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
    if(autRes.checked == true)
    {
        for(let i = 0; i < planet.length; i++)
        {
            if (planet[i].pos.x > windowWidth-25 || planet[i].pos.x < 0 || planet[i].pos.y > windowHeight-25 || planet[i].pos.y < 0)
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
            updateStats();
        }
    }
    

}

slider.oninput = function() {
   nPlanets = this.value;
   resetScene();
   ricreateStats()
}

resetButton.onclick = function()
{
    resetScene();
    ricreateStats();
}

saveButton.onclick = function()
{
    saveJSON(runState, "orbit.json");
}

loadButton.onchange = function()
{
    let reader = new FileReader();
    reader.onload = function()
    {
        
        let element = JSON.parse(reader.result);
        loadOrbit(element);

    }
    reader.readAsText(this.files[0]);
    
    
}

function loadOrbit(data)
{
    while(planet.length > 0)
    {
        planet.pop()
    }

    for(let i = 0; i < data.planets.length; i++)
    {
        planet[i] = new Planet(data.planets[i].x, data.planets[i].y, data.planets[i].mass);
        planet[i].vel = createVector(data.planets[i].velx, data.planets[i].vely);
        planet[i].setColor()

        
    }
    nPlanets = data.planets.length;
    slider.value = nPlanets;
    runState = data;

    ricreateStats();
    background(0);
}