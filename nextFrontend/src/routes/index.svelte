<script>
	import CardRow from '$lib/Cards/CardComponents/CardRow.svelte';
	import CompanyCard from '$lib/Cards/CompanyCard.svelte';

	import { crumbs } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [];

	let companies = [
		{
			id: 0,
			name: 'Penguin',
			logo: 'default',
			employees: 4,
			projects: 2
		},
		{
			id: 1,
			name: 'Fraunhofer',
			logo: 'fraunhofer',
			employees: 1,
			projects: 3
		},
		{
			id: 2,
			name: 'Flughafen Stuttgart',
			logo: 'StuttgartAirport',
			employees: 1,
			projects: 2
		}
	];
</script>

<svelte:head>
	<title>Home | S2QUAT</title>
</svelte:head>

<div>
	<CardRow title="Unternehmen" url="/companies">
		{#each companies as company}
			<CompanyCard {company} />
		{/each}
	</CardRow>
	<CardRow title="Modell" url="/model">
		{#each companies as company}
			<CompanyCard {company} />
		{/each}
	</CardRow>
	<CardRow title="Vorlagen" url="/templates">
		{#each companies as company}
			<CompanyCard {company} />
		{/each}
	</CardRow>
</div>

<style>
</style>
