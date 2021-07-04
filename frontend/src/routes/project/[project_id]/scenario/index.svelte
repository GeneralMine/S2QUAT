<script>
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/company/ID', 'company').build(),
		CrumbBuilder.create('Projekt ID', '/company/ID/project/ID', 'project').build(),
		CrumbBuilder.create('Szenarien', '/company/ID/project/ID/scenario', 'scenario').build()
	];
	/*******************************************/
</script>

<svelte:head>
	<title>Projekt Szenarien | S2QUAT</title>
</svelte:head>

Unternehmen Projekt Szenarien
