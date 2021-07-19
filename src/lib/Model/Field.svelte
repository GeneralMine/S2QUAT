<script>
	import Surface from '$lib/Common/Surface.svelte';
	import Attribute from './Attribute.svelte';
	import Collapsable from '$lib/Common/Collapsable.svelte';
	import ListItemRowAdd from '$lib/List/ListItemRowAdd.svelte';
	import AttributePrompt from '$lib/Prompt/AttributePrompt.svelte';
	import { del, unpack } from '$lib/utils/api';

	export let field;
	export let edit;
	export let expanded = false;

	let attributePrompt = false;
	let selectedAttribute;

	async function refreshAttributes(ev) {
		if (ev.detail.updated) {
			for (let index = 0; index < field.attributes.length; index++) {
				if (field.attributes[index].id === ev.detail.attribute.id) {
					field.attributes[index].name = ev.detail.attribute.name;
					field.attributes[index].description = ev.detail.attribute.description;
					break;
				}
			}
		} else {
			field.attributes = [...field.attributes, ev.detail.attribute];
		}
		sort();
	}

	async function removeAttribute(attribute) {
		const { res, err } = await unpack(() => del(`model/field/${field.id}/attribute/${attribute.id}`));
		if (res.id) {
			for (let index = 0; index < field.attributes.length; index++) {
				if (field.attributes[index].id === res.id) {
					field.attributes.splice(index, 1);
					field.attributes = [...field.attributes];
					break;
				}
			}
		}
		sort();
	}
	function sort() {
		field.attributes.sort((a, b) => a.order - b.order);
	}
	sort();
</script>

<Surface title={field.name} edit={true} on:edit>
	<div class="container">
		<p class="textBlock">{field.description}</p>
		{#each field.attributes as attribute}
			<Collapsable
				title={`${attribute.name} (${attribute.factors.reduce(
					(accumulator, question) => accumulator + (question.answer && Object.keys(question.answer).length ? 1 : 0),
					0
				)}/${attribute.factors.length})`}
				remove={edit}
				{expanded}
				on:remove={() => {
					removeAttribute(attribute);
				}}
				{edit}
				on:edit={() => {
					selectedAttribute = attribute;
					attributePrompt = true;
				}}
			>
				<Attribute bind:attribute {edit} {field} expanded={true} />
			</Collapsable>
		{/each}
		{#if edit}
			<ListItemRowAdd text="Neues Merkmal hinzufügen" on:click={() => (attributePrompt = attributePrompt = true)} />
		{/if}
	</div>
</Surface>

{#if edit}
	<AttributePrompt field={field.id} on:success={refreshAttributes} bind:open={attributePrompt} bind:attribute={selectedAttribute} />
{/if}

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
