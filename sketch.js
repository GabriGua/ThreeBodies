const slider = document.getElementById("nPlanets");
const resetButton = document.getElementById("resetBTN");
const saveButton = document.getElementById("saveBTN");
const loadButton = document.getElementById("loadBTN");
const autRes = document.getElementById("keepGoing");
const speedSlider = document.getElementById("speedP");


let nPlanets = slider.value;
let pos;
let vel;


let planet = [];
let zoom = 1;

let xMin, xMax, yMin, yMax;
let num_planets;

let runState;

let speed = 1;

let subSteps = 50;
let timeStep = 1/subSteps;
let maxHeight;

var viewScale = 1;
let maxRadius = 0;
let distan;


function setup()
{
    maxHeight = min(800, windowHeight)
    createCanvas(windowWidth, maxHeight);
    createEnv();
    createStats();
    
}

function draw()
{
    background(20, 30);
    

    for(let i = 0; i < speed * subSteps; i++)
    {
        Attraction();

    }
    
    for(let j = 0; j < planet.length; j++)
    {
        distan = dist(planet[j].pos.x, planet[j].pos.y, windowWidth/2, maxHeight/2)

        if(distan > maxRadius && distan < max(windowWidth, maxHeight))
        {
            maxRadius = distan;
        }
    }

    
   
    push()
    translate(windowWidth/2, maxHeight/2)
    scale(viewScale)
    translate(-windowWidth/2, -maxHeight/2)

    for(let j = 0; j < planet.length; j++)
    {
        planet[j].show();

        
    }
    pop()
    timeToReset();
}

function createEnv()
{
    
    for(let i = 0; i < nPlanets; i++)
    {
      planet[i] = new Planet(random(windowWidth/2-windowWidth/8, windowWidth/2+windowWidth/8), random(maxHeight/2-maxHeight/8,maxHeight/2+maxHeight/8), random(0.5, 1.5));  
      planet[i].setColor();
      
      
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
        runState.planets.push({x: planet[i].pos.x - windowWidth/2, y: planet[i].pos.y - maxHeight/2, velx: planet[i].vel.x, vely: planet[i].vel.y, mass: planet[i].mass})
    }
    

    viewScale = 1;
    maxRadius = 0;

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
            if (planet[i].pos.x > windowWidth || planet[i].pos.x < 0 || planet[i].pos.y > maxHeight || planet[i].pos.y < 0)
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
speedSlider.oninput = function()
{
    speed = speedSlider.value;
}

resetButton.onclick = function()
{
    resetScene();
    ricreateStats();
}

saveButton.onclick = function()
{
   
    
    runState.radius = max(ceil(maxRadius), runState.radius || 0);
        
    
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
        planet[i] = new Planet(data.planets[i].x + windowWidth/2, data.planets[i].y + maxHeight/2, data.planets[i].mass);
        planet[i].vel = createVector(data.planets[i].velx, data.planets[i].vely);
        planet[i].setColor()

        
    }

    if(data.radius > 0)
    {
        minus = min(windowWidth, maxHeight);
        minus = ((minus/2)-40)/data.radius;
        viewScale = min(1, minus)

    }else
    {
        viewScale = 1;
    }

    nPlanets = data.planets.length;
    slider.value = nPlanets;
    runState = data;


    maxRadius = 0;
    autRes.checked = false;

    ricreateStats();
    background(0);
}