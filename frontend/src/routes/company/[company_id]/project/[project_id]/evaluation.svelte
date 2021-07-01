<script>
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/company/ID', 'company').build(),
		CrumbBuilder.create('Projekt ID', '/company/ID/project/ID', 'project').build(),
		CrumbBuilder.create('Evaluation', '/company/ID/project/ID/evaluation', 'evaluation').build()
	];
	/*******************************************/
</script>

<svelte:head>
	<title>Projekt Evaluation | S2QUAT</title>
</svelte:head>

Company Project Evaluation
