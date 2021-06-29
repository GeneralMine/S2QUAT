<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/unternehmen/ID', 'unternehmen').build(),
		CrumbBuilder.create('Projekt ID', '/unternehmen/ID/projekte/ID', 'projekte').build(),
		CrumbBuilder.create(
			'Evaluation',
			'/unternehmen/ID/projekte/ID/evaluation',
			'evaluation'
		).build()
	];
</script>

<svelte:head>
	<title>Projekt Evaluation | S2QUAT</title>
</svelte:head>

Company Project Evaluation
