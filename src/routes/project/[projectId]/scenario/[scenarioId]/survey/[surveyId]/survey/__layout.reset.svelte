<script>
	import '../../../../../../../../app.css';
	import Nav from '$lib/Layout/Nav/Nav.svelte';
	import { navigating } from '$app/stores';
	import Footer from '$lib/Common/Footer.svelte';
	import PreloadingIndicator from '$lib/Layout/PreloadingIndicator.svelte';
	let width;
</script>

<svelte:window bind:innerWidth={width} />

<div class="layout">
	{#if $navigating}
		<PreloadingIndicator />
	{/if}
	<Nav />

	<main>
		<slot />
	</main>

	<Footer />
</div>

<style>
	main {
		grid-area: main;
		padding: 3rem;
	}

	.layout {
		width: 100%;
		height: 100%;

		display: grid;
		background-color: var(--background-color);
		grid-template:
			'nav main' 1fr
			'nav footer' 1fr /
			13.75rem 1fr;
	}

	@media (max-width: 768px) {
		.layout {
			display: grid;
			grid-template:
				'nav' 4rem
				'main' 1fr
				'footer' 4rem;
		}
	}
</style>
