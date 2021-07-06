<script context="module">
	import { get } from '$lib/api.js';
	export async function load({ page, session, fetch }) {
		try {
			let { project } = await get(`project/${page.params.projectId}/get`, session.token, fetch);
			return { props: { project } };
		} catch (err) {
			return { status: err.code, error: err };
		}
	}
</script>

<script>
	export let project;
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	if (project.company) {
		$crumbs = [
			...$crumbs,
			CrumbBuilder.create(project.company.name, `/company/${project.company.id}`, 'company').build()
		];
	}
	$crumbs = [
		...$crumbs,
		CrumbBuilder.create(project.name, `/project/${project.id}`, 'project').build()
	];
	/*******************************************/

	import { goto } from '$app/navigation';
	import Surface from '$lib/Common/Surface.svelte';
	import Table from '$lib/Table/Table.svelte';
	import TableAttributes from '$lib/Table/TableAttributes.svelte';
	import TableAttributesItem from '$lib/Table/TableAttributesItem.svelte';
	import TableBody from '$lib/Table/TableBody.svelte';
	import TableBodyItem from '$lib/Table/TableBodyItem.svelte';
	import TableBodyRow from '$lib/Table/TableBodyRow.svelte';
	import CardRow from '$lib/Cards/CardComponents/CardRow.svelte';
	import ImageCard from '$lib/Cards/ImageCard.svelte';
	import PieCard from '$lib/Cards/PieCard.svelte'; // only working in production
	import DateCard from '$lib/Cards/DateCard.svelte';
</script>

<svelte:head>
	<title>{project.name} | S2QUAT</title>
</svelte:head>

<div class="projectContainer">
	<CardRow>
		<ImageCard src={project.company.logo} />

		<!-- Only working in production! -->
		<PieCard />
		<PieCard />
		<PieCard />

		<DateCard startDate={project.project_start} endDate={project.project_end} />
	</CardRow>

	<Surface title="Scenarios">
		<Table>
			<TableAttributes>
				<TableAttributesItem>ID</TableAttributesItem>
				<TableAttributesItem>Name</TableAttributesItem>
				<TableAttributesItem>Beschreibung</TableAttributesItem>
			</TableAttributes>
			<TableBody>
				{#each project.scenarios as scenario}
					<TableBodyRow
						on:click={async () => await goto('/project/' + project.id + '/scenario/' + scenario.id)}
					>
						<TableBodyItem>{scenario.id}</TableBodyItem>
						<TableBodyItem>{scenario.name}</TableBodyItem>
						<TableBodyItem>{scenario.description}</TableBodyItem>
					</TableBodyRow>
				{:else}
					No scenario provided
				{/each}
			</TableBody>
		</Table>
	</Surface>
	<Surface title="Verantwortliche">
		<Table>
			<TableAttributes>
				<TableAttributesItem>ID</TableAttributesItem>
				<TableAttributesItem>Name</TableAttributesItem>
				<TableAttributesItem>Email</TableAttributesItem>
			</TableAttributes>
			<TableBody>
				{#each project.users as user}
					<TableBodyRow>
						<TableBodyItem>{user.id}</TableBodyItem>
						<TableBodyItem>{user.name}</TableBodyItem>
						<TableBodyItem>{user.description}</TableBodyItem>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</Surface>
</div>

<style>
	.projectContainer {
		display: flex;
		flex-direction: column;
	}
</style>
