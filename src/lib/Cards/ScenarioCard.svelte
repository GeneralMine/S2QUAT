<script>
	import Card from './CardComponents/Card.svelte';
	export let scenario;
</script>

<Card clickArea={true} on:click>
	<div class="column">
		<h2>{scenario.name}</h2>
		<p class="textBlock">{scenario.description}</p>
	</div>
</Card>

<style>
	.column {
		align-items: center;
		justify-content: center;
	}
</style>
