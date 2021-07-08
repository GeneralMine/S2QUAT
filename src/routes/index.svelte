<script context="module">
	import { get } from '$lib/utils/api.js';
	export async function load({ session, fetch }) {
		try {
			let [{ projects }, { templates }] = await Promise.all([
				get(`project/list`, session.token, fetch),
				get(`template/list`, session.token, fetch)
			]);
			return { props: { projects, templates } };
		} catch (err) {
			return { status: err.code, error: err };
		}
	}
</script>

<script>
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Layout/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [];
	/*******************************************/
	import { goto } from '$app/navigation';

	import Table from '$lib/Table/Table.svelte';
	import TableAttributes from '$lib/Table/TableAttributes.svelte';
	import TableAttributesItem from '$lib/Table/TableAttributesItem.svelte';
	import TableBody from '$lib/Table/TableBody.svelte';
	import TableBodyRow from '$lib/Table/TableBodyRow.svelte';
	import TableBodyItem from '$lib/Table/TableBodyItem.svelte';
	import Surface from '$lib/Common/Surface.svelte';
	import ProjectCard from '$lib/Cards/ProjectCard.svelte';
	import CardRow from '$lib/Cards/CardComponents/CardRow.svelte';
	import ProjectPrompt from '$lib/Prompt/ProjectPrompt.svelte';
	import Model from '$lib/Model/Model.svelte';
	import ListItemRow from '$lib/List/ListItemRow.svelte';
	import Icon from '$lib/Common/Icon.svelte';
	import List from '$lib/List/List.svelte';
	import AddCard from '$lib/Cards/AddCard.svelte';
	import ListItemRowAdd from '$lib/List/ListItemRowAdd.svelte';

	export let projects = [];
	export let templates = [];

	let projectsExpanded = false;
	let projectPrompt = false;

	let templatePrompt = false;

	async function refreshTemplates() {
		console.log('Refreshing templates');
		let { res, err } = await unpack(() => get(`template/list`, session.token, fetch));

		if (res) {
			templates = res.templates;
		}
	}

	async function refreshProjects(ev) {
		projects = [...projects, ev.detail];
		console.log('Projects now:', projects);
	}
</script>

<svelte:head>
	<title>Home | S2QUAT</title>
</svelte:head>

<div class="rootContainer">
	{#if projectsExpanded}
		<Surface
			title="Projekte"
			clickArea={true}
			on:click={() => (projectsExpanded = !projectsExpanded)}
		>
			<Table on:create={() => (projectPrompt = true)}>
				<TableAttributes>
					<TableAttributesItem>ID</TableAttributesItem>
					<TableAttributesItem>Unternehmen</TableAttributesItem>
					<TableAttributesItem>Status</TableAttributesItem>
					<TableAttributesItem>Name</TableAttributesItem>
					<TableAttributesItem>Beschreibung</TableAttributesItem>
				</TableAttributes>
				<TableBody>
					{#each projects as project}
						<TableBodyRow on:click={() => goto('/project/' + project.id)}>
							<TableBodyItem>{project.id}</TableBodyItem>
							<TableBodyItem type="img" imgName={project.company ? project.company.logo : '-'} />
							<TableBodyItem>{project.status}</TableBodyItem>
							<TableBodyItem>{project.name}</TableBodyItem>
							<TableBodyItem>{project.description}</TableBodyItem>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</Surface>
	{:else}
		<CardRow
			title="Projekte"
			clickArea={true}
			on:click={() => (projectsExpanded = !projectsExpanded)}
		>
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
			<AddCard on:click={() => (projectPrompt = true)} />
		</CardRow>
	{/if}
	<ProjectPrompt on:success={refreshProjects} bind:open={projectPrompt} />

	<div class="row">
		<Surface title="Qualitätsmodell" clickArea={true} on:click={() => goto('/model')}>
			<Model />
		</Surface>
		<Surface title="Vorlagen" padding={true} clickArea={true} on:click={() => goto('/template')}>
			<List>
				{#each templates as template}
					<ListItemRow
						clickArea={true}
						flexstart={true}
						on:click={goto(`/template/${template.id}`)}
					>
						<div class="templateIcon">
							<Icon name="template" fill={true} />
						</div>
						<p class="templateName">
							{template.name}
						</p>
					</ListItemRow>
				{/each}
				<ListItemRowAdd on:click={() => (templatePrompt = true)} text={'Neues Template'} />
			</List>
		</Surface>
	</div>
</div>

<style>
	.rootContainer {
		display: flex;
		flex-direction: column;
	}
	.row {
		display: flex;
		flex-direction: row;
	}
	.templateIcon {
		width: 2rem;
		height: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.templateName {
		margin-left: 1rem;
	}
</style>
