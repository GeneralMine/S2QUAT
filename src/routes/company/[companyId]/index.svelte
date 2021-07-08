<script context="module">
	import { get } from '$lib/utils/api.js';
	export async function load({ page, session, fetch }) {
		try {
			let { company } = await get(`company/${page.params.companyId}/get`, session.token, fetch);
			return { props: { company } };
		} catch (err) {
			return { status: err.code, error: err };
		}
	}
</script>

<script>
	export let company;
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Layout/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [CrumbBuilder.create(company.name, `/company/${company.id}`, 'company').build()];
	/*******************************************/
</script>

<svelte:head>
	<title>{company.name} | S2QUAT</title>
</svelte:head>

Will be implemented in v2.2.0
