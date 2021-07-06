<script>
	import Card from './CardComponents/Card.svelte';
	export let name;
	export let description;
</script>

<Card>
	<div class="column clickArea" on:click>
		<h2>{name}</h2>
		<p class="textBlock">{description}</p>
	</div>
</Card>

<style>
	.column {
		align-items: center;
		justify-content: center;
	}
</style>
