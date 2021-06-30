<script>
	import Criteria from './Criteria.svelte';

	export let factor;
</script>

<h3>{factor.name}</h3>
{#if factor.description !== undefined}
	<p>{factor.description}</p>
{/if}
<hr />
{#each factor.criterias as criteria}
	<Criteria {criteria} />
{/each}
