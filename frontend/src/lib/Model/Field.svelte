<script>
	import Surface from '$lib/common/Surface.svelte';
	import Attribute from './Attribute.svelte';
	import Collapsable from '$lib/common/Collapsable.svelte';

	export let field;
	let expanded = false;
</script>

<Surface title={field.name}>
	<div class="container">
		{#if field.description !== undefined}
			<p>{field.description}</p>
		{/if}
		<Collapsable bind:expanded>
			{#each field.attributes as attribute}
				<Attribute {attribute} />
			{/each}
		</Collapsable>
	</div>
</Surface>

<style>
	.container {
		padding: 1rem;
	}
</style>
