<script>
	import Surface from '$lib/common/Surface.svelte';
</script>

<Surface>
	<div class="cardContainer">
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
</style>
