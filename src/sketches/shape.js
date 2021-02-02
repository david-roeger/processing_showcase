import {uWidth, uHeight} from "./sketch_utils.js"

export default function sketch(p5) {
    let width = uWidth;
    let height = uHeight;

    let shape;
    p5.setup = function() {
        let canvas = p5.createCanvas(width, height);
        canvas.parent("container");
        p5.background(0);  
        p5.noFill();
        p5.frameRate(60);

        shape = new Shape(width/2, height/2, 100, 10, 1000, 1000);
    }

    p5.draw = function() {
        p5.strokeWeight(1);
        p5.stroke(255, 50);
        shape.update();
        shape.display();
    }

    /*
    p5.windowResized = function() {
        resizeCanvas(windowWidth, windowHeight);
        background(0);
    }*/

    class Shape {
        constructor(centerX, centerY, radius, segments, startNoiseX, startNoiseY) {
            //mittelpunkt
            //Größe
            //segmente
            this.centerX = centerX;
            this.centerY = centerY;
            this.radius = radius;
            this.segments = segments;

            this.startNoiseX = startNoiseX;
            this.startNoiseY = startNoiseY;
            this.startOffsetValueX= [];
            this.startOffsetValueY= [];
            for (let i = 0; i < this.segments; i++) {
                this.startOffsetValueX.push(p5.random(startNoiseX * -1, startNoiseX));
                this.startOffsetValueY.push(p5.random(startNoiseY * -1, startNoiseY));
            }

            this.offsetsX = [];
            this.offsetsY = [];
            this.offsetBound = 2;
            this.offsetInc = 0.02;

            this.updateOffsets()
        }

        display() {
            let angle = (p5.TAU / this.segments);
            p5.beginShape();

            let firstPosX = p5.cos(angle * this.segments -1 ) * this.radius + this.offsetsX[this.segments - 1];
            let firstPosY = p5.sin(angle * this.segments -1 ) * this.radius + this.offsetsY[this.segments - 1];
            p5.curveVertex(this.centerX + firstPosX, this.centerY + firstPosY);
            
            // Points in between
            for (let i = 0; i < this.segments + 1; i++) {
                let posX = p5.cos(angle * i) * this.radius + this.offsetsX[i];
                let posY = p5.sin(angle * i) * this.radius + this.offsetsY[i];
                //console.log(i, this.centerX + posX, this.centerY + posY);
                p5.curveVertex(this.centerX + posX, this.centerY + posY);
            }

            // Last control Point
            let lastPosX = p5.cos(angle * 1 ) * this.radius + this.offsetsX[1];
            let lastPosY = p5.sin(angle * 1 ) * this.radius + this.offsetsY[1];
            //console.log(this.centerX + lastPosX, this.centerY + lastPosY);
            p5.curveVertex(this.centerX + lastPosX, this.centerY + lastPosY);
            p5.endShape();
        }

        update() {
            // change shape
            this.updateOffsets();
            this.centerX += (p5.mouseX - this.centerX) * 0.01;
            this.centerY += (p5.mouseY - this.centerY) * 0.01;
        }

        updateOffsets() {
            for (let i = 0; i < this.segments; i++) {
                this.offsetsX[i] = p5.map(p5.noise(this.startOffsetValueX[i] + this.offsetInc), 0, 1, -1, 1) * this.offsetBound;
                this.offsetsY[i] = p5.map(p5.noise(this.startOffsetValueY[i] + this.offsetInc), 0, 1, -1, 1) * this.offsetBound;
            }
            this.offsetsX[this.segments] = this.offsetsX[0];
            this.offsetsY[this.segments] = this.offsetsY[0];
            
            this.offsetInc +=0.02;
            this.offsetBound += 0.02 ;
        }

        reset() {
            this.offsetBound = 30;
            this.offsetInc = 0.05 ;
        }
    }

    document.ondblclick = function(e) {
        e.preventDefault();
        p5.background(0);
    }
}