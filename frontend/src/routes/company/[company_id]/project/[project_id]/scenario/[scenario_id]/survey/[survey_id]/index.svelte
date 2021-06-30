<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/company/ID', 'company').build(),
		CrumbBuilder.create('Projekt ID', '/company/ID/project/ID', 'project').build(),
		CrumbBuilder.create(
			'Fragebogen ID',
			'/company/ID/project/ID/scenario/ID/survey/ID',
			'frageboegen'
		).build()
	];
</script>

<svelte:head>
	<title>Szenario Fragebogen ID | S2QUAT</title>
</svelte:head>

Unternehmen Projekt Szenario Fragebögen ID
