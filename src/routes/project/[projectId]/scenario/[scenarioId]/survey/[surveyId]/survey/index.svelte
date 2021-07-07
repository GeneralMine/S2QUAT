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

	import Surface from '$lib/Common/Surface.svelte';
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	import Page from '$lib/Survey/SurveyPage/Page.svelte';
	import SurveyScenarioPage from '$lib/Survey/SurveyScenarioPage.svelte';
	import SurveySendPage from '$lib/Survey/SurveySendPage.svelte';
	$crumbs = [
		CrumbBuilder.create(
			survey.name,
			`/project/${project.id}/scenario/${scenario.id}/survey/${survey.id}/survey`,
			'survey'
		).build()
	];
	for (const page of survey.pages) {
		$crumbs = [
			...$crumbs,
			CrumbBuilder.create(
				page.name,
				`/project/${project.id}/scenario/${scenario.id}/survey/${survey.id}/survey`,
				'survey'
			).build()
		];
	}
	$crumbs = [
		...$crumbs,
		CrumbBuilder.create(
			'Send Page',
			`/project/${project.id}/scenario/${scenario.id}/survey/${survey.id}/survey`,
			'survey'
		).build()
	];
	/*******************************************/

	// Tabs
	let page_index = -1;
	let max_index = survey.pages.length;
	function back() {
		page_index--;
	}
	function forward() {
		if (page_index === max_index) {
			send();
		} else {
			page_index++;
		}
		console.log(survey);
	}

	// Data
	let testperson = {
		signature: false
	};
	$: console.log('testperson is', testperson);
	let place;
	let feedback;

	// Send
	function send() {
		let newResponse = {
			surveyId: survey.id,
			testperson,
			place,
			feedback,
			answers: []
		};
		for (const page of survey.pages) {
			for (const category of page.categories) {
				for (const question of category.questions) {
					if (
						question.answer &&
						(question.answer.score ||
							question.answer.text ||
							question.answer.boolean ||
							question.answer.checkbox ||
							question.answer.radiobutton)
					) {
						newResponse.answers.push({
							questionId: question.id,
							score: question.answer.score,
							text: question.answer.text,
							boolean: question.answer.boolean,
							checkbox: question.answer.checkbox,
							radiobutton: question.answer.radiobutton
						});
					}
				}
			}
		}
		console.log('Send newResponse:', newResponse);
	}
</script>

<svelte:head>
	<title>{survey.name} | S2QUAT</title>
</svelte:head>

<div class="surveyContainer">
	<div class="surveyInnerContainer">
		<Surface
			title={page_index === -1
				? scenario.name
				: page_index === max_index
				? 'Abschicken'
				: survey.pages[page_index].name}
		>
			<div class="content">
				{#if page_index === -1}
					<SurveyScenarioPage {scenario} />
				{:else if page_index === max_index}
					<SurveySendPage bind:testperson />
				{:else}
					{#each [survey.pages[page_index]] as page (page_index)}
						<Page bind:page />
					{/each}
				{/if}
			</div>

			<div class="button_group">
				<button disabled={page_index === -1} on:click={back}>Zurück</button>
				<button disabled={page_index === max_index && !testperson.signature} on:click={forward}>
					{page_index === max_index ? 'Send' : 'Weiter'}
				</button>
			</div>
		</Surface>
	</div>
</div>

<style>
	.surveyContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.surveyInnerContainer {
		width: 70rem;
	}
	.button_group {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 1em;
	}
</style>