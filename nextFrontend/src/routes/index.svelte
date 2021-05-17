<script>
	import CardRow from '$lib/Cards/CardRow.svelte';

	import NumberCard from '$lib/Cards/NumberCard.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div>
	<CardRow>
		<NumberCard title="Test" value="1337" icon="home" />
	</CardRow>
</div>

<style>
</style>
