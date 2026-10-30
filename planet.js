class Planet
{
    constructor(x, y)
    {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(3));
       

    }

    move(target)
    {
        this.direction = p5.Vector.sub(target.pos, this.pos)
        this.direction.setMag(0.1)

        this.vel.add(this.direction)
        this.vel.limit(5)
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