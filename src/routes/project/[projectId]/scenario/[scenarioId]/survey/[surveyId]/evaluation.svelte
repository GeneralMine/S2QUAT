<script context="module">
	import { get } from '$lib/utils/api.js';
	export async function load({ page, session, fetch }) {
		try {
			let [{ project }, { scenario }, { survey }, { evaluation }] = await Promise.all([
				get(`project/${page.params.projectId}/get`, session.token, fetch),
				get(`project/${page.params.projectId}/scenario/${page.params.scenarioId}/get`, session.token, fetch),
				get(`project/${page.params.projectId}/scenario/${page.params.scenarioId}/survey/${page.params.surveyId}/get`, session.token, fetch),
				get(
					`project/${page.params.projectId}/scenario/${page.params.scenarioId}/survey/${page.params.surveyId}/evaluation.json`,
					session.token,
					fetch
				)
			]);
			return { props: { project, scenario, survey, evaluation } };
		} catch (err) {
			return { status: err.code, error: err };
		}
	}
</script>

<script>
	export let project;
	export let scenario;
	export let survey;
	export let evaluation;

	import Overview from '$lib/Model/Overview.svelte';
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Layout/Nav/Breadcrumbs/breadcrumbs';
	import Surface from '$lib/Common/Surface.svelte';
	import EvalField from '$lib/evaluation/EvalField.svelte';
	import Model from '$lib/Model/Model.svelte';
	$crumbs = [];
	if (project.company) {
		$crumbs = [CrumbBuilder.create(project.company.name, `/company/${project.company.id}`, 'company').build()];
	}
	$crumbs = [
		...$crumbs,
		CrumbBuilder.create(project.name, `/project/${project.id}`, 'project').build(),
		CrumbBuilder.create(scenario.name, `/project/${project.id}/scenario/${scenario.id}`, 'scenario').build(),
		CrumbBuilder.create(survey.name, `/project/${project.id}/scenario/${scenario.id}/survey/${survey.id}`, 'survey').build(),
		CrumbBuilder.create('Evaluation', `/project/${project.id}/scenario/${scenario.id}/survey/${survey.id}/evaluation`, 'evaluation').build()
	];
	/*******************************************/
</script>

<svelte:head>
	<title>Evaluation - {survey.name} | S2QUAT</title>
</svelte:head>
<h1>Evaluation - {survey.name}</h1>

<Surface>
	<Overview />
	<div class="dataModel">
		<Model />
	</div>
</Surface>

<Surface title="Der Fragebogen" smallTitle={true} padding={true} margin={true}>
	{#each evaluation as field}
		<EvalField bind:field expanded={true} />
		<hr />
	{/each}
</Surface>

<style>
	.dataModel {
		width: 100%;
		height: 400px;
		transform: scale(0.6);
		-webkit-transform: scale(0.6);
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
	}
</style>
