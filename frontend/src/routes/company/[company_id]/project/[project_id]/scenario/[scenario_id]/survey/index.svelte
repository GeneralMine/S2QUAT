<script>
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/company/ID', 'company').build(),
		CrumbBuilder.create('Projekt ID', '/company/ID/project/ID', 'project').build(),
		CrumbBuilder.create('Fragebögen', '/company/ID/project/ID/scenario/ID/survey', 'survey').build()
	];
	/*******************************************/
</script>

<svelte:head>
	<title>Szenario Fragebögen | S2QUAT</title>
</svelte:head>

Unternehmen Projekt Szenario Fragebögen
