<script>
	import Footer from '$lib/common/Footer.svelte';
	import Nav from '$lib/Nav.svelte';

	import '../app.css';

	let width;
</script>

<svelte:window bind:innerWidth={width} />

<div id="layout">
	<Nav />

	<main class="mainContainer">
		<slot />
	</main>

	<Footer />
</div>

<style>
	.mainContainer {
		grid-area: main;
		padding: 3rem;
	}

	#layout {
		width: 100%;
		height: 100%;

		display: grid;
		background-color: var(--background-color);
		grid-template:
			'nav main' 1fr
			'nav footer' 1fr /
			12rem 1fr;
	}

	@media (max-width: 768px) {
		#layout {
			display: grid;
			grid-template:
				'nav' 4rem
				'main' 1fr
				'footer' 1fr /
				1fr;
		}
	}
</style>
