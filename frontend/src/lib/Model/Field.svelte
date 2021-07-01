<script>
	import Surface from '$lib/common/Surface.svelte';
	import Attribute from './Attribute.svelte';
	import Collapsable from '$lib/common/Collapsable.svelte';

	export let field;

	function add() {}
	function edit() {}
	function remove() {}
</script>

<Surface title={field.name} add={true} edit={true}>
	<div class="container">
		<p class="textBlock">{field.description}</p>
		{#each field.attributes as attribute}
			<Collapsable on:add={add} on:edit={edit} on:delete={remove} title={attribute.name}>
				<Attribute {attribute} />
			</Collapsable>
		{/each}
	</div>
</Surface>

<style>
	.container {
		padding-top: 1rem;
		padding-bottom: 1rem;
		display: flex;
		flex-direction: column;
		padding-left: 2rem;
		padding-right: 2rem;
	}
</style>
