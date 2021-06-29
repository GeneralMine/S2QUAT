<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/companies/ID', 'companies').build(),
		CrumbBuilder.create('Ansprechpartner', '/companies/ID/employees', 'employees').build()
	];
</script>

<svelte:head>
	<title>Ansprechpartner | S2QUAT</title>
</svelte:head>

Company Employees
