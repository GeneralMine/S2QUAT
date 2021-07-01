<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Home', '/', 'home').build(),
		CrumbBuilder.create('Unternehmen', '/company', 'company').build()
	];
</script>

<svelte:head>
	<title>Unternehmen | S2QUAT</title>
</svelte:head>

Unternehmen list
