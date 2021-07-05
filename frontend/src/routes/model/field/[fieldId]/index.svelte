<script context="module">
	export async function load({ page }) {
		return { props: { fieldId: page.params.fieldId } };
	}
</script>

<script>
	export let fieldId;
	let field;
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	import { onMount } from 'svelte';
	import { session } from '$app/stores';
	import { get } from '$lib/api.js';
	onMount(async () => {
		if ($session.user) {
			let res = await get(`model/field/${fieldId}/get`);
			field = res.field;
			$crumbs = [
				CrumbBuilder.create('Modell', '/model', 'model').build(),
				CrumbBuilder.create(`Feld ${field.id}`, `/model/field/${field.id}`, 'field').build()
			];
		}
	});
	/*******************************************/

	import Field from '$lib/Model/Field.svelte';
	$: console.log('Field:', field);
</script>

<Field {field} />
