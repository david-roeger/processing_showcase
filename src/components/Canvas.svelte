<script>
	import { onMount, onDestroy } from "svelte";
	import p5 from "../p5.js";
	import { currentSketch, sketches } from "../store.js";

	let p = undefined;
	let mounted = false;
	function setCanvas() {
		if (mounted) {
			if (p !== undefined) {
				p.remove();
			}
			if ($currentSketch) p = new p5($sketches[$currentSketch].sketch);
		}
	}

	const unsubscribe = currentSketch.subscribe(() => {
		setCanvas();
	});

	onMount(async () => {
		mounted = true;
		setCanvas();
	});

	onDestroy(unsubscribe);
</script>

<style>
	#container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>

<div id="container" />
