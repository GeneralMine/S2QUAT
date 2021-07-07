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
	import CardRow from '$lib/Cards/CardComponents/CardRow.svelte';
	import TitledCard from '$lib/Cards/CardComponents/TitledCard.svelte';
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

<div class="surveyContainer">
	<CardRow title={survey.name}>
		<NumberCard title="Anzahl Abgaben" value={survey.responses.lenth} />
		<TitledCard title="Valide Abgaben">Charts kommen erst in v2.1.0</TitledCard>
		<TitledCard title="Handlungsbedarf">Charts kommen erst in v2.1.0</TitledCard>
	</CardRow>
	<CardRow title="Fragebogen" smallTitle={true}>
		<NumberCard title="Seiten" value={survey.pages.length} />
		<NumberCard title="Kategorien" value={survey.categories.length} />
		<NumberCard title="Fragen" value={survey.questions.length} />
	</CardRow>
</div>
