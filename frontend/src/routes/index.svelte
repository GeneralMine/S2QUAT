<script>
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [];
	/*******************************************/
	import { goto } from '$app/navigation';

	import Table from '$lib/Table/Table.svelte';
	import Surface from '$lib/Common/Surface.svelte';
	import TableBody from '$lib/Table/TableBody.svelte';
	import TableAttributes from '$lib/Table/TableAttributes.svelte';
	import ProjectCard from '$lib/Cards/ProjectCard.svelte';
	import TemplateCard from '$lib/Cards/TemplateCard.svelte';
	import TableBodyRow from '$lib/Table/TableBodyRow.svelte';
	import TableBodyItem from '$lib/Table/TableBodyItem.svelte';
	import CardRow from '$lib/Cards/CardComponents/CardRow.svelte';
	import TableAttributesItem from '$lib/Table/TableAttributesItem.svelte';
	import ProjectModal from '$lib/Prompt/ProjectPrompt.svelte';
	import NumberCard from '$lib/Cards/NumberCard.svelte';

	import { onMount } from 'svelte';
	import { session } from '$app/stores';
	import { get } from '$lib/api.js';
	onMount(async () => {
		if ($session.user) {
			let res = await get(`project/list`);
			projects = res.projects;
		}
	});

	let projects = [];
	let templates = [];

	let projectsExpanded = false;
	let projectPrompt = false;
</script>

<svelte:head>
	<title>Home | S2QUAT</title>
</svelte:head>

<div>
	{#if projectsExpanded}
		<Surface title="Projekte" on:click={() => (projectsExpanded = !projectsExpanded)}>
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
						<TableBodyRow on:click={async () => await goto('/project/' + project.id)}>
							<TableBodyItem>{project.id}</TableBodyItem>
							<TableBodyItem
								type="img"
								imgName={project.company !== null ? project.company.logo : '-'}
							/>
							<TableBodyItem>{project.status}</TableBodyItem>
							<TableBodyItem>{project.name}</TableBodyItem>
							<TableBodyItem>{project.description}</TableBodyItem>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</Surface>
	{:else}
		<CardRow title="Projekte" on:click={() => (projectsExpanded = !projectsExpanded)}>
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
		</CardRow>
	{/if}

	<CardRow title="Qualitätsmodell" on:click={() => goto('/model')}>
		<NumberCard title="Felder" value={12} />
		<NumberCard title="Felder" value={33} />
		<NumberCard title="Felder" value={100} />
		<NumberCard title="Felder" value={300} />
	</CardRow>
	<CardRow title="Vorlagen">
		{#each templates as template}
			<TemplateCard {template} />
		{/each}
	</CardRow>

	<ProjectModal open={projectPrompt} />
</div>
