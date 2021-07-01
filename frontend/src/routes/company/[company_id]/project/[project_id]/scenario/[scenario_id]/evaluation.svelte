<script>
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/company/ID', 'company').build(),
		CrumbBuilder.create('Projekt ID', '/company/ID/project/ID', 'project').build(),
		CrumbBuilder.create('Szenario ID', '/company/ID/project/ID/scenario/ID', 'scenario').build(),
		CrumbBuilder.create(
			'Evaluation',
			'/company/ID/project/ID/scenario/ID/evaluation',
			'evaluation'
		).build()
	];
	/*******************************************/
</script>

<svelte:head>
	<title>Szenario ID | S2QUAT</title>
</svelte:head>

Unternehmen Projekt Szenario ID
