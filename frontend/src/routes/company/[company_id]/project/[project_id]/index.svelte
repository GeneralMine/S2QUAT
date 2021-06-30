<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Flughafen Stuttgart', '/company/ID', 'company').build(),
		CrumbBuilder.create('Projekt ID', '/company/ID/project/ID', 'project').build()
	];
</script>

<svelte:head>
	<title>Projekt ID | S2QUAT</title>
</svelte:head>

Unternehmen Projekte ID
