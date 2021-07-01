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
	import CardRow from '$lib/Cards/CardComponents/CardRow.svelte';
	import ProjectCard from '$lib/Cards/ProjectCard.svelte';
	import TemplateCard from '$lib/Cards/TemplateCard.svelte';

	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [CrumbBuilder.create('Home', '/', 'home').build()];

	export let projects = [];

	let projects_mock = [
		{
			id: 0,
			name: 'Pinguinkolonie',
			company: {
				id: 0,
				name: 'Pinguland',
				logo: 'default'
			},
			scenarios: 1,
			users: 2
		},
		{
			id: 1,
			name: 'S2QUAT Tool',
			company: {
				id: 1,
				name: 'Fraunhofer',
				logo: 'fraunhofer'
			},
			scenarios: 3,
			users: 5
		},
		{
			id: 2,
			name: 'Anderes Projekt',
			company: {
				id: 2,
				name: 'Flughafen Stuttgart',
				logo: 'StuttgartAirport'
			},
			scenarios: 2,
			users: 1
		}
	];

	let templates = [
		{
			id: 0,
			name: 'Penguin',
			logo: 'default',
			employees: 4,
			projekte: 2
		},
		{
			id: 1,
			name: 'Fraunhofer',
			logo: 'fraunhofer',
			employees: 1,
			projekte: 3
		}
	];
</script>

<svelte:head>
	<title>Home | S2QUAT</title>
</svelte:head>

<div>
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

<style>
</style>
