<script>
	import Factor from './Factor.svelte';
	import Collapsable from '$lib/Common/Collapsable.svelte';

	export let attribute;

	function add() {}
	function edit() {}
	function remove() {}
</script>

<div class="container">
	<p class="textBlock">{attribute.description}</p>
	{#each attribute.factors as factor}
		<Collapsable title={factor.name} on:add={add} on:edit={edit} on:delete={remove}>
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
