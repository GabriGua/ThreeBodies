class Planet
{
    
    constructor(x, y, m)
    {
        
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(9));
        this.mass = m;
        

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

        this.direction = p5.Vector.sub(target.pos, this.pos);
        this.direction.setMag(0.05* (target.mass / (this.v.magSq())+1));

        
        
        
        

        this.final = p5.Vector.add(this.final, this.direction)

    }

    attract()
    {
        
        this.vel.add(this.final);
        this.vel.limit(8);
        this.pos.add(this.vel);

    }

    /*move(target1, target2)
    {
        let v;
        let u;
        let target;

        v = p5.Vector.sub(target1.pos, this.pos);
        u = p5.Vector.sub(target2.pos, this.pos);
        
        if(v.mag() / target1.mass < u.mag() / target2.mass  &&  v.mag() < 670)
        {
            target = target1;
            this.direction = p5.Vector.sub(target.pos, this.pos);
            this.direction.setMag(0.05);

            this.vel.add(this.direction);
            this.vel.limit(3);
            this.pos.add(this.vel);
        }
        else if (v.mag() / target1.mass > u.mag() / target2.mass && u.mag() < 670)
        {
            target = target2;
            this.direction = p5.Vector.sub(target.pos, this.pos);
            this.direction.setMag(0.05);

            this.vel.add(this.direction);
            this.vel.limit(3);
            this.pos.add(this.vel);
        }
        else
        {
            target = null;
            this.pos.add(this.vel);
        }

        


    }*/

    

    show()
    {
        
        stroke(255);
        strokeWeight(2);
        fill(this.color1, this.color2, this.color3, 100)
        ellipse(this.pos.x, this.pos.y, 16);
        
    }
}