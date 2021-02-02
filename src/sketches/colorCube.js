import {uWidth, uHeight} from "./sketch_utils.js"

export default function sketch(p5) {
  let width = uWidth;
    let height = uHeight;
    if(width < height) {
      height = width;
    } else {
      width = height
    }
    let edge = 100;
    let resolution = 5;

    p5.setup = function() {
      p5.smooth();
      let canvas = p5.createCanvas(width,height, p5.WEBGL);
      canvas.parent("container");
      p5.background(0);
      p5.colorMode(p5.RGB, edge);
      p5.noStroke();
    }

    p5.draw = function() {
      p5.orbitControl(5,5,5);
      p5.rotateY(1);
      p5.rotateY(1);
      p5.background(0);
      p5.noStroke();
      black();
      white();

    }

    function white() {
      p5.push();
      p5.translate(-edge/2, -edge/2, edge/2);
      for (let h = 0; h<=edge; h+=resolution) {
        for (let w = 0; w<=edge; w+=resolution) {
          // translate(
          p5.fill(edge-w, h, edge);
          p5.push();
          p5.translate(w, h, 0);
          p5.box(resolution);
          p5.pop();
          //(w, h, 1, 1);
        }
      }
      p5.pop();

      p5.push();
      p5.translate(-edge/2, edge/2, edge/2);
      for (let h = 0; h<=edge; h+=resolution) {
        for (let w = 0; w<=edge; w+=resolution) {
          p5.fill(edge, edge-w, edge-h);
          p5.push();
          p5.translate(0, -w, -h);
          p5.box(resolution);
          p5.pop();
        }
      }
      p5.pop();

      p5.push();
      p5.translate(-edge/2, edge/2, edge/2);

      for (let h = 0; h<=edge; h+=resolution) {
        for (let w = 0; w<=edge; w+=resolution) {
          p5.fill(edge-w, edge, edge-h);
          p5.push();
          p5.translate(w, 0, -h);
          p5.box(resolution);
          p5.pop();
        }
      }
      p5.pop();
    }


    function black() {
      p5.push();
      p5.translate(edge/2, edge/2, edge/2);
      for (let h = 0; h<=edge; h+=resolution) {
        for (let w = 0; w<=edge; w+=resolution) {
          p5.fill(0, edge-w, edge-h);
          p5.push();
          p5.translate(0, -w, -h);
          p5.box(resolution);
          p5.pop();
        }
      }
      p5.pop();

      p5.push();
      p5.translate(-edge/2, -edge/2, edge/2);
      for (let h = 0; h<=edge; h+=resolution) {
        for (let w = 0; w<=edge; w+=resolution) {
          p5.fill(edge-w, 0, edge-h);
          p5.push();
          p5.translate(w, 0, -h);
          p5.box(resolution);
          p5.pop();
        }
      }
      p5.pop();

      p5.push();
      p5.translate(-edge/2, -edge/2, -edge/2);
      for (let h = 0; h<edge; h+=resolution) {
        for (let w = 0; w<=edge; w+=resolution) {
          p5.fill(w, h, 0);
          p5.push();
          p5.translate(edge-w, h, 0);
          p5.box(resolution);
          p5.pop();
        }
      }
      p5.pop();
    }
}