<script>
	import Icon from '$lib/Common/Icon.svelte';
	import Card from './CardComponents/Card.svelte';
</script>

<Card small={true}>
	<div class="addCardContainer clickArea" on:click>
		<div class="iconContainer">
			<Icon name="add" fill={true} />
		</div>
	</div>
</Card>

<style>
	.addCardContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		justify-self: center;
		align-self: center;
		width: 100%;
		height: 100%;
	}
	.iconContainer {
		width: 80%;
		height: 80%;
	}
</style>
