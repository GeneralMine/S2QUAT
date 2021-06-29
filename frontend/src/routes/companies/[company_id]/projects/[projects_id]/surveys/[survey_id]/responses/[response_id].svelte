<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/companies/ID', 'companies').build(),
		CrumbBuilder.create('Projekt ID', '/companies/ID/projects/ID', 'projects').build(),
		CrumbBuilder.create('Fragebogen ID', '/companies/ID/projects/ID/surveys/ID', 'surveys').build(),
		CrumbBuilder.create(
			'Antwort ID',
			'/companies/ID/projects/ID/surveys/ID/responses/ID',
			'responses'
		).build()
	];
</script>

<svelte:head>
	<title>Antwort ID | S2QUAT</title>
</svelte:head>

Company Project Survey Response ID
