<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/unternehmen/ID', 'unternehmen').build(),
		CrumbBuilder.create('Projekte', '/unternehmen/ID/projekte', 'projekte').build()
	];
</script>

<svelte:head>
	<title>Projekte | S2QUAT</title>
</svelte:head>

Unternehmen Projekte
