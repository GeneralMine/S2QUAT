<script>
	import CardRow from '$lib/Cards/CardComponents/CardRow.svelte';
	import CompanyCard from '$lib/Cards/CompanyCard.svelte';

	import { crumbs } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [];

	let unternehmen = [
		{
			id: 0,
			name: 'Penguin',
			logo: 'default',
			employees: 4,
			projekte: 2
		},
		{
			id: 1,
			name: 'Fraunhofer',
			logo: 'fraunhofer',
			employees: 1,
			projekte: 3
		},
		{
			id: 2,
			name: 'Flughafen Stuttgart',
			logo: 'StuttgartAirport',
			employees: 1,
			projekte: 2
		}
	];
</script>

<svelte:head>
	<title>Home | S2QUAT</title>
</svelte:head>

<div>
	<CardRow title="Unternehmen" url="/unternehmen">
		{#each unternehmen as company}
			<CompanyCard {company} />
		{/each}
	</CardRow>
	<CardRow title="Qualitätsmodelll" url="/modelll">
		{#each unternehmen as company}
			<CompanyCard {company} />
		{/each}
	</CardRow>
	<CardRow title="Vorlagen" url="/vorlagen">
		{#each unternehmen as company}
			<CompanyCard {company} />
		{/each}
	</CardRow>
</div>

<style>
</style>
