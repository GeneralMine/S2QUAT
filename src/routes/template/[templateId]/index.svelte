<script context="module">
	import { get } from '$lib/api.js';
	export async function load({ page, session, fetch }) {
		try {
			let { template } = await get(`template/${page.params.templateId}/get`, session.token, fetch);
			return { props: { template } };
		} catch (err) {
			return { status: err.code, error: err };
		}
	}
</script>

<script>
	export let template;
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Vorlagen', '/template', 'template').build(),
		CrumbBuilder.create('Vorlagen ID', '/template', 'template').build()
	];
	/*******************************************/
</script>

<svelte:head>
	<title>{template.name} | S2QUAT</title>
</svelte:head>

Will be implemented in v2.2.0
