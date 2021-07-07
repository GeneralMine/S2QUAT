<script context="module">
	import { get } from '$lib/api.js';
	export async function load({ session, fetch }) {
		try {
			let { companies } = await get(`company/list`, session.token, fetch);
			return { props: { companies } };
		} catch (err) {
			return { status: err.code, error: err };
		}
	}
</script>

<script>
	export let companies;
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [CrumbBuilder.create('Unternehmen', '/company', 'company').build()];
	/*******************************************/
	import { goto } from '$app/navigation';
	import Table from '$lib/Table/Table.svelte';
	import TableAttributes from '$lib/Table/TableAttributes.svelte';
	import TableAttributesItem from '$lib/Table/TableAttributesItem.svelte';
	import TableBody from '$lib/Table/TableBody.svelte';
	import TableBodyRow from '$lib/Table/TableBodyRow.svelte';
	import TableBodyItem from '$lib/Table/TableBodyItem.svelte';
	import Surface from '$lib/Common/Surface.svelte';

	let companyPrompt = false;
</script>

<svelte:head>
	<title>Unternehmen | S2QUAT</title>
</svelte:head>

<Surface>
	<Table on:create={() => (companyPrompt = true)}>
		<TableAttributes>
			<TableAttributesItem>Logo</TableAttributesItem>
			<TableAttributesItem>Name</TableAttributesItem>
			<TableAttributesItem>Anzahl Projekte</TableAttributesItem>
		</TableAttributes>
		<TableBody>
			{#each companies as company}
				<TableBodyRow on:click={async () => await goto('/company/' + company.id)}>
					<TableBodyItem type="img" imgName={company.logo ? company.logo : '-'} />
					<TableBodyItem>{company.name}</TableBodyItem>
					<TableBodyItem>{company.projects.length}</TableBodyItem>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</Surface>
