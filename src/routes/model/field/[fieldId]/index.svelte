<script context="module">
	import { get } from '$lib/utils/api.js';
	export async function load({ page, session, fetch }) {
		try {
			let { field } = await get(`model/field/${page.params.fieldId}/get`, session.token, fetch);
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
</script>

<svelte:head>
	<title>{field.name} | S2QUAT</title>
</svelte:head>

<Field {field} />
