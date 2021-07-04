<script>
	import TitledCard from './CardComponents/TitledCard.svelte';
	export let title = 'Test';
	export let value = 1337;
</script>

<TitledCard {title}>
	<div class="container">
		<h2 class="number">{value}</h2>
	</div>
</TitledCard>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
	h2 {
		font-size: 2.25rem;
	}
</style>
