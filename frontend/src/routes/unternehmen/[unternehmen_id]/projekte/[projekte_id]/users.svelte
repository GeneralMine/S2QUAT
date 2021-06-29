<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/unternehmen/ID', 'unternehmen').build(),
		CrumbBuilder.create('Projekt ID', '/unternehmen/ID/projekte/ID', 'projekte').build(),
		CrumbBuilder.create('Bearbeiter', '/unternehmen/ID/projekte/ID/users', 'projekte').build()
	];
</script>

<svelte:head>
	<title>Projekt Bearbeiter | S2QUAT</title>
</svelte:head>

Unternehmen Projekt Users - Das sind die Protokollanten bzw. die Leudz die das Projekt und die
Umfragen durchführten
