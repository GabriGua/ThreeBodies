

const stats = document.getElementById("ststc");

let bucket = [];


function createStats()
{
    
    for(let i = 0; i < planet.length; i++)
    {
        bucket[i] = document.createElement("div");
        bucket[i].textContent = "Planet "+(i+1)+": mass: "+planet[i].mass.toFixed(3) +"; pos x: "+planet[i].pos.x.toFixed(3)+"; pos y: "+planet[i].pos.y.toFixed(3);
        stats.appendChild(bucket[i]);

    }
    
}


function updateStats()
{

   
    for(let i = 0; i < planet.length; i++)
    {

        bucket[i].textContent = "Planet "+(i+1)+": mass: "+planet[i].mass.toFixed(3) +"; pos x: "+planet[i].pos.x.toFixed()+"; pos y: "+planet[i].pos.y.toFixed();

    }
}

function ricreateStats()
{
    
    stats.innerHTML = null;

    bucket = [];

    createStats();
}