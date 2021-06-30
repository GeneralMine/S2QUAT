<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/company/ID', 'company').build(),
		CrumbBuilder.create('Projekt ID', '/company/ID/project/ID', 'project').build(),
		CrumbBuilder.create('Bearbeiter', '/company/ID/project/ID/user', 'project').build()
	];
</script>

<svelte:head>
	<title>Projekt Bearbeiter | S2QUAT</title>
</svelte:head>

Unternehmen Projekt Users - Das sind die Protokollanten bzw. die Leudz die das Projekt und die
Umfragen durchführten
