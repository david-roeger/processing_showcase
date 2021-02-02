import {uWidth, uHeight} from "./sketch_utils.js"

export default function sketch(p5) {
    let width = uWidth;
    let height = uHeight;
    
    let rectCount = 1;
    let angle = 0;
    var edge;
    var vel;

    if(width < height) {
        height = width;
    } else {
        width = height
    }

    p5.setup = function() {
        let canvas = p5.createCanvas(width, height);
        canvas.parent("container");
        edge = width / 3 * 1.8;
        p5.smooth();
        p5.background(0);
        p5.rectMode(p5.CENTER);
        p5.noFill();
        p5.stroke(255);
    }

    p5.draw = function() {
        vel = p5.map(p5.mouseX, 0, width, 0, p5.PI);
        // background(0);
        p5.translate(p5.width / 2, p5.height / 2);
        p5.fill(0, 0, 0, 15);
        p5.noStroke();
        p5.rect(0, 0, p5.width, p5.height);
        p5.noFill();
        p5.stroke(255);
        p5.rotate(angle);
        for(let i = 0; i < rectCount; i++){
            p5.rotate(p5.radians(90/rectCount));
            p5.rect(0, 0, edge, edge);
        }
        angle += p5.radians(vel);
        p5.circle(0, 0, p5.sqrt(2 * p5.pow(edge, 2)));
    }

    document.ondblclick = function(e) {
        e.preventDefault();
        rectCount++;
        document.activeElement.blur();
    }
}