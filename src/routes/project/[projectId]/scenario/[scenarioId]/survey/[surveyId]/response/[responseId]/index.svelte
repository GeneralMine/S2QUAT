<script context="module">
	import { get } from '$lib/utils/api.js';
	export async function load({ page, session, fetch }) {
		try {
			let [{ project }, { scenario }, { survey }, { response }] = await Promise.all([
				get(`project/${page.params.projectId}/get`, session.token, fetch),
				get(`project/${page.params.projectId}/scenario/${page.params.scenarioId}/get`, session.token, fetch),
				get(`project/${page.params.projectId}/scenario/${page.params.scenarioId}/survey/${page.params.surveyId}/get`, session.token, fetch),
				get(
					`project/${page.params.projectId}/scenario/${page.params.scenarioId}/survey/${page.params.surveyId}/response/${page.params.responseId}/get`,
					session.token,
					fetch
				)
			]);
			return { props: { project, scenario, survey, response } };
		} catch (err) {
			return { status: err.code, error: err };
		}
	}
</script>

<script>
	export let project;
	export let scenario;
	export let survey;
	export let response;
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Layout/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [];
	if (project.company) {
		$crumbs = [CrumbBuilder.create(project.company.name, `/company/${project.company.id}`, 'company').build()];
	}
	$crumbs = [
		...$crumbs,
		CrumbBuilder.create(project.name, `/project/${project.id}`, 'project').build(),
		CrumbBuilder.create(scenario.name, `/project/${project.id}/scenario/${scenario.id}`, 'scenario').build(),
		CrumbBuilder.create(survey.name, `/project/${project.id}/scenario/${scenario.id}/survey/${survey.id}`, 'survey').build(),
		CrumbBuilder.create(
			response.testperson.name,
			`/project/${project.id}/scenario/${scenario.id}/survey/${survey.id}/response/${response.id}`,
			'response'
		).build()
	];
	/*******************************************/
	import Page from '$lib/Survey/SurveyPage/Page.svelte';
	import CardRow from '$lib/Cards/CardComponents/CardRow.svelte';
	import NumberCard from '$lib/Cards/NumberCard.svelte';
	import Surface from '$lib/Common/Surface.svelte';
	import TitledCard from '$lib/Cards/CardComponents/TitledCard.svelte';
	import TestpersonCard from '$lib/Cards/TestpersonCard.svelte';

	function refreshAnswers() {
		for (const page of survey.pages) {
			for (const category of page.categories) {
				for (const question of category.questions) {
					// got the question object

					// find the corresponding answer
					for (const answer of response.answers) {
						if (question.id === answer.question.id) {
							question.answer = {};
							question.answer.score = answer.score;
							question.answer.text = answer.text;
							question.answer.boolean = answer.boolean;
							question.answer.checkbox = answer.checkbox;
							question.answer.radiobutton = answer.radiobutton;
						}
					}
				}
			}
		}
	}
	refreshAnswers();
</script>

<svelte:head>
	<title>{response.testperson.name} | S2QUAT</title>
</svelte:head>

<div class="surveyContainer">
	<CardRow title="Testperson">
		<TestpersonCard testperson={response.testperson} />
		<NumberCard title="Anzahl beantwortete Fragen" value={response.answers.length + '/' + survey.questions.length} />
		<NumberCard title="Protokollant" value={response.user.name} />
		<NumberCard title="Ort oder Situation" value={response.location} />
	</CardRow>

	<div class="row">
		<div class="column">
			<TitledCard title="Feedback">
				<p class="feedback textBlock">{response.feedback}</p>
			</TitledCard>
		</div>
		<div class="column">
			<TitledCard title="Notizen zur Durchführung">
				<p class="notes textBlock">{response.notes}</p>
			</TitledCard>
		</div>
	</div>

	<Surface title="Antworten" smallTitle={true} padding={true} margin={true}>
		{#each survey.pages as page}
			<Surface title={page.name}>
				<div>
					<Page bind:page {survey} {project} {scenario} expanded={true} />
					<hr />
				</div>
			</Surface>
		{/each}
	</Surface>
</div>

<style>
	.column {
		flex: 1;
	}
</style>
