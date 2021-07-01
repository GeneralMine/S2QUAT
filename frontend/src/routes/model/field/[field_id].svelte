<script context="module">
	import { get } from '$lib/api.js';
	export async function load({ page }) {
		let response;
		try {
			response = await get('model/field/' + page.params.field_id);
			console.log(response);
			if (response.field) {
				return { props: { field: response.field } };
			} else {
				throw new Error('Backend ');
			}
		} catch (error) {
			console.log(error);
		}
	}
</script>

<script>
	import Field from '$lib/Model/Field.svelte';
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	export let field = {};
	$crumbs = [
		CrumbBuilder.create('Home', '/', 'home').build(),
		CrumbBuilder.create('Modell', '/model', 'model').build(),
		CrumbBuilder.create('Feld ' + field.id, '/model', 'model').build()
	];
	$: console.log(field);
</script>

<Field {field} />
