<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/companies/ID', 'companies').build(),
		CrumbBuilder.create('Projekt ID', '/companies/ID/projects/ID', 'projects').build(),
		CrumbBuilder.create('Bearbeiter', '/companies/ID/projects/ID/users', 'projects').build()
	];
</script>

<svelte:head>
	<title>Projekt Bearbeiter | S2QUAT</title>
</svelte:head>

Company Project Users - Das sind die Protokollanten bzw. die Leudz die das Projekt und die Umfragen
durchführten
