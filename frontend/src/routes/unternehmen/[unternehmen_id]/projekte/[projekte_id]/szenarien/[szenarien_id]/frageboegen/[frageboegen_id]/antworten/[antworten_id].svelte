<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/unternehmen/ID', 'unternehmen').build(),
		CrumbBuilder.create('Projekt ID', '/unternehmen/ID/projekte/ID', 'projekte').build(),
		CrumbBuilder.create(
			'Fragebogen ID',
			'/unternehmen/ID/projekte/ID/szenarien/ID/frageboegen/ID',
			'surveys'
		).build()
	];
</script>

<svelte:head>
	<title>Antwort ID | S2QUAT</title>
</svelte:head>

Unternehmen Projekt Szenario Fragebogen Antwort ID
