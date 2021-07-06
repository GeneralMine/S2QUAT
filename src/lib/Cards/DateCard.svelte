<script>
	import Card from './CardComponents/Card.svelte';

	export let startDate;
	export let endDate;
</script>

<Card>
	<p>Projektstart</p>
	<h2>{startDate}</h2>
	<p>Projektende</p>
	<h2>{endDate}</h2>
</Card>
