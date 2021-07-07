<script context="module">
	import { get } from '$lib/api.js';
	import CardRow from '$lib/Cards/CardComponents/CardRow.svelte';
	export async function load({ page, session, fetch }) {
		try {
			let [{ project }, { scenario }] = await Promise.all([
				get(`project/${page.params.projectId}/get`, session.token, fetch),
				get(
					`project/${page.params.projectId}/scenario/${page.params.scenarioId}/get`,
					session.token,
					fetch
				)
			]);
			return { props: { project, scenario } };
		} catch (err) {
			return { status: err.code, error: err };
		}
	}
</script>

<script>
	export let project;
	export let scenario;
	import NumberCard from '$lib/Cards/NumberCard.svelte';
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [];
	if (project.company) {
		$crumbs = [
			CrumbBuilder.create(project.company.name, `/company/${project.company.id}`, 'company').build()
		];
	}
	$crumbs = [
		...$crumbs,
		CrumbBuilder.create(project.name, `/project/${project.id}`, 'project').build(),
		CrumbBuilder.create(
			scenario.name,
			`/project/${project.id}/scenario/${scenario.id}`,
			'scenario'
		).build()
	];
	/*******************************************/
</script>

<svelte:head>
	<title>{scenario.name} | S2QUAT</title>
</svelte:head>

<div class="scenarioContainer">
	<CardRow title={scenario.name}>
		<NumberCard title="Anzahl Umfragen" value={scenario.surveys.length} />
		<NumberCard title="Anzahl Durchlauf" value={scenario.surveys.length} />
	</CardRow>
</div>

<style>
	.scenarioContainer {
		display: flex;
		flex-direction: column;
	}
</style>
