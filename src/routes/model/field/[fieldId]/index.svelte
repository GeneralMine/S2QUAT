<script context="module">
	import { get } from '$lib/utils/api.js';
	export async function load({ page, session, fetch }) {
		try {
			let { field } = await get(`model/field/${page.params.fieldId}.json`, session.token, fetch);
			return { props: { field } };
		} catch (err) {
			return { status: err.code, error: err };
		}
	}
</script>

<script>
	export let field;
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Layout/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Modell', '/model', 'model').build(),
		CrumbBuilder.create(`Feld ${field.id}`, `/model/field/${field.id}`, 'field').build()
	];
	/*******************************************/

	import Field from '$lib/Model/Field.svelte';
	import FieldPrompt from '$lib/Prompt/FieldPrompt.svelte';

	let fieldPrompt;

	async function refreshField(ev) {
		field.name = ev.detail.field.name;
		field.description = ev.detail.field.description;
		field.attributes = ev.detail.field.attributes;
	}
</script>

<svelte:head>
	<title>{field.name} | S2QUAT</title>
</svelte:head>

<Field on:edit={() => (fieldPrompt = true)} bind:field edit={true} />

<FieldPrompt bind:field on:success={refreshField} bind:open={fieldPrompt} />
