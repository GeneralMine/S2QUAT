<script>
	import Factor from './Factor.svelte';

	export let attribute;
</script>

<h2>{attribute.name}</h2>
{#if attribute.description !== undefined}
	<p>{attribute.description}</p>
{/if}
<hr />
{#each attribute.factors as factor}
	<Factor {factor} />
{/each}
