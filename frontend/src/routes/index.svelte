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
	$crumbs = [CrumbBuilder.create('Home', '/', 'home').build()];
	/*******************************************/
	import { goto } from '$app/navigation';

	import Table from '$lib/Table/Table.svelte';
	import Surface from '$lib/Common/Surface.svelte';
	import TableBody from '$lib/Table/TableBody.svelte';
	import TableHeader from '$lib/Table/TableHeader.svelte';
	import TableBodyRow from '$lib/Table/TableBodyRow.svelte';
	import TableBodyItem from '$lib/Table/TableBodyItem.svelte';
	import TableHeaderItem from '$lib/Table/TableHeaderItem.svelte';
	import TemplateCard from '$lib/Cards/TemplateCard.svelte';
	import ProjectCard from '$lib/Cards/ProjectCard.svelte';
	import CardRow from '$lib/Cards/CardComponents/CardRow.svelte';
	export let projects = [];
	export let templates = [];
</script>

<svelte:head>
	<title>Home | S2QUAT</title>
</svelte:head>

<div>
	<Surface title="Projekte">
		<Table>
			<TableHeader>
				<TableHeaderItem>ID</TableHeaderItem>
				<TableHeaderItem>Company</TableHeaderItem>
				<TableHeaderItem>Status</TableHeaderItem>
				<TableHeaderItem>Name</TableHeaderItem>
				<TableHeaderItem>Beschreibung</TableHeaderItem>
			</TableHeader>
			<TableBody>
				{#each projects as project}
					<TableBodyRow
						on:click={async () =>
							await goto('/company/' + project.Company.id + '/project/' + project.id)}
					>
						<TableBodyItem>{project.id}</TableBodyItem>
						<TableBodyItem type="img" imgName={project.Company.logo} />
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
