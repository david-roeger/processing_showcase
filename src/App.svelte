<script>
	import Nav from "./components/Nav.svelte";
	import Info from "./components/Info.svelte";
	import Canvas from "./components/Canvas.svelte";
	import Shape from "./sketches/shape.js";
	import ColorCube from "./sketches/colorCube.js";
	import Cone from "./sketches/cone.js";
	import Hilbert from "./sketches/hilbertCurve.js";
	import NwPI from "./sketches/numberWalkPI.js";
	import Rsquares from "./sketches/rotatingSquares.js";
	import Turtle from "./sketches/turtle.js";

	import { sketches, navActive } from "./store.js";
	let obj = [
		{},
		{
			name: "Turtle",
			sketch: Turtle,
			info: [
				"Abbildung eines physischen Systems. Die Schildkröte folgt der Maus und bewegt sich dabei entsprechend realer Naturgesetze (Antrieb, Geschwindigkeit, Gravitation, …) mit zur Veranschaulichung modifizierten Werten.",
			],
		},
		{
			name: "Slinky",
			sketch: Shape,
			info: [
				"Ähnlich wie Schildkröte folgt auch hier die Form, mit der Anmutung eines Treppenläufers, den Bewegungen Maus. Dabei entfernt sie sich immer weiter von einem perfekten Kreis, bis sie weit ausladend über den Bildschirm fegt. Dies hat keinen physischen Hintergrund, sondern stellt lediglich einen ästhetischen Moment dar.",
				"Mit einem Doppelklick kann der Hintergrund gelöscht werden.",
			],
		},
		{
			name: "Color Cube",
			sketch: ColorCube,
			info: [
				"Processing ist mehr als nur X und Y. Auch dreidimensionale Räume lassen sich erkunden, sodass sich eine gigantische Welt an Möglichkeiten öffnet.",
				"Mit gedrückter Maus kann der Würfel rotiert werden.",
				"Leider ist die 3D Arbeit sehr Performance-lastig, sodass es passieren kann, dass die Framrate rapide sinkt :(",
			],
		},
		{
			name: "Cones",
			sketch: Cone,
			info: [
				"Bewege die Maus von links nach rechts und von oben nach unten um einen Ästehtischen Moment zu erschaffen.",
			],
		},
		{
			name: "Hilbert Curve",
			sketch: Hilbert,
			info: [
				"Visualisierung des mathematischen Konstruktes einer raumfüllenden Kurve.",
				"Doppelklick um auf die nächste Stufe zu gelangen.",
				"Mehr Infos zu dem Thema gibt es <a href='https://en.wikipedia.org/wiki/Hilbert_curve'>hier</a>.",
			],
		},
		{
			name: "Number Walk PI",
			sketch: NwPI,
			info: [
				"Visuelle Darstellung der ersten 10.000 Nachkommastellen der Zahl PI.",
				"Doppelklick um neu zu starten.",
			],
		},
		{
			name: "Rotating Squares",
			sketch: Rsquares,
			info: [
				"Bewege die Maus von links nach rechts um die Geschwindigkeit zu steuern.",
				"Doppelklick um mehr Rechtecke hinzuzufügen.",
			],
		},
	];
	$sketches = [...obj];
</script>

<style>
	.container {
		height: 100%;
		display: flex;
		flex-direction: row-reverse;
		background-color: black;
		overflow: hidden;
	}

	.inner-container {
		width: 299px;
		min-width: 299px;
		max-width: 299px;
		background-color: black;
		height: 100%;
		border-right: 1px solid white;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow-y: auto;
	}

	main {
		flex-grow: 1;
		height: 100%;
	}
	nav {
		height: 100%;
	}

	section {
		padding: 1rem 0.5rem 1rem 1.2rem;
	}

	.arrow {
		display: none;
	}

	@media (max-width: 800px) {
		.container {
			display: block;
			position: relative;
		}
		.inner-container {
			padding-top: 40px;
			padding-bottom: 40px;

			position: absolute;
			top: 0;
			left: 0;
			transform: translateX(-300px);
			transition: 0.3s linear;
			min-height: calc(100% - 80px);
		}

		.inner-container.active {
			transform: translateX(0);
		}

		nav {
			margin-bottom: 2em;
		}

		.arrow {
			display: block;
			height: 39px;
			width: calc(2em + 18px);
			background: black;
			border-right: 1px solid white;
			border-bottom: 1px solid white;
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.arrow svg {
			transform: rotate(0deg);
			transition: 0.3s linear;
		}

		.arrow.active svg {
			transform: rotate(180deg);
		}
	}
</style>

<svelte:head>
	<title>Processing &lt;3</title>
</svelte:head>

<div class="container">
	<main on:click={() => ($navActive = false)}>
		<Canvas />
	</main>
	<div class="inner-container {$navActive ? 'active' : ''}">
		<nav>
			<Nav />
		</nav>
		<section>
			<Info />
		</section>
	</div>
	<div
		class="arrow {$navActive ? 'active' : ''}"
		on:click={() => ($navActive = !$navActive)}>
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			width="18px"
			height="12px"
			viewBox="0 0 18 12"
			style="overflow:visible;enable-background:new 0 0 26 12;"
			xml:space="preserve">
			<polygon
				style="fill: white"
				class="st0"
				points="12,7 0,7 0,5 12,5 12,5.1 " />
			<polygon
				style="fill: white"
				class="st0"
				points="12,0 12,2.6 15.4,6 12,9.4 12,12 18,6 " />
		</svg>
	</div>
</div>
