<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/company/ID', 'company').build(),
		CrumbBuilder.create('Projekte', '/company/ID/project', 'project').build()
	];
</script>

<svelte:head>
	<title>Projekte | S2QUAT</title>
</svelte:head>

Unternehmen Projekte
