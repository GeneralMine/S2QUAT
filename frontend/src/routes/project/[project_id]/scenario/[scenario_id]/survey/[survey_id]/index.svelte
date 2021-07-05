<script>
	export let project;
	export let scenario;
	export let survey;
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	let companyCrumb;
	if (project.company) {
		companyCrumb = CrumbBuilder.create(
			project.company.name,
			'/company/' + project.company.id,
			'company'
		).build();
	}
	$crumbs = [
		CrumbBuilder.create(project.name, '/project/' + project.id, 'project').build(),
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
	$crumbs = [companyCrumb, ...$crumbs];
	/*******************************************/
</script>

<svelte:head>
	<title>Szenario Fragebogen ID | S2QUAT</title>
</svelte:head>

Unternehmen Projekt Szenario Fragebögen ID
