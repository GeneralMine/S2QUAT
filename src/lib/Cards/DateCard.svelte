<script>
	import TitledCard from './CardComponents/TitledCard.svelte';

	export let startDate;
	export let endDate;

	function parseDate(date) {
		return new Date(date).toLocaleDateString();
	}
</script>

<TitledCard title="Zeitraum">
	<p>Projektstart</p>
	<h2>{parseDate(startDate)}</h2>
	<p>Projektende</p>
	<h2>{parseDate(endDate)}</h2>
</TitledCard>

<style>
	p {
		margin: 0;
		padding-left: 0.25rem;
	}
	h2 {
		padding-left: 1.5rem;
	}
</style>
