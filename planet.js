class Planet
{
    constructor(x, y)
    {
        this.pos = createVector(x, y);
        this.vel = createVector(-1, -1);

    }

    move()
    {
        this.pos.add(this.vel)
    }

    show()
    {
        
        stroke(255);
        strokeWeight(2);
        fill(255, 100);
        ellipse(this.pos.x, this.pos.y, 32);
        
    }
}