import { writable } from 'svelte/store';

let current;

const storedSketch = sessionStorage.getItem("current");
if(isNaN(parseInt(storedSketch))) {
    current = 1;
} else {
    current = parseInt(storedSketch);
}
export const currentSketch = writable(current);
export const sketches = writable([]);
export const navActive = writable(true);
