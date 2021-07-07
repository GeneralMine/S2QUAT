<script context="module">
	import { get } from '$lib/api.js';
	export async function load({ session, fetch }) {
		try {
			let { templates } = await get(`template/list`, session.token, fetch);
			return { props: { templates } };
		} catch (err) {
			return { status: err.code, error: err };
		}
	}
</script>

<script>
	export let templates;
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Home', '/', 'home').build(),
		CrumbBuilder.create('Vorlagen', '/template', 'template').build()
	];
	/*******************************************/
	import { goto } from '$app/navigation';
	import Table from '$lib/Table/Table.svelte';
	import TableAttributes from '$lib/Table/TableAttributes.svelte';
	import TableAttributesItem from '$lib/Table/TableAttributesItem.svelte';
	import TableBody from '$lib/Table/TableBody.svelte';
	import TableBodyRow from '$lib/Table/TableBodyRow.svelte';
	import TableBodyItem from '$lib/Table/TableBodyItem.svelte';
	import Surface from '$lib/Common/Surface.svelte';

	let templatePrompt = false;
</script>

<svelte:head>
	<title>Vorlagen | S2QUAT</title>
</svelte:head>

<Surface>
	<Table on:create={() => (templatePrompt = true)}>
		<TableAttributes>
			<TableAttributesItem>Name</TableAttributesItem>
			<TableAttributesItem>Anzahl Bewertungsfelder</TableAttributesItem>
			<TableAttributesItem>Anzahl Qualitätsmerkmale</TableAttributesItem>
			<TableAttributesItem>Anzahl Qualitätsbestimmende Faktoren</TableAttributesItem>
			<TableAttributesItem>Anzahl Bewertungskriterien</TableAttributesItem>
		</TableAttributes>
		<TableBody>
			{#each templates as template}
				<TableBodyRow on:click={async () => await goto('/template/' + template.id)}>
					<TableBodyItem>{template.name}</TableBodyItem>
					<TableBodyItem>{template.fields.length}</TableBodyItem>
					<TableBodyItem>{template.attributes.length}</TableBodyItem>
					<TableBodyItem>{template.factors.length}</TableBodyItem>
					<TableBodyItem>{template.criterias.length}</TableBodyItem>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</Surface>
