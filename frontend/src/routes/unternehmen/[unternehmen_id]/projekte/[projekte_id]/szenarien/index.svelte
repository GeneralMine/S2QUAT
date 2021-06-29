<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/unternehmen/ID', 'unternehmen').build(),
		CrumbBuilder.create('Projekt ID', '/unternehmen/ID/projekte/ID', 'projekte').build(),
		CrumbBuilder.create('Szenarien', '/unternehmen/ID/projekte/ID/szenarien', 'szenarien').build()
	];
</script>

<svelte:head>
	<title>Projekt Szenarien | S2QUAT</title>
</svelte:head>

Unternehmen Projekt Szenarien
