<script>
	import Surface from '$lib/Common/Surface.svelte';

	export let small;
	export let clickArea;
	export let responsiveHeight = false;
</script>

<Surface>
	<div class="cardContainer" class:small class:clickArea class:responsiveHeight on:click>
		<slot />
	</div>
</Surface>

<style>
	.cardContainer {
		display: flex;
		flex-direction: column;
		width: 244px;
		height: 144px;
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
		padding-left: 1rem;
		padding-right: 1rem;
		margin: 0;
	}
	.small {
		width: 122px;
		height: 72px;
	}
	.responsiveHeight {
		height: unset;
	}
</style>
