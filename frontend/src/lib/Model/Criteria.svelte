<script>
	export let criteria;
</script>

<h4>{criteria.name}</h4>
{#if criteria.description !== undefined}
	<p>{criteria.description}</p>
{/if}
