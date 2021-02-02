import {uWidth, uHeight} from "./sketch_utils.js"

export default function sketch(p5) {
    let w = uWidth;
    let h = uHeight;

    const PI = p5.PI;
    const HALF_PI = p5.HALF_PI;
    let width;
    let height;

    class Turtle {    
        constructor(xpos_, ypos_, radius_, topspeed_) {
            this.location = p5.createVector(0, 0);
            this.velocity = p5.createVector();
            this.acceleration = p5.createVector();
            this.dir = p5.createVector();


            this.radius=radius_;
            this.location.x = xpos_;
            this.location.y = ypos_;
            this.xpos = this.location.x;
            this.ypos = this.location.y;
            this.angle = 0;
            this.mass = 50.0;
            this.topspeed = topspeed_;
        }
    
        show() { //Anzeigen
            let xpos = this.xpos;
            let ypos = this.ypos;
            p5.push();
            p5.translate(xpos, ypos);
            p5.rotate(PI/2);
            p5.rotate(this.angle);
            let radius = this.radius;
            p5.ellipse(0, 0, radius*2, radius*2);
            let radiusKopf = radius / 2;
            let xposKopf = (radius + radiusKopf) * p5.cos(-HALF_PI);
            let yposKopf = (radius + radiusKopf) * p5.sin(-HALF_PI);
            p5.ellipse(xposKopf, yposKopf, radiusKopf*2, radiusKopf*2);
        
            let radiusBeine = radius / 4;
            let xposBeine = (radius + radiusBeine) * p5.cos(-PI/4);
            let yposBeine = (radius + radiusBeine) * p5.sin(-PI/4);
            p5.ellipse(xposBeine, yposBeine, radiusBeine*2, radiusBeine*2); //Rechts oben
        
            xposBeine = (radius + radiusBeine) * p5.cos(-PI+PI/4);
            yposBeine = (radius + radiusBeine) * p5.sin(-PI+PI/4);
            p5.ellipse(xposBeine, yposBeine, radiusBeine*2, radiusBeine*2); //Links oben
        
            xposBeine = (radius + radiusBeine) * p5.cos(-PI-PI/4);
            yposBeine = (radius + radiusBeine) * p5.sin(-PI-PI/4);
            p5.ellipse(xposBeine, yposBeine, radiusBeine*2, radiusBeine*2); //Links unten
        
            xposBeine = (radius + radiusBeine) * p5.cos(PI/4);
            yposBeine = (radius + radiusBeine) * p5.sin(PI/4);
            p5.ellipse(xposBeine, yposBeine, radiusBeine*2, radiusBeine*2); //Links unten
        
            p5.beginShape(); //Schwanz
            let xposVertex = radius * p5.cos(HALF_PI-PI/18);
            let yposVertex = radius * p5.sin(HALF_PI-PI/18);
            p5.vertex(xposVertex, yposVertex);
        
            xposVertex = (radius + 8) * p5.cos(HALF_PI);
            yposVertex = (radius + 8) * p5.sin(HALF_PI);
            p5.vertex(xposVertex, yposVertex);
        
            xposVertex = (radius) * p5.cos(HALF_PI+PI/18);
            yposVertex = (radius) * p5.sin(HALF_PI+PI/18);
            p5.vertex(xposVertex, yposVertex);
            p5.endShape();
        
            p5.pop();
        }
    
        update() { //Bewegen
            this.xpos=this.location.x;
            this.ypos=this.location.y;
            let mouse = p5.createVector(p5.mouseX, p5.mouseY);
            this.dir = mouse;
            this.dir.sub(this.location);
            this.dir.normalize().mult(0.05);
            this.acceleration = this.dir;
        
            this.velocity.add(this.acceleration);
            this.velocity.limit(this.topspeed);
            this.location.add(this.velocity);
        
            this.acceleration.mult(0);
        
            if (this.velocity.x < 0) {
                this.angle = p5.atan( this.velocity.y / this.velocity.x ) + PI;
            } else {
                this.angle = p5.atan( this.velocity.y / this.velocity.x );
            }
        
            this.checkEdges();
        }
        
        checkEdges() {
            if (this.location.x < -25) { //linker Rand
                this.location.x = p5.width +25;
            } else if (this.location.x> p5.width + 25) { //rechter Rand
                this.location.x = -25;
            }
        
            if (this.location.y < -25) { //oberer Rand
                this.location.y = p5.height +25;
            } else if (this.location.y> p5.height + 25) { //unterer Rand
                this.location.y = -25;
            }
        }
            
        applyforce(force){
            force.div(this.mass);
            acceleration.add(force);
        }
    }

    let turtle = [];
    let angle = 0;
    
    p5.setup = function() {
        let canvas = p5.createCanvas(w,h);
        canvas.parent("container");
        p5.background(0);  
        p5.noFill();
        p5.stroke(255);
        p5.strokeWeight(2);
        width = p5.width;
        height = p5.height
        turtle.push(new Turtle(width / 2 , height / 2, 20, 5));
    }

    p5.draw = function() {
        p5.background(0);
        for (let i=0; i<turtle.length; i++) {
            turtle[i].update();
            turtle[i].show();
        }
    }
}