<script>
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Home', '/', 'home').build(),
		CrumbBuilder.create('Vorlagen', '/template', 'template').build()
	];
	/*******************************************/
</script>

<svelte:head>
	<title>Vorlagen | S2QUAT</title>
</svelte:head>

Vorlagen List
