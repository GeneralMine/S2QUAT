<script context="module">
	import { get, roflul } from '$lib/api';

	export async function load({ session }) {
		if (session.user !== undefined) {
			let { res, err } = await roflul(() => get(`user/${session.user.id}/projects`));

			if (res) {
				console.log(res);
				console.log(res.projects);

				return { props: { projects: res.projects } };
			}
		}

		return { status: 400, error: new Error('yeeto? ' + `user/${session.user.id}/projects`) };
	}
</script>

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
	export let projects = [];
	export let templates = [];
</script>

<svelte:head>
	<title>Home | S2QUAT</title>
</svelte:head>

<div>
	<Surface title="Projekte">
		<Table>
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

	<CardRow title="Projekte" url="/company">
		{#each projects as project}
			<ProjectCard {project} />
		{/each}
	</CardRow>
	<CardRow title="Qualitätsmodell" url="/model" />
	<CardRow title="Vorlagen" url="/template">
		{#each templates as template}
			<TemplateCard {template} />
		{/each}
	</CardRow>
</div>
