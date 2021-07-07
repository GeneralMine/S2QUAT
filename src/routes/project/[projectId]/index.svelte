<script context="module">
	import { get } from '$lib/api.js';
	export async function load({ page, session, fetch }) {
		try {
			let { project } = await get(`project/${page.params.projectId}/get`, session.token, fetch);
			return { props: { project } };
		} catch (err) {
			return { status: err.code, error: err };
		}
	}
</script>

<script>
	export let project;
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
		CrumbBuilder.create(project.name, `/project/${project.id}`, 'project').build()
	];
	/*******************************************/

	import { goto } from '$app/navigation';
	import List from '$lib/List/List.svelte';
	import ListItemRow from '$lib/List/ListItemRow.svelte';
	import CardRow from '$lib/Cards/CardComponents/CardRow.svelte';
	import ImageCard from '$lib/Cards/ImageCard.svelte';
	import PieCard from '$lib/Cards/PieCard.svelte'; // only working in production
	import DateCard from '$lib/Cards/DateCard.svelte';
	import Card from '$lib/Cards/CardComponents/Card.svelte';
	import EnumCard from '$lib/Cards/EnumCard.svelte';
	import Icon from '$lib/Common/Icon.svelte';
	import TitledCard from '$lib/Cards/CardComponents/TitledCard.svelte';
	import ScenarioCard from '$lib/Cards/ScenarioCard.svelte';
	import AddCard from '$lib/Cards/AddCard.svelte';
	import ListItemRowAdd from '$lib/List/ListItemRowAdd.svelte';
	import ScenarioPrompt from '$lib/Prompt/ScenarioPrompt.svelte';

	export let scenarioPrompt = false;

	async function refreshScenarios(ev) {
		project.scenarios = [...project.scenarios, ev.detail];
	}
</script>

<svelte:head>
	<title>{project.name} | S2QUAT</title>
</svelte:head>

<div class="projectContainer">
	<CardRow title={project.name}>
		{#if project.company}
			<ImageCard
				title="Unternehmen"
				src={project.company.logo}
				on:click={goto(`/company/${project.company.id}`)}
			/>
		{:else}
			<AddCard title="Verknüpfe Unternehmen" />
		{/if}

		<!-- Only working in production! -->
		<PieCard />
		<PieCard />
		<PieCard />
		<!-- /Only working in production! -->

		<DateCard startDate={project.project_start} endDate={project.project_end} />
	</CardRow>

	<div class="row">
		<div class="column">
			<TitledCard title="Projektbeschreibung">
				<p class="description textBlock">{project.description}</p>
			</TitledCard>
			<CardRow title="Szenarien" smallTitle={true}>
				{#each project.scenarios as scenario}
					<ScenarioCard
						name={scenario.name}
						description={scenario.description}
						on:click={goto(`/project/${project.id}/scenario/${scenario.id}`)}
					/>
				{/each}
				<AddCard on:click={() => (scenarioPrompt = true)} />
			</CardRow>
		</div>
		<CardRow column={true}>
			<EnumCard title={'Zieldefinitionen'} text={project.goal} responsiveHeight={true} />
			<TitledCard title="Betreuer" padding={true} responsiveHeight={true}>
				<List>
					{#each project.users as user}
						<ListItemRow clickArea={true} flexstart={true} on:click={goto(`/user/${user.id}`)}>
							<div class="userIcon">
								<Icon name="user" fill={true} />
							</div>
							<p class="userName">
								{user.name}
							</p>
						</ListItemRow>
					{/each}
					<ListItemRowAdd text={'Betreuer hinzufügen'} />
				</List>
			</TitledCard>
		</CardRow>
	</div>
</div>
<ScenarioPrompt
	project={project.id}
	projectsDisabled={true}
	on:success={refreshScenarios}
	bind:open={scenarioPrompt}
/>

<style>
	.projectContainer {
		display: flex;
		flex-direction: column;
	}
	.description {
		padding-left: 1em;
		padding-right: 1em;
	}
	.userIcon {
		width: 2rem;
		height: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.column {
		flex: 1;
	}
	.userName {
		margin-left: 1rem;
	}
</style>
