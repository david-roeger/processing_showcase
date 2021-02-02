import {uWidth, uHeight} from "./sketch_utils.js"

export default function sketch(p5) {
    let width = uWidth;
    let height = uHeight;

    let scl = 10;
    let rows, cols, baseWidth;
    let cones = [];

    p5.setup = function() {
        let canvas = p5.createCanvas(width,height);
        canvas.parent("container");
        p5.background(0);  
        p5.noFill();
        updateCanvas();
        initCones();
    }

    p5.draw = function() {
        let maxSteps;
        let mouseX = p5.mouseX;
        const mouseY = p5.mouseY;
        const width = p5.width;
        const height = p5.height;

        if(mouseX < width) {
            maxSteps = p5.max(mouseX, width) / 10;
        } else {
            maxSteps = width / 10;
        }
        
        p5.background(0); 
        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < cols; y++) {
                const posX = baseWidth * x;
                const posY = baseWidth * y;
                const index = cols * x + y

                const steps = p5.min(mouseX, width) / 10;
                const size = p5.min(mouseY, width) / 10;
                cones[index].display(posX, posY, baseWidth, size, steps, maxSteps);
            }
        }
    }

    function updateCanvas(){
        rows = scl + 1;
        cols = scl + 1;
        baseWidth = width / scl;
    }

    function initCones() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                var direction = Math.random();
                direction = direction < 0.26 ? 0 : (direction < .5 ? 1 : ( direction < .75 ? 2 : 3));
                const cone = new Cone(direction);
                cones.push(cone);
            }
        }
    }

    class Cone{
        constructor(direction) {
            this.direction = direction
            this.size = baseWidth;
        }
    
        display(posX, posY, base, size, steps, maxSteps) {
            let xOff = 0;
            let yOff = 0;
            p5.noFill();
            switch (this.direction) {
                    case 0:
                        yOff = -1;
                        break;
                    case 1:
                        xOff = 1;
                        break;
                    case 2:
                        yOff = 1;
                        break;
                    case 3:
                        xOff = -1;
                        break;
                default:
                    break;
            }
            for (let i = 0; i < maxSteps - steps; i++) {
                p5.noStroke();
                let color = p5.map(i * 1.5, 0, maxSteps, 255, 0)
                p5.fill(p5.constrain(color, 0, 255));

                const newPosX = posX + i * xOff;
                const newPosY = posY + i * yOff;
                const mouseY = p5.constrain(p5.mouseY, 0, p5.height);
                let size = baseWidth - i + p5.map(mouseY, 0, p5.height, 0, baseWidth);
                size = p5.constrain(size, 0, baseWidth);
                
                p5.ellipse(newPosX, newPosY, size, size);
            }
        }
    }
} 