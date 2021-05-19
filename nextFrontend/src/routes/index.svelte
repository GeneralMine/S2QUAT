<script>
	import CardRow from '$lib/Cards/CardComponents/CardRow.svelte';
	import CompanyCard from '$lib/Cards/CompanyCard.svelte';

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
	<title>Home</title>
</svelte:head>

<div>
	<CardRow>
		{#each companies as company}
			<CompanyCard {company} />
		{/each}
	</CardRow>
</div>

<style>
</style>
