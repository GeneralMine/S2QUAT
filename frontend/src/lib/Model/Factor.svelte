<script>
	import Criteria from './Criteria.svelte';
	import Collapsable from '$lib/common/Collapsable.svelte';

	export let factor;
</script>

<div class="container">
	<p class="textBlock">{factor.description}</p>
	{#each factor.criterias as criteria}
		<Collapsable title={criteria.name} expanded={true}>
			<Criteria {criteria} />
		</Collapsable>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
