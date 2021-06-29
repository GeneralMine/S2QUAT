<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/companies/ID', 'companies').build(),
		CrumbBuilder.create('Projekte', '/companies/ID/projects', 'projects').build()
	];
</script>

<svelte:head>
	<title>Projekte | S2QUAT</title>
</svelte:head>

Company Projects
