<script>
	import TitledCard from './CardComponents/TitledCard.svelte';
	import TitledIconCard from './CardComponents/TitledIconCard.svelte';
	export let title = 'Test';
	export let value = 1337;
	export let icon = undefined;
</script>

{#if icon}
	<TitledIconCard {title} {icon}>
		<div class="container">
			<h2 class="number">{value}</h2>
		</div>
	</TitledIconCard>
{:else}
	<TitledCard {title}>
		<div class="container">
			<h2 class="number">{value}</h2>
		</div>
	</TitledCard>
{/if}

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
	h2 {
		font-size: 2.25rem;
	}
</style>
