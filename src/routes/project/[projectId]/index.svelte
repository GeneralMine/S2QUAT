<script context="module">
	export async function load({ page }) {
		return { props: { projectId: page.params.projectId } };
	}
</script>

<script>
	export let projectId;
	let project = {
		name: 'Projekt',
		description: 'Beschreibung',
		goal: '',
		project_start: new Date(),
		project_end: new Date(),
		status: 'ACTIVE',
		company: {},
		scenarios: [],
		users: []
	};
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	import { onMount } from 'svelte';
	import { session } from '$app/stores';
	import { get } from '$lib/api.js';
	onMount(async () => {
		if ($session.user) {
			let res = await get(`project/${projectId}/get`);
			project = res.project;
			if (project.company) {
				$crumbs = [
					...$crumbs,
					CrumbBuilder.create(
						project.company.name,
						`/company/${project.company.id}`,
						'company'
					).build()
				];
			}
			$crumbs = [
				...$crumbs,
				CrumbBuilder.create(project.name, `/project/${project.id}`, 'project').build()
			];
		}
	});
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
	import NumberCard from '$lib/Cards/NumberCard.svelte';
	import PieCard from '$lib/Cards/PieCard.svelte';

	$: console.log('Project:', project);
</script>

<svelte:head>
	<title>Projekt ID | S2QUAT</title>
</svelte:head>

<div class="projectContainer">
	<CardRow>
		<NumberCard title="Szenarien" icon="scenario" />
		<PieCard />
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
