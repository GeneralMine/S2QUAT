<script context="module">
	import { get } from '$lib/utils/api.js';
	export async function load({ page, session, fetch }) {
		try {
			let [{ project }, { scenario }, { survey }] = await Promise.all([
				get(`project/${page.params.projectId}/get`, session.token, fetch),
				get(`project/${page.params.projectId}/scenario/${page.params.scenarioId}/get`, session.token, fetch),
				get(`project/${page.params.projectId}/scenario/${page.params.scenarioId}/survey/${page.params.surveyId}/get`, session.token, fetch)
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
	import Surface from '$lib/Common/Surface.svelte';
	import ListItemRowAdd from '$lib/List/ListItemRowAdd.svelte';
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Layout/Nav/Breadcrumbs/breadcrumbs';
	import Page from '$lib/Survey/SurveyPage/Page.svelte';
	import PagePrompt from '$lib/Prompt/PagePrompt.svelte';
	$crumbs = [];
	if (project.company) {
		$crumbs = [CrumbBuilder.create(project.company.name, `/company/${project.company.id}`, 'company').build()];
	}
	$crumbs = [
		...$crumbs,
		CrumbBuilder.create(project.name, `/project/${project.id}`, 'project').build(),
		CrumbBuilder.create(scenario.name, `/project/${project.id}/scenario/${scenario.id}`, 'scenario').build(),
		CrumbBuilder.create(survey.name, `/project/${project.id}/scenario/${scenario.id}/survey/${survey.id}`, 'survey').build()
	];
	/*******************************************/
	import { del, unpack } from '$lib/utils/api.js';
	import { goto } from '$app/navigation';
	let pagePrompt = false;
	let selectedPage;

	async function refreshPages(ev) {
		if (ev.detail.updated) {
			for (let index = 0; index < survey.pages.length; index++) {
				if (survey.pages[index].id === ev.detail.page.id) {
					survey.pages[index].name = ev.detail.page.name;
					survey.pages[index].description = ev.detail.page.description;
					break;
				}
			}
		} else {
			survey.pages = [...survey.pages, ev.detail.page];
		}
		sort();
	}

	async function removePage(page) {
		const { res, err } = await unpack(() => del(`project/${project.id}/scenario/${scenario.id}/survey/${survey.id}/page/${page.id}`));
		if (res.id) {
			for (let index = 0; index < survey.pages.length; index++) {
				if (survey.pages[index].id === res.id) {
					survey.pages.splice(index, 1);
					survey.pages = [...survey.pages];
					break;
				}
			}
		}
		sort();
	}

	function sort() {
		survey.pages.sort((a, b) => a.order - b.order);
	}
	sort();
</script>

<svelte:head>
	<title>{survey.name} | S2QUAT</title>
</svelte:head>

<div class="surveyContainer">
	<CardRow title={survey.name}>
		<NumberCard title="Anzahl Abgaben" value={survey.responses.length} />
		<TitledCard title="Valide Abgaben">Charts kommen erst in v2.1.0</TitledCard>
		<TitledCard title="Handlungsbedarf">Charts kommen erst in v2.1.0</TitledCard>
	</CardRow>

	<Surface smallTitle={true} title="Der Fragebogen" padding={true} margin={true}>
		<div slot="header">
			<button on:click={() => goto(`/project/${project.id}/scenario/${scenario.id}/survey/${survey.id}/survey`)}>Fragebogen starten</button>
		</div>
		{#each survey.pages as page}
			<Surface
				title={page.name}
				edit={true}
				on:edit={() => {
					selectedPage = page;
					console.log('Now selected', selectedPage);
					pagePrompt = true;
				}}
				remove={true}
				on:remove={() => {
					removePage(page);
				}}
			>
				<div>
					<Page bind:page edit={true} {survey} {project} {scenario} />
					<hr />
				</div>
			</Surface>
		{/each}
		<ListItemRowAdd text="Neue Seite hinzufügen" on:click={() => (pagePrompt = true)} />
	</Surface>
</div>

<PagePrompt
	project={project.id}
	scenario={scenario.id}
	survey={survey.id}
	bind:page={selectedPage}
	on:success={refreshPages}
	bind:open={pagePrompt}
/>
