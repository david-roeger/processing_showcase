<script>
	import { currentSketch, sketches, navActive } from "../store.js";
	import { slide } from "svelte/transition";

	function updateSketch(i) {
		$currentSketch = 0;
		$currentSketch = i;
		sessionStorage.setItem("current", i);
		$navActive = false;
		showRessources = false;
	}

	let showRessources = false;
</script>

<style>
	h3,
	h4 {
		margin-left: 1em;
		margin-bottom: 0;
		margin-top: 2em;
		color: white;
		user-select: none;
	}
	h4:hover {
		cursor: pointer;
	}
	li {
		color: white;
		user-select: none;
		line-height: 200%;
		position: relative;
	}

	li.active span {
		background-color: white;
		color: black;
	}

	li:hover {
		cursor: pointer;
	}

	.ressources-list li {
		padding-bottom: 0.5em;
		line-height: 1.5;
	}
	.hide {
		display: none;
	}
</style>

<h3>Beispiele</h3>
<ul>
	{#each $sketches as { name }, i}
		{#if name}
			<li
				class={i === $currentSketch ? 'active' : ''}
				on:click={() => updateSketch(i)}>
				<span>&nbsp;{name}&nbsp;</span>
			</li>
		{/if}
	{/each}
</ul>
<h4 on:click={() => (showRessources = !showRessources)}>Ressourcen</h4>
{#if showRessources}
	<ol class="ressources-list" transition:slide>
		<li>
			<a href="https://processing.org/">Processing Docs</a>
			<br />
			<span>Hier findet sich eigentlich alles, was man irgendwie wissen
				wollen würde.</span>
		</li>
		<li>
			<a href="https://www.youtube.com/user/shiffman">Processing Tutorials</a>
			<br />
			<span>Unterhaltsame Video Tutorials vom Erfinder der Sprache. Auch
				geeignet für komplette Neulinge.</span>
		</li>
		<li>
			<a href="http://www.generative-gestaltung.de/2/">Generative
				Gestaltung
			</a>
			<br />
			<span>Super Sammlung an Beispielen und Inspiration für generative
				Gestaltung mit Processing.</span>
		</li>
		<li>
			<a href="https://p5js.org/">P5.js </a>
			<br />
			<span>Processing Library fürs Web. (Damit wurden auch die Beispiele
				oben umgesetzt)</span>
		</li>
	</ol>
{/if}
