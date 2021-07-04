<script>
	import Card from './Card.svelte';

	export let title;
</script>

<Card>
	<div class="header">
		<p class="title">{title}</p>
	</div>
	<div class="content">
		<slot />
	</div>
</Card>

<style>
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
</style>
