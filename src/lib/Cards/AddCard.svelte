<script>
	import Icon from '$lib/Common/Icon.svelte';
	import Card from './CardComponents/Card.svelte';
	export let title;
</script>

<Card small={true} clickArea={true} on:click>
	<div class="addCardContainer">
		<div class:iconContainer={!title}>
			<Icon name="add" fill={true} />
		</div>
	</div>
	{#if title}
		<p class="title">{title}</p>
	{/if}
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
	.title {
		margin-top: 0;
		margin-bottom: 0;
		color: grey;
		font-size: small;
		font-weight: 100;
		text-align: center;
	}
</style>
