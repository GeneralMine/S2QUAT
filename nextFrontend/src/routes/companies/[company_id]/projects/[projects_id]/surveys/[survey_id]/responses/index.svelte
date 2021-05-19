<script>
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [
		CrumbBuilder.create('Unternehmen ID', '/companies/ID', 'companies').build(),
		CrumbBuilder.create('Projekt ID', '/companies/ID/projects/ID', 'projects').build(),
		CrumbBuilder.create('Fragebogen ID', '/companies/ID/projects/ID/surveys/ID', 'surveys').build(),
		CrumbBuilder.create(
			'Antworten',
			'/companies/ID/projects/ID/surveys/ID/responses',
			'responses'
		).build()
	];
</script>

<svelte:head>
	<title>Fragebogen Antworten | S2QUAT</title>
</svelte:head>

Company Project Survey Responses
