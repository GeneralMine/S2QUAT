<script context="module">
	export async function load({ page }) {
		return {
			props: {
				projectId: page.params.projectId,
				scenarioId: page.params.scenarioId,
				surveyId: page.params.surveyId
			}
		};
	}
</script>

<script>
	export let projectId;
	export let scenarioId;
	export let surveyId;
	let project = {
		name: 'Projekt',
		description: 'Beschreibung',
		goal: '',
		project_start: new Date(),
		project_end: new Date(),
		status: 'ACTIVE',
		company: {},
		scenarios: [],
		users: []
	};
	let scenario = {
		name: 'Projekt',
		description: 'Beschreibung'
	};
	let survey = {
		name: 'Projekt',
		description: 'Beschreibung',
		categories: [],
		pages: [],
		questions: [],
		responses: [],
		scenario: [],
		tempalte: []
	};
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	import { onMount } from 'svelte';
	import { session } from '$app/stores';
	import { get } from '$lib/api.js';
	onMount(async () => {
		if ($session.user) {
			let [resProject, resScenario, resSurvey] = await Promise.all([
				get(`project/${projectId}/get`),
				get(`project/${projectId}/scenario/${scenarioId}/get`),
				get(`project/${projectId}/scenario/${scenarioId}/survey/${surveyId}/get`)
			]);
			project = resProject.project;
			scenario = resScenario.scenario;
			survey = resSurvey.survey;
			if (project.company) {
				$crumbs = [
					...$crumbs,
					CrumbBuilder.create(
						project.company.name,
						`/company/${project.company.id}`,
						'company'
					).build()
				];
			}
			$crumbs = [
				...$crumbs,
				CrumbBuilder.create(project.name, `/project/${project.id}`, 'project').build()
			];
			$crumbs = [
				...$crumbs,
				CrumbBuilder.create(
					scenario.name,
					`/project/${project.id}/scenario/${scenario.id}`,
					'scenario'
				).build()
			];
			$crumbs = [
				...$crumbs,
				CrumbBuilder.create(
					survey.name,
					`/project/${project.id}/scenario/${scenario.id}/survey/${survey.id}`,
					'survey'
				).build()
			];
		}
	});
	/*******************************************/
	$: console.log('Project:', project);
	$: console.log('Scenario:', scenario);
	$: console.log('Survey:', survey);
</script>

<svelte:head>
	<title>Szenario Fragebogen ID | S2QUAT</title>
</svelte:head>

{survey.name} | {scenario.name} | {project.name}
