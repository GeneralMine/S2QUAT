<script>
	import Surface from '$lib/Common/Surface.svelte';
	import Attribute from './Attribute.svelte';
	import Collapsable from '$lib/Common/Collapsable.svelte';

	export let field = {
		name: 'Feld',
		attributes: []
	};

	const newAttribute = {
		name: 'Name',
		description: 'Beschreibung',
		factors: []
	};
	function fieldAdd() {
		console.log('Add new attribute');
		field.attributes.push(newAttribute);
	}
	function fieldEdit() {}
	function attributeAdd() {}
	function attributeEdit() {}
	function attributeRemove() {}
</script>

<Surface title={field.name} add={true} edit={true} on:add={fieldAdd} on:edit={fieldEdit}>
	<div class="container">
		<p class="textBlock">{field.description}</p>
		{#each field.attributes as attribute}
			<Collapsable
				on:add={attributeAdd}
				on:edit={attributeEdit}
				on:delete={attributeRemove}
				title={attribute.name}
			>
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
