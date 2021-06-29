<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/unternehmen/ID', 'unternehmen').build(),
		CrumbBuilder.create('Projekt ID', '/unternehmen/ID/projekte/ID', 'projekte').build(),
		CrumbBuilder.create(
			'Fragebogen ID',
			'/unternehmen/ID/projekte/ID/szenarien/ID/frageboegen/ID',
			'surveys'
		).build(),
		CrumbBuilder.create(
			'Evaluation',
			'/unternehmen/ID/projekte/ID/szenarien/ID/frageboegen/ID/evaluation',
			'evaluation'
		).build()
	];
</script>

<svelte:head>
	<title>Fragebogen Evaluation | S2QUAT</title>
</svelte:head>

Unternehmen Projekt Szenario Fragebogen Evaluation
