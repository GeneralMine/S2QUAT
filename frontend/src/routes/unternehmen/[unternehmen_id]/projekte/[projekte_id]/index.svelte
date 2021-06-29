<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/unternehmen/ID', 'unternehmen').build(),
		CrumbBuilder.create('Projekt ID', '/unternehmen/ID/projekte/ID', 'projekte').build()
	];
</script>

<svelte:head>
	<title>Projekt ID | S2QUAT</title>
</svelte:head>

Unternehmen Projekte ID
