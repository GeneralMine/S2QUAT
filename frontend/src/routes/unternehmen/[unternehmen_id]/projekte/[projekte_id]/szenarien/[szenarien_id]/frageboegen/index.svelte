<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/unternehmen/ID', 'unternehmen').build(),
		CrumbBuilder.create('Projekt ID', '/unternehmen/ID/projekte/ID', 'projekte').build(),
		CrumbBuilder.create(
			'Fragebögen',
			'/unternehmen/ID/projekte/ID/szenarien/ID/frageboegen',
			'frageboegen'
		).build()
	];
</script>

<svelte:head>
	<title>Szenario Fragebögen | S2QUAT</title>
</svelte:head>

Unternehmen Projekt Szenario Fragebögen
