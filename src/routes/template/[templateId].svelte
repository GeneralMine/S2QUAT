<script>
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Home', '/', 'home').build(),
		CrumbBuilder.create('Vorlagen', '/template', 'template').build(),
		CrumbBuilder.create('Vorlagen ID', '/template', 'template').build()
	];
	/*******************************************/
</script>

<svelte:head>
	<title>Vorlage ID | S2QUAT</title>
</svelte:head>

Vorlagen ID
