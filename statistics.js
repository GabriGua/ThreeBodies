

const stats = document.getElementById("stats-ds");

let bucket = [];


function createStats()
{
    for(let i = 0; i < planet.length; i++)
    {
        bucket[i] = document.createElement("div");
        bucket[i].textContent = "Planet "+i+": mass: "+planet[i].mass +"; pos x: "+planet[i].pos.x.toFixed(3)+"; pos y: "+planet[i].pos.y.toFixed(3);
        stats.appendChild(bucket[i]);

    }
}


function updateStats()
{

    while(stats.length > 0)
    {
        stats.pop();
    }

    for(let i = 0; i < planet.length; i++)
    {

        bucket[i].textContent = "Planet "+i+": mass: "+planet[i].mass +"; pos x: "+planet[i].pos.x.toFixed()+"; pos y: "+planet[i].pos.y.toFixed();

    }
}