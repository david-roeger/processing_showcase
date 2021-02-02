import {uWidth, uHeight} from "./sketch_utils.js"

export default function sketch(p5) {
    let width = uWidth;
    let height = uHeight;

    let order = 5;
    let N = Math.pow(2, order);
    let total = N * N;

    var reload = true;
    let path = []

    if(width < height) {
        height = width;
    } else {
        width = height
    }

    p5.setup = function() {
        let canvas = p5.createCanvas(width,height);
        canvas.parent("container");
        p5.background(0);  
        p5.noFill();
        p5.colorMode(p5.HSB);
    }

    let counter = 1;
    p5.draw = function() {
        if(reload){
            p5.background(0);
            update();
            counter = 1;
            reload = false;
        }
        if (counter < total) {  
            for (let i = 0; i < p5.pow(2, order); i++) {
                const index = counter + i;
                if(index < total){
                    const last = path[index-1];
                    const current = path[index];
                    const color = p5.map(index, 0, total, 0, 255);

                    p5.stroke(color, 100, 100);
                    p5.line(last.x, last.y, current.x, current.y);
                }
            }
            counter += order;
        }

        function update() {
            N = Math.pow(2, order);
            total = N * N;

            for (let i = 0; i < total; i++) {
                path[i] = hilbert(i);
                const len = width / N;
        
                path[i].mult(len);
                path[i].add(len / 2, len / 2);
            }
        }
    }

    function hilbert(i){
        const points = [
            p5.createVector( 0, 0 ),
            p5.createVector( 0, 1 ),
            p5.createVector( 1, 1 ),
            p5.createVector( 1, 0 )
        ];

        let index = i & 3;
        let v = points[index];

        for (let j = 1; j < order; j++) {
            i = i >>> 2;
            index = i & 3;
            const len = Math.pow(2, j);

            switch (index) {
                case 0:
                    const tmp = v.x; 
                    v.x = v.y; 
                    v.y = tmp;
                    break;
                case 1:
                    v.y += len;
                    break;
                case 2:
                    v.x += len;
                    v.y += len;
                    break;
                case 3:
                    const tmp1 = len - 1 - v.x;
                    v.x = len - 1 - v.y;
                    v.y = tmp1;
                    v.x += len;
                break;
            }
        }
        return v;
    }

    document.ondblclick = function(e) {
        e.preventDefault();
        order++;
        order = order%10;
        order = p5.constrain(order, 1, 10);
        reload = true;
    }
}