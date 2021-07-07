<script context="module">
	import { get } from '$lib/api.js';
	export async function load({ page, session, fetch }) {
		try {
			let [{ project }, { scenario }, { survey }] = await Promise.all([
				get(`project/${page.params.projectId}/get`, session.token, fetch),
				get(
					`project/${page.params.projectId}/scenario/${page.params.scenarioId}/get`,
					session.token,
					fetch
				),
				get(
					`project/${page.params.projectId}/scenario/${page.params.scenarioId}/survey/${page.params.surveyId}/get`,
					session.token,
					fetch
				)
			]);
			return { props: { project, scenario, survey } };
		} catch (err) {
			return { status: err.code, error: err };
		}
	}
</script>

<script>
	export let project;
	export let scenario;
	export let survey;
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
		).build(),
		CrumbBuilder.create(
			survey.name,
			`/project/${project.id}/scenario/${scenario.id}/survey/${survey.id}`,
			'survey'
		).build()
	];
	/*******************************************/
</script>

<svelte:head>
	<title>{survey.name} | S2QUAT</title>
</svelte:head>

{survey.name} | {scenario.name} | {project.name}
