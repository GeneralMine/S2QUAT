<script>
	import Icon from '$lib/Common/Icon.svelte';
	import Card from './CardComponents/Card.svelte';
</script>

<Card small={true}>
	<div class="addCardContainer clickArea" on:click>
		<Icon name="add" />
		<h2>New</h2>
	</div>
</Card>

<style>
	.addCardContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
</style>
