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
	import { del, unpack } from '$lib/utils/api.js';
	import { goto } from '$app/navigation';
	import Page from '$lib/Survey/SurveyPage/Page.svelte';
	import PagePrompt from '$lib/Prompt/PagePrompt.svelte';
	import CardRow from '$lib/Cards/CardComponents/CardRow.svelte';
	import NumberCard from '$lib/Cards/NumberCard.svelte';
	import Surface from '$lib/Common/Surface.svelte';
	import ListItemRowAdd from '$lib/List/ListItemRowAdd.svelte';
	import Table from '$lib/Table/Table.svelte';
	import TableAttributes from '$lib/Table/TableAttributes.svelte';
	import TableAttributesItem from '$lib/Table/TableAttributesItem.svelte';
	import TableBody from '$lib/Table/TableBody.svelte';
	import TableBodyItem from '$lib/Table/TableBodyItem.svelte';
	import TableBodyRow from '$lib/Table/TableBodyRow.svelte';
	import { parseDate, parseEnumToEmoji } from '$lib/utils/textParser';
	import PieCard from '$lib/Cards/PieCard.svelte';
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
		CrumbBuilder.create(survey.name, `/project/${project.id}/scenario/${scenario.id}/survey/${survey.id}`, 'survey').build()
	];
	/*******************************************/
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

	let limit = 5;
	let from = 0;
	let to = limit > survey.responses.length ? survey.responses.length : limit;

	let weirdo = true;

	let tableEntries = survey.responses.slice(from, to);

	function updateTable() {
		weirdo = false;
		tableEntries = survey.responses.slice(from, to);

		Promise.resolve().then(() => {
			weirdo = true;
		});
	}
</script>

<svelte:head>
	<title>{survey.name} | S2QUAT</title>
</svelte:head>

<div class="surveyContainer">
	<CardRow title={survey.name}>
		<NumberCard title="Anzahl Abgaben" value={survey.responses.length} />
		<PieCard
			title="Valide Abgaben"
			dataset={Object.values(
				survey.responses.reduce(
					(acc, el) => {
						if (el.type === 'VALID') acc.valid++;
						else if (el.type === 'INVALID') acc.invalid++;
						return acc;
					},
					{ valid: 0, invalid: 0 }
				)
			)}
			labels={['Valide', 'Invalide']}
			colorset={2}
		/>
		<PieCard
			clickArea={true}
			on:click={() => goto(`/project/${project.id}/scenario/${scenario.id}/survey/${survey.id}/evaluation`)}
			title="Handlungsbedarf"
		/>
	</CardRow>

	<Surface title="Antworten" smallTitle={true}>
		<Table count={survey.responses.length} {limit} on:update={updateTable} bind:from bind:to>
			<TableAttributes>
				<TableAttributesItem>Valide</TableAttributesItem>
				<TableAttributesItem>Testperson</TableAttributesItem>
				<TableAttributesItem>Protokollant</TableAttributesItem>
				<TableAttributesItem>Beantwortete Fragen</TableAttributesItem>
				<TableAttributesItem>Ort</TableAttributesItem>
				<TableAttributesItem>Feedback</TableAttributesItem>
				<TableAttributesItem>Notes</TableAttributesItem>
				<TableAttributesItem>Updated</TableAttributesItem>
			</TableAttributes>
			<TableBody>
				{#if weirdo}
					{#each tableEntries as response}
						<TableBodyRow on:click={() => goto(`/project/${project.id}/scenario/${scenario.id}/survey/${survey.id}/response/${response.id}`)}>
							<TableBodyItem>{parseEnumToEmoji(response.type)}</TableBodyItem>
							<TableBodyItem>{response.testperson.name}</TableBodyItem>
							<TableBodyItem>{response.user.name}</TableBodyItem>
							<TableBodyItem>{response.answers.length} / {survey.questions.length}</TableBodyItem>
							<TableBodyItem>{response.location}</TableBodyItem>
							<TableBodyItem>{response.feedback}</TableBodyItem>
							<TableBodyItem>{response.notes}</TableBodyItem>
							<TableBodyItem>{parseDate(response.updatedAt)}</TableBodyItem>
						</TableBodyRow>
					{/each}
				{/if}
			</TableBody>
		</Table>
	</Surface>

	<Surface title="Der Fragebogen" smallTitle={true} padding={true} margin={true}>
		<div slot="header">
			<button on:click={() => goto(`/project/${project.id}/scenario/${scenario.id}/survey/${survey.id}/survey`)}>Fragebogen starten</button>
		</div>
		{#each survey.pages as page}
			<Surface
				title={page.name}
				edit={true}
				on:edit={() => {
					selectedPage = page;
					pagePrompt = true;
				}}
				remove={true}
				on:remove={() => {
					removePage(page);
				}}
			>
				<div>
					<Page bind:page edit={true} expanded={true} {survey} {project} {scenario} />
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
