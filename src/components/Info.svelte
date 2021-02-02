<script>
	import { currentSketch, sketches } from "../store.js";

	console.log($currentSketch);
</script>

<style>
	h3 {
		margin-right: 1.2em;
		margin-bottom: 1em;
		padding-top: 1em;
		border-top: 1px solid white;
		color: white;
	}
	p {
		color: white;
		margin-top: 0;
	}
	p:last-child {
		margin-bottom: 0;
	}
</style>

{#if $sketches[$currentSketch].hasOwnProperty('name')}
	<h3>{$sketches[$currentSketch].name}</h3>
	{#each $sketches[$currentSketch].info as info}
		<p>
			{@html info}
		</p>
	{/each}
{/if}
