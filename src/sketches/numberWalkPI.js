import {uWidth, uHeight} from "./sketch_utils.js"

export default function sketch(p5) {
    let width = uWidth;
    let height = uHeight;

    if(width < height) {
        height = width;
    } else {
        width = height
    }
        
    let numberArray = [];
    let piArray = [];
    let clear = true
    let isPi = true;
    let isPiLoaded = false;
    let radius;
    let colorArray;
    let fr = (width / 2) - (window.innerWidth < 800 ? 80 : 60);
    let fs = window.innerWidth < 800 ? 12 : 20;

    p5.setup = function() {
        let canvas = p5.createCanvas(width, height);
        canvas.parent("container");

        p5.noFill();
        p5.angleMode(p5.DEGREES);
        radius = (p5.height -200)/2;
        p5.loadStrings('assets/pi.txt', piLoaded);
        p5.background(0);
        p5.frameRate(20);
        p5.smooth();
        p5.textAlign(p5.CENTER, p5.CENTER);
        colorArray = [
            p5.color('#D45067'),
            p5.color('#BAB9B5'),
            p5.color('#F1BAA5'),
            p5.color('#F26B4D'),
            p5.color('#CDB79F'),
            p5.color('#F3CB69'),
            p5.color('#5DA3B6'),
            p5.color('#453629'),
            p5.color('#EBD2AA'),
            p5.color('#7EB629')
        ]

    }

    let i = 1;
    let counter = [0,0,0,0,0,0,0,0,0,0]
    p5.draw = function() {
        if(clear){
            p5.background(0);
            p5.fill(255);
            p5.noStroke();
            for(let i = 0; i<10; i++){
                p5.textSize(fs);
                p5.textFont('Arial');
                let angle = 360 / 10 * i - 90;
                let xPos = p5.cos(angle) * fr;
                let yPos = p5.sin(angle) * fr;
                p5.text(i, p5.width/2 + xPos, p5.height/2 + yPos);
            }
            p5.noFill();
            clear = false;
            i = 1;

        }
        p5.translate(width/2, height/2);
        if(isPi && isPiLoaded){
            numberArray = piArray
            isPi = false;
        }
        if(i < numberArray.length){
            p5.fill(0,0,0,10);
            p5.noStroke();
            p5.ellipse(0, 0,width - 200, height - 200);
            p5.noFill();
            if(numberArray[i] != numberArray[i-1]){
                var startOffset = angleOffset(numberArray[i-1]);

                var startAngle = 36 * numberArray[i-1] - 90 -18 + startOffset;
                var startX = (p5.cos(startAngle) * radius).toFixed(3);
                var startY = (p5.sin(startAngle) * radius).toFixed(3);

                var endOffset = angleOffset(numberArray[i]);
                var endAngle = 36 * numberArray[i] - 90 -18 + endOffset;
                var endX = (p5.cos(endAngle) * radius).toFixed(3);
                var endY = (p5.sin(endAngle) * radius).toFixed(3);


                p5.strokeWeight(2);
                var strokeColor = colorArray[numberArray[i]];
                strokeColor.setAlpha(127);
                p5.stroke(strokeColor);
                p5.line(startX, startY, endX, endY);
            }
            i++
        }

        p5.stroke(255);
        p5.strokeWeight(2);
        p5.ellipse(0,0,radius*2+1,radius*2+1);
    }

    function angleOffset(number) {
        var offset;
        if(counter[number] <= 17){
            counter[number] = counter[number] + 1;
            offset = counter[number];
        } else {
            counter[number] = 0;
            offset = 0;
        }
        return 18;//2 * offset;
    }

    function piLoaded(result) {
        result = result.join();
        piArray = filterArray(result);
        isPiLoaded = true;
    }

    function filterArray(unfiltered){
        var filtered = [];
        [...unfiltered].forEach(char => filtered.push(parseInt(char)));
        for (let i = filtered.length; i > 0; i--) {
            const element = filtered[i-1];
            if(isNaN(element)){
                filtered.splice(i-1, 1);
            }       
        }
        return filtered;
    }

    document.ondblclick = function(e) {
        e.preventDefault();
        clear = true;
    }
}   