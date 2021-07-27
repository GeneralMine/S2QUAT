<script>
	import Collapsable from '$lib/Common/Collapsable.svelte';

	export let field;
	export let attribute;
</script>

<div class="container">
	<p class="textBlock">{attribute.description}</p>
	{#each attribute.factors as factor}
		<Collapsable title={factor.name} expanded={true}>
			<Factor bind:factor {field} {attribute} />
		</Collapsable>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
