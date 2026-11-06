class Planet
{
    
    constructor(x, y, m)
    {
        
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(9));
        this.mass = m;
        this.final = createVector(0,0);
        

    }

    setColor()
    {
        
        this.color1 = random(0, 255);
        this.color2 = random(0, 255);
        this.color3 = random(0, 255);
    }

    sumAttraction(target)
    {
        this.v = p5.Vector.sub(target.pos, this.pos);


        var G = 10000;
        var soft = 400;
        var distance;

        this.distance = this.v.magSq()
        this.direction = p5.Vector.sub(target.pos, this.pos);
        this.direction.mult((target.mass * G)/ Math.pow(this.distance + soft, 1.5));
        
        this.final = p5.Vector.add(this.final, this.direction)

    }

    attract()
    {
        
        this.vel.add(p5.Vector.mult(this.final, timeStep));
        
        this.pos.add(p5.Vector.mult(this.vel, timeStep));


    }

    

    show()
    {
        
        stroke(255);
        strokeWeight(2);
        fill(this.color1, this.color2, this.color3, 100)
        ellipse(this.pos.x, this.pos.y, 16);
        
    }
}