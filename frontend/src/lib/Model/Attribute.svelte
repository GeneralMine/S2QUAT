<script>
	import Factor from './Factor.svelte';
	import Collapsable from '$lib/common/Collapsable.svelte';

	export let attribute;
</script>

<div class="container">
	<p class="textBlock">{attribute.description}</p>
	{#each attribute.factors as factor}
		<Collapsable title={factor.name}>
			<Factor {factor} />
		</Collapsable>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
