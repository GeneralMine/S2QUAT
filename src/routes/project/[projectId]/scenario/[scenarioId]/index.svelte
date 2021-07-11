<script context="module">
	import { get } from '$lib/utils/api.js';
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
	import AddCard from '$lib/Cards/AddCard.svelte';
	import NumberCard from '$lib/Cards/NumberCard.svelte';
	import SurveyCard from '$lib/Cards/SurveyCard.svelte';
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Layout/Nav/Breadcrumbs/breadcrumbs';
	import SurveyPrompt from '$lib/Prompt/SurveyPrompt.svelte';
	import { goto } from '$app/navigation';
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

	let surveyPrompt = false;

	async function refreshSurveys(ev) {
		scenario.surveys = [...scenario.surveys, ev.detail];
		console.log(scenario.surveys);
	}
</script>

<svelte:head>
	<title>{scenario.name} | S2QUAT</title>
</svelte:head>

<div class="scenarioContainer">
	<CardRow title={scenario.name}>
		<NumberCard title="Anzahl Durchläufe" value={scenario.surveys.length} />
		<NumberCard title="Anzahl Fragebögen" value={scenario.surveys.length} />
	</CardRow>
	<CardRow title="Fragebogen" smallTitle={true}>
		{#each scenario.surveys as survey}
			<SurveyCard
				{survey}
				on:click={goto(`/project/${project.id}/scenario/${scenario.id}/survey/${survey.id}`)}
			/>
		{/each}
		<AddCard on:click={() => (surveyPrompt = true)} />
	</CardRow>
</div>
<SurveyPrompt
	project={project.id}
	scenario={scenario.id}
	scenariosDisabled={true}
	on:success={refreshSurveys}
	bind:open={surveyPrompt}
/>

<style>
	.scenarioContainer {
		display: flex;
		flex-direction: column;
	}
</style>
