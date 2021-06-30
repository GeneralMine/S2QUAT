<script context="module">
	import { get } from '$lib/api.js';
	export async function load({ page }) {
		const { res, err } = await get('model/field/' + page.params.field_id);

		if (err || !res.field) {
			return { error: err, status: 500 };
		}

		return { props: { field: res.field } };
	}
</script>

<script>
	import Field from '$lib/Model/Field.svelte';

	export let field = {};
	$: console.log(field);
</script>

<Field {field} />
