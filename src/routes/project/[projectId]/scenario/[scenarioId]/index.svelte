<script context="module">
	export async function load({ page }) {
		return { props: { projectId: page.params.projectId, scenarioId: page.params.scenarioId } };
	}
</script>

<script>
	export let projectId;
	export let scenarioId;
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
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	import { onMount } from 'svelte';
	import { session } from '$app/stores';
	import { get } from '$lib/api.js';
	onMount(async () => {
		if ($session.user) {
			let [resProject, resScenario] = await Promise.all([
				get(`project/${projectId}/get`),
				get(`project/${projectId}/scenario/${scenarioId}/get`)
			]);
			project = resProject.project;
			scenario = resScenario.scenario;
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
		}
	});
	/*******************************************/
	$: console.log('Project:', project);
	$: console.log('Scenario:', scenario);
</script>

<svelte:head>
	<title>Szenario ID | S2QUAT</title>
</svelte:head>

{scenario.name} | {project.name}
