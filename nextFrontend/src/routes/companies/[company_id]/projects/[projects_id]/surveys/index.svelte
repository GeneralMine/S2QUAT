<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/companies/ID', 'companies').build(),
		CrumbBuilder.create('Projekt ID', '/companies/ID/projects/ID', 'projects').build(),
		CrumbBuilder.create('Fragebögen', '/companies/ID/projects/ID/surveys', 'surveys').build()
	];
</script>

<svelte:head>
	<title>Projekt Fragebögen | S2QUAT</title>
</svelte:head>

Company Project Surveys
